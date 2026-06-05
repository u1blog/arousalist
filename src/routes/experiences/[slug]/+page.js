import { EXPERIENCES } from '$lib/data.js';
import { error } from '@sveltejs/kit';

export function entries() {
  return EXPERIENCES.map(e => ({ slug: e.id }));
}

export function load({ params }) {
  const idx = EXPERIENCES.findIndex(e => e.id === params.slug);
  if (idx === -1) throw error(404, 'Experience not found');
  return {
    experience: EXPERIENCES[idx],
    prev: idx > 0                      ? EXPERIENCES[idx - 1] : null,
    next: idx < EXPERIENCES.length - 1 ? EXPERIENCES[idx + 1] : null,
  };
}
