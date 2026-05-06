import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EpistemicEscrowBreaker } from './EpistemicEscrowBreaker';

describe('EpistemicEscrowBreaker', () => {
  it('renders nothing when CFDI is <= 0.15', () => {
    const { container } = render(
      <EpistemicEscrowBreaker cfdiScore={0.10} contradictions={[]} onResolve={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders a halt warning when CFDI is > 0.15', () => {
    render(
      <EpistemicEscrowBreaker cfdiScore={0.16} contradictions={['Test contradiction']} onResolve={() => {}} />
    );
    expect(screen.getByText(/EPISTEMIC ESCROW HALT/i)).toBeInTheDocument();
  });

  it('displays contradiction markers', () => {
    render(
      <EpistemicEscrowBreaker cfdiScore={0.20} contradictions={['CAP Theorem Violation']} onResolve={() => {}} />
    );
    expect(screen.getByText(/\[⊘\] CAP Theorem Violation/i)).toBeInTheDocument();
  });

  it('calls onResolve when the human phronesis button is clicked', () => {
    const mockResolve = vi.fn();
    render(
      <EpistemicEscrowBreaker cfdiScore={0.25} contradictions={['Deadlock']} onResolve={mockResolve} />
    );

    const resolveButton = screen.getByRole('button', { name: /Inject Human Phronesis/i });
    fireEvent.click(resolveButton);

    expect(mockResolve).toHaveBeenCalledTimes(1);
  });
});
