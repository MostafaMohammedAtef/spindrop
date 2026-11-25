import { readJson, writeJson } from './storage';
import { hashPassword, migrateLegacyAccount, verifyPassword } from './passwords';

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
  return Array.isArray(value) && value.length <= 1000 && value.every((account) => typeof account === 'object' && account !== null && 'name' in account && 'email' in account && typeof account.name === 'string' && account.name.length <= 100 && typeof account.email === 'string' && account.email.length <= 254 && (!('password' in account) || typeof account.password === 'string' && account.password.length <= 1024) && (!('salt' in account) || typeof account.salt === 'string' && account.salt.length <= 64) && (!('hash' in account) || typeof account.hash === 'string' && account.hash.length <= 128));
}

function readAccounts() {
  return readJson<DemoAccount[]>(accountsKey, isAccounts, []);
}

async function migrateStoredAccounts() {
  const accounts = readAccounts();
  let changed = false;
  const migrated = await Promise.all(accounts.map(async (account) => {
    if (typeof account.password !== 'string') return account;
    const safeAccount = await migrateLegacyAccount(account, account.password);
    if (!safeAccount) return account;
    changed = true;
    return safeAccount;
  }));
  if (changed) writeJson(accountsKey, migrated);
}

const migrationOnLoad = migrateStoredAccounts().catch(() => undefined);

function announceAuthChange() {
  window.dispatchEvent(new Event(authChangeEvent));
}

export function getDemoSession(): DemoSession | null {
  return readJson<DemoSession | null>(sessionKey, (value): value is DemoSession => typeof value === 'object' && value !== null && 'name' in value && 'email' in value && typeof value.name === 'string' && value.name.length <= 100 && typeof value.email === 'string' && value.email.length <= 254, null);
}

export async function createDemoAccount(name: string, email: string, password: string) {
  const accounts = readAccounts();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = name.trim();
  if (!normalizedName || normalizedName.length > 100) throw new Error('Enter a name up to 100 characters.');
  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail) || normalizedEmail.length > 254) throw new Error('Enter a valid email address.');
  if (password.length < 8 || password.length > 1024) throw new Error('Choose a password between 8 and 1024 characters.');
  if (accounts.some((account) => account.email === normalizedEmail)) throw new Error('An account with this email already exists.');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const account = { name: normalizedName, email: normalizedEmail, salt: btoa(String.fromCharCode(...salt)), hash: await hashPassword(password, salt) };
  if (!writeJson(accountsKey, [...accounts, account])) throw new Error('Browser storage is unavailable.');
  if (!writeJson(sessionKey, { name: account.name, email: account.email })) {
    writeJson(accountsKey, accounts);
    throw new Error('Browser storage is unavailable.');
  }
  announceAuthChange();
}

export async function signInDemoAccount(email: string, password: string) {
  await migrationOnLoad;
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail.length > 254 || password.length > 1024) throw new Error('The email or password is incorrect.');
  const accounts = readAccounts();
  const account = accounts.find((entry) => entry.email === normalizedEmail);
  if (!account) throw new Error('The email or password is incorrect.');
  let valid = false;
  if (account.salt && account.hash) {
    valid = await verifyPassword(password, account.salt, account.hash);
  } else if (typeof account.password === 'string' && account.password === password) {
    const migrated = await migrateLegacyAccount(account, password);
    if (migrated && writeJson(accountsKey, accounts.map((entry) => entry.email === account.email ? migrated : entry))) valid = true;
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
