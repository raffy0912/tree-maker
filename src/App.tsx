import './App.css'
import React, { useState } from 'react';
import Child from './Child';

type ChildNode = {
  title: string;
  children?: ChildNode[];
  level?: number;
};

function addChildToNode(nodes: ChildNode[], path: number[], level: number): ChildNode[] {
  if (path.length === 0) {
    return [
      ...nodes,
      { title: `Child ${nodes.length + 1}`, children: [], level },
    ];
  }
  const [head, ...rest] = path;
  return nodes.map((node, idx) =>
    idx === head
      ? {
          ...node,
          children: addChildToNode(node.children || [], rest, level ),
        }
      : node
  );
}

function removeChildFromNode(nodes: ChildNode[], path: number[]): ChildNode[] {
  if (path.length === 1) {
    return nodes.filter((_, idx) => idx !== path[0]);
  }
  const [head, ...rest] = path;
  return nodes.map((node, idx) =>
    idx === head
      ? {
          ...node,
          children: removeChildFromNode(node.children || [], rest),
        }
      : node
  );
}

// Helper to get the level of the parent node at the given path
function getNodeLevel(nodes: ChildNode[], path: number[]): number {
  if (path.length === 0) return 0;
  
  let current = nodes;
  
  for (let i = 0; i < path.length - 1; i++) {
    const idx = path[i];
    if (!current[idx] || !current[idx].children) {
      return -1; // Path doesn't exist
    }
    current = current[idx].children;
  }
  
  // Check if the final node exists
  const finalIdx = path[path.length - 1];
  if (!current[finalIdx]) {
    return -1; // Final node doesn't exist
  }
  
  return path.length; // The level is simply the path length
}

function App() {
  const [children, setChildren] = useState<ChildNode[]>([]);

  function addChildHandler(path: number[] = []) {
    setChildren(prev => {
      const parentLevel = path.length === 0 ? 0 : getNodeLevel(prev, path);
      return addChildToNode(prev, path, parentLevel + 1);
    });
  }

  function removeChildHandler(path: number[]) {
    setChildren(prev => removeChildFromNode(prev, path));
  }

  // Example recursive render for tree structure
  
  return (
    <div className="App p-8 mx-auto bg-[#32333f] rounded-xl shadow-lg space-y-4 border-[#01020a]-300 border-1 flex flex-col">
      <div className="text-center space-y-4">  
        <p className="text-lg text-[#f5f6fb] font-semibold mb-4">Parent</p>
        <button 
          onClick={() => addChildHandler([])}
          className="bg-[#51e2c2] text-[#312c3b] px-4 py-2 rounded hover:bg-blue-600">
          Add Child
        </button>
      </div>

      <div className="children-container p-4 bg-[#393a45] text-[#e0e2e8] rounded-xl shadow-lg flex text-sm/6">
        {children.map((node, idx) => (
          <Child
            key={idx}
            node={node}
            path={[idx]}
            level={node.level || 0}
            addChildHandler={addChildHandler}
            removeChildHandler={removeChildHandler}
          />
        ))}
      </div>    
    </div>
  );
}

export default App;