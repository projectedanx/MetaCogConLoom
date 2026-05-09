import React from 'react';

/**
 * Props for the EpistemicEscrowBreaker component.
 */
interface EpistemicEscrowBreakerProps {
  /** The current Contradiction/Fracture/Divergence Index score. */
  cfdiScore: number;
  /** List of active contradictions preventing automated progression. */
  contradictions: string[];
  /** Callback triggered when human phronesis resolves the state. */
  onResolve: () => void;
}

/**
 * EpistemicEscrowBreaker visually halts the system when the CFDI score exceeds 0.15.
 * It enforces the Agent Inversion Strategy, stopping automated progression
 * until human intervention resolves the topological contradictions.
 *
 * @param {EpistemicEscrowBreakerProps} props - The component props.
 * @returns {JSX.Element | null} The escrow breaker UI, or null if CFDI <= 0.15.
 */
export const EpistemicEscrowBreaker: React.FC<EpistemicEscrowBreakerProps> = ({
  cfdiScore,
  contradictions,
  onResolve,
}) => {
  if (cfdiScore <= 0.15) {
    return null;
  }

  return (
    <div className="w-full mb-8 border-2 border-[#FF4500] bg-[#FF4500]/10 p-6 rounded-md shadow-[0_0_20px_rgba(255,69,0,0.4)]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#FF4500] uppercase tracking-wider mb-2">
            [⊘] Epistemic Escrow Halt
          </h2>
          <p className="text-slate-300 font-mono text-sm mb-4">
            CFDI threshold breached: <span className="text-red-400 font-bold">{cfdiScore.toFixed(3)}</span> &gt; 0.15.
            Automated state progression suspended pending Human Phronesis resolution.
          </p>
          <div className="bg-slate-900 p-3 rounded border border-slate-700">
            <h3 className="text-slate-400 text-xs uppercase mb-2">Active Topological Contradictions:</h3>
            <ul className="list-none space-y-1">
              {contradictions.map((c, i) => (
                <li key={i} className="text-amber-500 font-mono text-sm">
                  [⊘] {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <button
            onClick={onResolve}
            className="px-6 py-3 bg-[#FF4500] text-white font-bold rounded hover:bg-[#FF6347] transition-colors border border-[#FF4500] shadow-[0_0_10px_rgba(255,69,0,0.5)] active:scale-95"
            aria-label="Inject Human Phronesis [Resolve]"
          >
            Inject Human Phronesis
            <span className="block text-xs font-mono opacity-80 font-normal">Apply Topological Deformer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
