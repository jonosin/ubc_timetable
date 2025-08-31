# UBC Timetable

Local Next.js app that parses "Registered Courses" PDFs and renders weekly timetables per term.

## Setup

```bash
pnpm install
pnpm dev
```

## Notes
- PDF parsing uses `pdfjs-dist` with a Tesseract fallback. See `lib/pdf/parsePdf.ts`.
- If your university changes table headers, adjust `parseRows` in `lib/pdf/parsePdf.ts` and the schema in `lib/pdf/normalize.ts`.
- Data is stored in `data/schedule.json` and `data/changes.json`.

## Tests
Run unit tests with:
```bash
pnpm test
```
