
import React, { useState } from 'react';

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className ?? "w-4 h-4"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className ?? "w-4 h-4"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

interface JsonViewerNodeProps {
  nodeKey: string;
  value: unknown;
  level: number;
  isRoot?: boolean;
}

const JsonViewerNode: React.FC<JsonViewerNodeProps> = ({ nodeKey, value, level, isRoot = false }) => {
  const [isExpanded, setIsExpanded] = useState(isRoot);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(prev => !prev);
  };
  
  const isObject = typeof value === 'object' && value !== null && !Array.isArray(value);
  const isArray = Array.isArray(value);

  const indentStyle = { paddingLeft: `${isRoot ? 0 : level * 1.5}rem` };

  const renderValue = (val: unknown) => {
    if (val === null) {
      return <span className="text-slate-500">null</span>;
    }
    switch (typeof val) {
      case 'string':
        return <span className="text-emerald-300">"{val}"</span>;
      case 'number':
        return <span className="text-sky-400">{val}</span>;
      case 'boolean':
        return <span className="text-sky-400">{String(val)}</span>;
      default:
        return null;
    }
  };
  
  if (isObject || isArray) {
    const items = isObject ? Object.entries(value) : (value as unknown[]).map((v, i) => [i.toString(), v]);
    const bracketOpen = isArray ? '[' : '{';
    const bracketClose = isArray ? ']' : '}';
    const summary = isExpanded ? '' : <span className="text-slate-500 ml-2">{items.length} {items.length === 1 ? 'item' : 'items'}</span>;

    return (
      <div style={indentStyle}>
        <div onClick={toggleExpand} className="flex items-center cursor-pointer py-1 select-none hover:bg-slate-700/50 rounded">
          <span className="w-6 flex items-center justify-center text-slate-500">
             {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </span>
          {!isRoot && <span className="text-pink-400 mr-2">"{nodeKey}":</span>}
          <span className="text-slate-400">{bracketOpen}</span>
          {summary}
          {!isExpanded && <span className="text-slate-400">{bracketClose}</span>}
        </div>
        {isExpanded && (
          <div>
            {items.map(([key, val]) => (
              <JsonViewerNode key={key} nodeKey={key} value={val} level={level + 1} />
            ))}
             <div style={{ paddingLeft: `${level * 1.5}rem` }} className="py-1">
                <span className="text-slate-400">{bracketClose}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={indentStyle} className="flex items-start py-1">
      <span className="w-6 flex-shrink-0"></span>
      <span className="text-pink-400 mr-2">"{nodeKey}":</span>
      <span className="break-all">{renderValue(value)}</span>
    </div>
  );
};

interface JsonViewerProps {
  data: object;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm shadow-lg border border-slate-700">
      <JsonViewerNode nodeKey="root" value={data} level={0} isRoot={true} />
    </div>
  );
};
