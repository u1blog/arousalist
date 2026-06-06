import { writable } from 'svelte/store';
import { browser } from '$app/environment';

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
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function createProgressStore() {
  const store = writable(loadFromStorage());

  if (browser) {
    store.subscribe(value => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
  }

  return {
    subscribe: store.subscribe,

    updateExperience(id, updates) {
      store.update(progress => {
        const existing = progress[id] ?? { tried: false, ratings: {}, notes: '', lastUpdated: null };
        return {
          ...progress,
          [id]: {
            ...existing,
            ...updates,
            // Always merge ratings rather than replace
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
      if (browser) localStorage.removeItem(STORAGE_KEY);
    },
  };
}

export const progress = createProgressStore();
