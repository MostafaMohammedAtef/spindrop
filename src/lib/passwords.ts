export type HashedAccount = { name: string; email: string; salt: string; hash: string };
export type LegacyAccount = { name: string; email: string; password?: string; salt?: string; hash?: string };

function toBase64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

export async function hashPassword(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const saltBuffer = new ArrayBuffer(salt.byteLength);
  new Uint8Array(saltBuffer).set(salt);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: saltBuffer, iterations: 210000 }, key, 256);
  return toBase64(new Uint8Array(bits));
}

export async function verifyPassword(password: string, salt: string, expectedHash: string) {
  try {
    return await hashPassword(password, fromBase64(salt)) === expectedHash;
  } catch {
    return false;
  }
}

export async function migrateLegacyAccount(account: LegacyAccount, password: string): Promise<HashedAccount | null> {
  if (typeof account.password !== 'string' || account.password !== password) return null;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return { name: account.name, email: account.email, salt: toBase64(salt), hash: await hashPassword(password, salt) };
}
