import React, { useState } from 'react';
import { JsonViewer } from './components/JsonViewer';
import { ParaconsistentLoom } from './components/ParaconsistentLoom';
import lexiconData from './data/lexicon_data.json';

const protocolData = {
  "Protocol_Name": "Meta-Cognitive Context Loom",
  "The_Blend_Emergent_Structure": "By synthesizing epistemic understanding with context mechanics, the protocol transforms tool-definition overhead into a scaffold for causal reasoning.",
  "Testing_Hypothesis": "ECO reduces context consumption variance by ≥40% in multi-step workflows."
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'protocol' | 'lexicon' | 'loom'>('loom');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-5xl">
        <header className="mb-8 text-center border-b border-slate-800 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 tracking-tight">
            Meta-Cognitive Context Loom
          </h1>
          <p className="mt-3 text-slate-400 text-lg max-w-2xl mx-auto">
            A Pluriversal Environment for rendering Epistemic Schemas and maintaining Golden Scar Superpositions.
          </p>
        </header>

        <main>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('loom')}
              className={`px-5 py-2.5 rounded-md transition-all font-medium ${
                activeTab === 'loom'
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              [&#934;] Paraconsistent Loom
            </button>
            <button
              onClick={() => setActiveTab('protocol')}
              className={`px-5 py-2.5 rounded-md transition-all font-medium ${
                activeTab === 'protocol'
                  ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              [&#8856;] Core Protocol
            </button>
            <button
              onClick={() => setActiveTab('lexicon')}
              className={`px-5 py-2.5 rounded-md transition-all font-medium ${
                activeTab === 'lexicon'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              [&#8711;] DRP-LEXICON-992
            </button>
          </div>

          <div className="transition-all duration-300 ease-in-out">
            {activeTab === 'loom' && <ParaconsistentLoom />}
            {activeTab === 'protocol' && <JsonViewer data={protocolData} />}
            {activeTab === 'lexicon' && <JsonViewer data={lexiconData} />}
          </div>
        </main>

        <footer className="text-center mt-16 text-slate-600 text-sm border-t border-slate-800 pt-8 flex flex-col gap-2">
          <p>Superintendent Authority: Root Hygiene Enforced. Golden Scar Protocol Active.</p>
          <p className="font-mono text-xs opacity-50">+++Role(persona="Verified_Tactile_MoE" + "Deep_Systems_Engineer")</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
