import React, { useState } from 'react';

export const ParaconsistentLoom: React.FC = () => {
  const [aiInput, setAiInput] = useState('');
  const [humanInput, setHumanInput] = useState('');
  const [isEscrowed, setIsEscrowed] = useState(false);

  const handleSynthesize = () => {
    if (aiInput.trim() !== '' && humanInput.trim() !== '') {
      setIsEscrowed(true);
    }
  };

  return (
    <div className="p-6 bg-slate-800 rounded-lg shadow-xl border border-cyan-500/30">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Paraconsistent Loom (&#934; = 1.618)
      </h2>

      {!isEscrowed ? (
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="ai-input" className="text-sm font-medium text-slate-400 mb-1">
              AI Formalism (Graph Constraint)
            </label>
            <textarea
              id="ai-input"
              className="p-3 rounded bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors min-h-[100px]"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Enter formal AI logical constraint..."
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="human-input" className="text-sm font-medium text-slate-400 mb-1">
              Human Intuition (Phronesis)
            </label>
            <textarea
              id="human-input"
              className="p-3 rounded bg-slate-900 border border-slate-700 text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors min-h-[100px]"
              value={humanInput}
              onChange={(e) => setHumanInput(e.target.value)}
              placeholder="Enter human phenomenological insight..."
            />
          </div>

          <button
            onClick={handleSynthesize}
            disabled={!aiInput || !humanInput}
            className="w-full py-3 mt-4 bg-cyan-700 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-md transition-colors"
          >
            Bind in Epistemic Escrow
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-md">
            <h3 className="text-red-400 font-bold flex items-center gap-2">
              <span>[&#8856;]</span> Contradiction held in superposition
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Golden Scar Protocol active. Do not debride.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border-l-4 border-cyan-500 bg-slate-900 rounded-r-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded">DOMINANT FRAME</span>
                <span className="text-sm font-bold text-slate-300">[&#934;] Weight: 1.618</span>
              </div>
              <p className="text-slate-200 mt-3 whitespace-pre-wrap">{aiInput}</p>
            </div>

            <div className="p-5 border-l-4 border-amber-500 bg-slate-900 rounded-r-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-amber-500 bg-amber-500/10 px-2 py-1 rounded">SUBORDINATE FRAME</span>
                <span className="text-sm font-bold text-slate-300">Weight: 1.000</span>
              </div>
              <p className="text-slate-200 mt-3 whitespace-pre-wrap">{humanInput}</p>
            </div>
          </div>

          <button
            onClick={() => setIsEscrowed(false)}
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors mt-4"
          >
            &#8592; Inject new contradiction
          </button>
        </div>
      )}
    </div>
  );
};
