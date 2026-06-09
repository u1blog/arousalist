# Arousalist

## Adding a new experience

See `experience-writing-guide.md` for content standards and voice. The technical steps (creating the JSON, registering in `data.js`) are at the bottom of that file under **Adding an experience to the app**.

Short version:
1. Create `src/lib/experiences/<id>.json`
2. Add `import myExperience from './experiences/<id>.json'` to `src/lib/data.js`
3. Add `myExperience` to the `_EXPERIENCES_RAW` array in `data.js`
