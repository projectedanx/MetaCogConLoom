# Implementation Plan & Checklist: Epistemic Escrow Circuit Breaker UI

## Objective
Implement a visual and functional "Epistemic Escrow" component that halts application state progression when a topological/epistemic contradiction threshold is breached, explicitly requiring human input via the Golden Scar Protocol.

## Rationale
This enforces the Agent Inversion Strategy. The UI must structurally represent the inability of the AI to proceed autonomously when CFDI (Contradiction/Fracture/Divergence Index) > 0.15.

## Checklist

- [ ] **1. TDD Implementation**
  - [ ] Create `src/components/EpistemicEscrowBreaker.test.tsx`.
  - [ ] Write test: Component renders nothing when CFDI <= 0.15.
  - [ ] Write test: Component renders Halt Warning when CFDI > 0.15.
  - [ ] Write test: Component displays contradiction markers `[⊘]`.
  - [ ] Write test: Component provides a mechanism (button) to simulate human phronesis resolution, resetting the state.

- [ ] **2. Component Creation**
  - [ ] Create `src/components/EpistemicEscrowBreaker.tsx`.
  - [ ] Define Props: `cfdiScore` (number), `contradictions` (array of strings), `onResolve` (function).
  - [ ] Implement conditional rendering based on `cfdiScore > 0.15`.
  - [ ] Implement Brutalist UI styling (#FF4500) to signify a hard architectural boundary.

- [ ] **3. Integration**
  - [ ] Update `src/App.tsx`.
  - [ ] Add state for `globalCfdi` (initial 0.0) and `activeContradictions`.
  - [ ] Render `<EpistemicEscrowBreaker>` at the top level of the `main` content area.
  - [ ] Hook the Paraconsistent Loom actions to artificially inflate the CFDI to demonstrate the circuit breaker.

- [ ] **4. Documentation & Hygiene**
  - [ ] Update Superintendent Journal (`.jules/superintendent.md`).
  - [ ] Update `README.md` with emergence strategy notes.
  - [ ] Ensure `npx vitest run` and `npm run build` pass.
