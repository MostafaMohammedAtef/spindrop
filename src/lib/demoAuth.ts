import { readJson, writeJson } from './storage';

type DemoAccount = {
  name: string;
  email: string;
  salt?: string;
  hash?: string;
  password?: string;
};

type DemoSession = { name: string; email: string };

const accountsKey = 'spindrop.demo.accounts';
const sessionKey = 'spindrop.demo.session';
const authChangeEvent = 'spindrop-auth-change';

function isAccounts(value: unknown): value is DemoAccount[] {
  return Array.isArray(value) && value.every((account) => typeof account === 'object' && account !== null && 'name' in account && 'email' in account && typeof account.name === 'string' && typeof account.email === 'string');
}

function readAccounts() {
  return readJson<DemoAccount[]>(accountsKey, isAccounts, []);
}

function announceAuthChange() {
  window.dispatchEvent(new Event(authChangeEvent));
}

function toBase64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function hashPassword(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const saltBuffer = new ArrayBuffer(salt.byteLength);
  new Uint8Array(saltBuffer).set(salt);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: saltBuffer, iterations: 210000 }, key, 256);
  return toBase64(new Uint8Array(bits));
}

export function getDemoSession(): DemoSession | null {
  return readJson<DemoSession | null>(sessionKey, (value): value is DemoSession => typeof value === 'object' && value !== null && 'name' in value && 'email' in value && typeof value.name === 'string' && typeof value.email === 'string', null);
}

export async function createDemoAccount(name: string, email: string, password: string) {
  const accounts = readAccounts();
  const normalizedEmail = email.trim().toLowerCase();
  if (accounts.some((account) => account.email === normalizedEmail)) throw new Error('An account with this email already exists.');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const account = { name: name.trim().slice(0, 100), email: normalizedEmail.slice(0, 254), salt: toBase64(salt), hash: await hashPassword(password, salt) };
  if (!writeJson(accountsKey, [...accounts, account])) throw new Error('Browser storage is unavailable.');
  writeJson(sessionKey, { name: account.name, email: account.email });
  announceAuthChange();
}

export async function signInDemoAccount(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = readAccounts();
  const account = accounts.find((entry) => entry.email === normalizedEmail);
  if (!account) throw new Error('The email or password is incorrect.');
  let valid = false;
  if (account.salt && account.hash) {
    valid = await hashPassword(password, fromBase64(account.salt)) === account.hash;
  } else if (typeof account.password === 'string' && account.password === password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const migrated = { name: account.name, email: account.email, salt: toBase64(salt), hash: await hashPassword(password, salt) };
    writeJson(accountsKey, accounts.map((entry) => entry.email === account.email ? migrated : entry));
    valid = true;
  }
  if (!valid) throw new Error('The email or password is incorrect.');
  if (!writeJson(sessionKey, { name: account.name, email: account.email })) throw new Error('Browser storage is unavailable.');
  announceAuthChange();
}

export function signOutDemoAccount() {
  try { window.localStorage.removeItem(sessionKey); } catch { return; }
  announceAuthChange();
}

export function subscribeToDemoAuth(callback: () => void) {
  window.addEventListener(authChangeEvent, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(authChangeEvent, callback);
    window.removeEventListener('storage', callback);
  };
}
