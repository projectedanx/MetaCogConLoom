import React, { useState } from 'react';

/**
 * ChevronRightIcon renders a right-facing chevron SVG.
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Optional CSS classes.
 * @returns {JSX.Element} SVG element.
 */
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className ?? "w-4 h-4"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

/**
 * ChevronDownIcon renders a down-facing chevron SVG.
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Optional CSS classes.
 * @returns {JSX.Element} SVG element.
 */
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className ?? "w-4 h-4"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

/**
 * Props for the JsonViewerNode component.
 */
interface JsonViewerNodeProps {
  /** The key of the JSON node. */
  nodeKey: string;
  /** The value of the JSON node. */
  value: unknown;
  /** The nesting level of the node. */
  level: number;
  /** Whether the node is the root node. */
  isRoot?: boolean;
}

/**
 * JsonViewerNode represents a single node in the JSON viewer.
 * It recursively renders objects and arrays, and formats primitive values.
 * @param {JsonViewerNodeProps} props - The node properties.
 * @returns {JSX.Element} The rendered JSON node.
 */
const JsonViewerNode: React.FC<JsonViewerNodeProps> = ({ nodeKey, value, level, isRoot = false }) => {
  const [isExpanded, setIsExpanded] = useState(isRoot);

  /**
   * Toggles the expansion state of the node.
   * @param {React.MouseEvent} e - The mouse event.
   * @returns {void}
   */
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(prev => !prev);
  };
  
  const isObject = typeof value === 'object' && value !== null && !Array.isArray(value);
  const isArray = Array.isArray(value);

  const indentStyle = { paddingLeft: `${isRoot ? 0 : level * 1.5}rem` };

  /**
   * Renders the primitive value with appropriate syntax highlighting.
   * @param {unknown} val - The primitive value to render.
   * @returns {JSX.Element | null} The formatted value element.
   */
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

/**
 * Props for the JsonViewer component.
 */
interface JsonViewerProps {
  /** The data object to be visualized. */
  data: object;
}

/**
 * JsonViewer is a recursive component that renders a JSON-like object with expandable/collapsible nodes.
 * @param {JsonViewerProps} props - The viewer properties.
 * @returns {JSX.Element} The JSON viewer interface.
 */
export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm shadow-lg border border-slate-700">
      <JsonViewerNode nodeKey="root" value={data} level={0} isRoot={true} />
    </div>
  );
};
