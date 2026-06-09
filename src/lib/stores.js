import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getKey, isVaultEnabled, encryptAndSave } from './vault.js';

const THEME_KEY = 'kdg_theme';

function createThemeStore() {
  const defaultTheme = 'dark';
  const initial = browser ? (localStorage.getItem(THEME_KEY) ?? defaultTheme) : defaultTheme;
  const store = writable(initial);

  if (browser) {
    store.subscribe(value => localStorage.setItem(THEME_KEY, value));
  }

  return {
    subscribe: store.subscribe,
    set: store.set,
    toggle() {
      store.update(t => (t === 'dark' ? 'light' : 'dark'));
    },
  };
}

export const theme = createThemeStore();

const STORAGE_KEY = 'kdg_progress';

function loadFromStorage() {
  if (!browser) return {};
  // If vault is enabled, data lives in the encrypted key — return empty until unlocked
  if (isVaultEnabled()) return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(value) {
  const key = getKey();
  if (isVaultEnabled() && key) {
    encryptAndSave(STORAGE_KEY, JSON.stringify(value), key).catch(() => {});
  } else if (!isVaultEnabled()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }
}

function createProgressStore() {
  const store = writable(loadFromStorage());
  let _loading = false;

  if (browser) {
    store.subscribe(value => {
      if (_loading) return;
      saveProgress(value);
    });
  }

  return {
    subscribe: store.subscribe,

    load(data) {
      _loading = true;
      store.set(data);
      _loading = false;
    },

    updateExperience(id, updates) {
      store.update(progress => {
        const existing = progress[id] ?? { tried: false, ratings: {}, notes: '', lastUpdated: null };
        return {
          ...progress,
          [id]: {
            ...existing,
            ...updates,
            ratings: updates.ratings
              ? { ...existing.ratings, ...updates.ratings }
              : existing.ratings,
            lastUpdated: new Date().toISOString(),
          },
        };
      });
    },

    reset() {
      store.set({});
      if (browser) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY + '_enc');
      }
    },
  };
}

export const progress = createProgressStore();

const WISHLIST_KEY = 'kdg_wishlist';

function createWishlistStore() {
  let initial;
  if (!browser || isVaultEnabled()) {
    initial = new Set();
  } else {
    initial = new Set(JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]'));
  }
  const store = writable(initial);
  let _loading = false;

  if (browser) {
    store.subscribe(value => {
      if (_loading) return;
      const key = getKey();
      if (isVaultEnabled() && key) {
        encryptAndSave(WISHLIST_KEY, JSON.stringify([...value]), key).catch(() => {});
      } else if (!isVaultEnabled()) {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify([...value]));
      }
    });
  }

  return {
    subscribe: store.subscribe,

    load(data) {
      _loading = true;
      store.set(data);
      _loading = false;
    },

    toggle(id) {
      store.update(s => {
        const next = new Set(s);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },

    reset() {
      store.set(new Set());
      if (browser) {
        localStorage.removeItem(WISHLIST_KEY);
        localStorage.removeItem(WISHLIST_KEY + '_enc');
      }
    },
  };
}

export const wishlist = createWishlistStore();

const GUIDED_PREFS_KEY = 'kdg_guided';

function createGuidedPrefsStore() {
  let initial;
  if (!browser || isVaultEnabled()) {
    initial = null;
  } else {
    initial = JSON.parse(localStorage.getItem(GUIDED_PREFS_KEY) || 'null');
  }
  const store = writable(initial);
  let _loading = false;

  if (browser) {
    store.subscribe(value => {
      if (_loading) return;
      const key = getKey();
      if (isVaultEnabled() && key) {
        encryptAndSave(GUIDED_PREFS_KEY, JSON.stringify(value), key).catch(() => {});
      } else if (!isVaultEnabled()) {
        if (value) {
          localStorage.setItem(GUIDED_PREFS_KEY, JSON.stringify(value));
        } else {
          localStorage.removeItem(GUIDED_PREFS_KEY);
        }
      }
    });
  }

  return {
    subscribe: store.subscribe,
    set: store.set,

    load(data) {
      _loading = true;
      store.set(data);
      _loading = false;
    },

    reset() {
      store.set(null);
      if (browser) {
        localStorage.removeItem(GUIDED_PREFS_KEY);
        localStorage.removeItem(GUIDED_PREFS_KEY + '_enc');
      }
    },
  };
}

export const guidedPrefs = createGuidedPrefsStore();
