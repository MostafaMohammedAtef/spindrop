import { describe, expect, it } from 'vitest';
import { hashPassword, migrateLegacyAccount, verifyPassword } from './passwords';

describe('demo password hashing and migration', () => {
  it('hashes a password with salt and verifies it without storing the password', async () => {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hash = await hashPassword('correct horse battery staple', salt);
    expect(hash).not.toBe('correct horse battery staple');
    expect(await verifyPassword('correct horse battery staple', btoa(String.fromCharCode(...salt)), hash)).toBe(true);
    expect(await verifyPassword('wrong password', btoa(String.fromCharCode(...salt)), hash)).toBe(false);
  });

  it('migrates a matching legacy account to salted hash fields', async () => {
    const migrated = await migrateLegacyAccount({ name: 'Demo Person', email: 'demo@example.com', password: 'secret' }, 'secret');
    expect(migrated?.name).toBe('Demo Person');
    expect(migrated?.hash).toBeTruthy();
    expect(migrated).not.toHaveProperty('password');
    expect(await verifyPassword('secret', migrated?.salt ?? '', migrated?.hash ?? '')).toBe(true);
    expect(await migrateLegacyAccount({ name: 'Demo', email: 'demo@example.com', password: 'secret' }, 'wrong')).toBeNull();
  });
});
