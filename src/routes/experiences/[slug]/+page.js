import { EXPERIENCES, LEADS_TO } from '$lib/data.js';
import { error } from '@sveltejs/kit';

export function entries() {
  return EXPERIENCES.map(e => ({ slug: e.id }));
}

const byId = Object.fromEntries(EXPERIENCES.map(e => [e.id, e]));

// Build reverse map once: id → ids that lead to it
const PREREQUISITE_FOR = {};
for (const [from, tos] of Object.entries(LEADS_TO)) {
  for (const to of tos) {
    (PREREQUISITE_FOR[to] ??= []).push(from);
  }
}

export function load({ params }) {
  const idx = EXPERIENCES.findIndex(e => e.id === params.slug);
  if (idx === -1) throw error(404, 'Experience not found');
  const id = params.slug;
  return {
    experience: EXPERIENCES[idx],
    prev: idx > 0                      ? EXPERIENCES[idx - 1] : null,
    next: idx < EXPERIENCES.length - 1 ? EXPERIENCES[idx + 1] : null,
    prerequisites: (PREREQUISITE_FOR[id] ?? []).map(pid => ({ id: pid, title: byId[pid].title })),
    leadsTo:       (LEADS_TO[id]          ?? []).map(nid => ({ id: nid, title: byId[nid].title })),
  };
}
