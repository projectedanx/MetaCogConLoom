import { render, screen, fireEvent } from '@testing-library/react';
import { ParaconsistentLoom } from './ParaconsistentLoom';

describe('ParaconsistentLoom', () => {
  it('holds contradictory inputs in a Golden Scar superposition without resolving them', () => {
    render(<ParaconsistentLoom />);

    // 1. Initial State Check
    expect(screen.getByText('Paraconsistent Loom (\u03a6 = 1.618)')).toBeInTheDocument();

    // 2. Locate inputs for the conflicting domains
    const aiInput = screen.getByLabelText('AI Formalism (Graph Constraint)');
    const humanInput = screen.getByLabelText('Human Intuition (Phronesis)');
    const synthesizeBtn = screen.getByRole('button', { name: 'Bind in Epistemic Escrow' });

    // 3. Inject contradictory vectors
    fireEvent.change(aiInput, { target: { value: 'System must resolve to binary Boolean' } });
    fireEvent.change(humanInput, { target: { value: 'Context demands multi-causal ambiguity' } });

    // 4. Trigger the non-collapse mechanism
    fireEvent.click(synthesizeBtn);

    // 5. Verification Checklist (Martensite Gate inside the test)
    expect(screen.getByText(/System must resolve to binary Boolean/)).toBeInTheDocument();
    expect(screen.getByText(/Context demands multi-causal ambiguity/)).toBeInTheDocument();

    expect(screen.getByText(/\[\u03a6\] Weight: 1.618/)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 1.000/)).toBeInTheDocument();

    // 6. [⊘] Ensure no silent flattening occurred (Anti-Ontological Flattening)
    expect(screen.getByText('[\u2298]', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Contradiction held in superposition', { exact: false })).toBeInTheDocument();
  });
});
