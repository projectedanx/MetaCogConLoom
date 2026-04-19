## Modernizer — Nullish Coalescing Injection
**Learning:** Legacy logical OR (`||`) fallback patterns for class names inside React functional components can unintentionally override valid falsy inputs like empty strings (`""`), masking potential display bugs or leading to incorrect UI states.
**Action:** Replace `||` with strict nullish coalescing operators (`??`) in default prop fallbacks to ensure intentional values like empty strings are properly evaluated, adopting modern ES2020 features while eradicating false-falsy class assignments.
