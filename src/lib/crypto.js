function b64enc(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function b64dec(s) {
  return Uint8Array.from(atob(s), c => c.charCodeAt(0));
}

export function generateSalt() {
  return b64enc(crypto.getRandomValues(new Uint8Array(16)));
}

export async function deriveKey(passphrase, saltB64) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: b64dec(saltB64), iterations: 200000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encrypt(plaintext, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  return { iv: b64enc(iv), ct: b64enc(ct) };
}

export async function decrypt(blob, key) {
  const pt = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: b64dec(blob.iv) },
    key,
    b64dec(blob.ct)
  );
  return new TextDecoder().decode(pt);
}
