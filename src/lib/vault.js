import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { deriveKey, generateSalt, encrypt, decrypt } from './crypto.js';

const META_KEY = 'kdg_vault_meta';
const SENSITIVE_KEYS = ['kdg_progress', 'kdg_wishlist', 'kdg_guided'];

// In-memory derived key — null when locked or no vault
let _key = null;

export const vaultState = writable({ enabled: false, locked: false });

export function initVault() {
  if (!browser) return;
  if (localStorage.getItem(META_KEY)) {
    vaultState.set({ enabled: true, locked: true });
  }
}

export function isVaultEnabled() {
  return browser && !!localStorage.getItem(META_KEY);
}

export function getKey() {
  return _key;
}

export async function unlockVault(passphrase) {
  const metaRaw = localStorage.getItem(META_KEY);
  if (!metaRaw) throw new Error('No vault');
  const meta = JSON.parse(metaRaw);
  const key = await deriveKey(passphrase, meta.salt);
  try {
    const check = await decrypt(meta.check, key);
    if (check !== 'ok') throw new Error();
  } catch {
    throw new Error('Wrong passphrase');
  }
  _key = key;
  vaultState.set({ enabled: true, locked: false });
  return key;
}

export function lockVault() {
  _key = null;
  vaultState.update(v => ({ ...v, locked: true }));
}

// Encrypt a JSON string and store it under `storageKey_enc`
export async function encryptAndSave(storageKey, jsonStr, key) {
  const blob = await encrypt(jsonStr, key);
  localStorage.setItem(storageKey + '_enc', JSON.stringify(blob));
  localStorage.removeItem(storageKey);
}

// Decrypt all sensitive keys; returns { 'kdg_progress': jsonStr|null, ... }
export async function decryptAll(key) {
  const result = {};
  for (const k of SENSITIVE_KEYS) {
    const raw = localStorage.getItem(k + '_enc');
    if (!raw) { result[k] = null; continue; }
    try {
      result[k] = await decrypt(JSON.parse(raw), key);
    } catch {
      result[k] = null;
    }
  }
  return result;
}

// Enable vault: encrypt all existing plaintext data, save meta
export async function setupVault(passphrase) {
  const salt = generateSalt();
  const key = await deriveKey(passphrase, salt);
  const check = await encrypt('ok', key);
  for (const k of SENSITIVE_KEYS) {
    const plain = localStorage.getItem(k);
    if (plain !== null) {
      const blob = await encrypt(plain, key);
      localStorage.setItem(k + '_enc', JSON.stringify(blob));
      localStorage.removeItem(k);
    }
  }
  localStorage.setItem(META_KEY, JSON.stringify({ salt, check }));
  _key = key;
  vaultState.set({ enabled: true, locked: false });
}

// Disable vault (must already be unlocked): decrypt data back to plaintext, remove meta
export async function removeVault() {
  if (!_key) throw new Error('Vault is locked');
  for (const k of SENSITIVE_KEYS) {
    const raw = localStorage.getItem(k + '_enc');
    if (raw) {
      const plain = await decrypt(JSON.parse(raw), _key);
      localStorage.setItem(k, plain);
      localStorage.removeItem(k + '_enc');
    }
  }
  localStorage.removeItem(META_KEY);
  _key = null;
  vaultState.set({ enabled: false, locked: false });
}

// Re-encrypt all data with a new passphrase (must already be unlocked)
export async function changePassphrase(newPassphrase) {
  if (!_key) throw new Error('Vault is locked');
  const salt = generateSalt();
  const newKey = await deriveKey(newPassphrase, salt);
  const check = await encrypt('ok', newKey);
  for (const k of SENSITIVE_KEYS) {
    const raw = localStorage.getItem(k + '_enc');
    if (raw) {
      const plain = await decrypt(JSON.parse(raw), _key);
      const blob = await encrypt(plain, newKey);
      localStorage.setItem(k + '_enc', JSON.stringify(blob));
    }
  }
  localStorage.setItem(META_KEY, JSON.stringify({ salt, check }));
  _key = newKey;
}

// Clear all vault data (used when resetting the whole app)
export function clearVaultStorage() {
  localStorage.removeItem(META_KEY);
  for (const k of SENSITIVE_KEYS) localStorage.removeItem(k + '_enc');
  _key = null;
  vaultState.set({ enabled: false, locked: false });
}

// Collect all data as plain objects and return an export bundle
export async function exportBundle(passphrase = null) {
  const plain = {};
  if (isVaultEnabled()) {
    if (!_key) throw new Error('Vault is locked');
    const dec = await decryptAll(_key);
    for (const k of SENSITIVE_KEYS) {
      plain[k] = dec[k] !== null ? JSON.parse(dec[k]) : null;
    }
  } else {
    for (const k of SENSITIVE_KEYS) {
      const raw = localStorage.getItem(k);
      plain[k] = raw !== null ? JSON.parse(raw) : null;
    }
  }

  if (isVaultEnabled() && _key) {
    const meta = JSON.parse(localStorage.getItem(META_KEY));
    const blob = await encrypt(JSON.stringify(plain), _key);
    return { version: 1, encrypted: true, salt: meta.salt, data: blob };
  }
  if (passphrase) {
    const salt = generateSalt();
    const key = await deriveKey(passphrase, salt);
    const blob = await encrypt(JSON.stringify(plain), key);
    return { version: 1, encrypted: true, salt, data: blob };
  }
  return { version: 1, encrypted: false, data: plain };
}

// Apply a parsed export bundle to storage; returns the plain data object for store reloading
export async function importBundle(bundle, passphrase) {
  if (bundle.version !== 1) throw new Error('Unsupported format');

  let plain;
  if (bundle.encrypted) {
    if (!passphrase) throw new Error('Password required');
    const key = await deriveKey(passphrase, bundle.salt);
    try {
      plain = JSON.parse(await decrypt(bundle.data, key));
    } catch {
      throw new Error('Wrong passphrase');
    }
  } else {
    plain = bundle.data;
  }

  if (isVaultEnabled() && _key) {
    for (const k of SENSITIVE_KEYS) {
      if (plain[k] != null) {
        await encryptAndSave(k, JSON.stringify(plain[k]), _key);
      } else {
        localStorage.removeItem(k + '_enc');
        localStorage.removeItem(k);
      }
    }
  } else {
    for (const k of SENSITIVE_KEYS) {
      if (plain[k] != null) {
        localStorage.setItem(k, JSON.stringify(plain[k]));
      } else {
        localStorage.removeItem(k);
        localStorage.removeItem(k + '_enc');
      }
    }
  }

  return plain;
}
