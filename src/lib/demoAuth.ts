type DemoAccount = {
  name: string;
  email: string;
  password: string;
};

type DemoSession = {
  name: string;
  email: string;
};

const accountsKey = 'spindrop.demo.accounts';
const sessionKey = 'spindrop.demo.session';
const authChangeEvent = 'spindrop-auth-change';

function readAccounts(): DemoAccount[] {
  try {
    const value = localStorage.getItem(accountsKey);
    const accounts: unknown = value ? JSON.parse(value) : [];
    return Array.isArray(accounts) ? accounts as DemoAccount[] : [];
  } catch {
    return [];
  }
}

function announceAuthChange() {
  window.dispatchEvent(new Event(authChangeEvent));
}

export function getDemoSession(): DemoSession | null {
  try {
    const value = localStorage.getItem(sessionKey);
    if (!value) return null;
    const session: unknown = JSON.parse(value);
    if (
      typeof session === 'object' &&
      session !== null &&
      'name' in session &&
      'email' in session &&
      typeof session.name === 'string' &&
      typeof session.email === 'string'
    ) {
      return { name: session.name, email: session.email };
    }
    return null;
  } catch {
    return null;
  }
}

export function createDemoAccount(name: string, email: string, password: string) {
  const accounts = readAccounts();
  const normalizedEmail = email.trim().toLowerCase();

  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error('An account with this email already exists.');
  }

  const account = { name: name.trim(), email: normalizedEmail, password };
  accounts.push(account);
  localStorage.setItem(accountsKey, JSON.stringify(accounts));
  localStorage.setItem(sessionKey, JSON.stringify({ name: account.name, email: account.email }));
  announceAuthChange();
}

export function signInDemoAccount(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = readAccounts().find(
    (savedAccount) => savedAccount.email === normalizedEmail && savedAccount.password === password,
  );

  if (!account) {
    throw new Error('The email or password is incorrect.');
  }

  localStorage.setItem(sessionKey, JSON.stringify({ name: account.name, email: account.email }));
  announceAuthChange();
}

export function signOutDemoAccount() {
  localStorage.removeItem(sessionKey);
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
