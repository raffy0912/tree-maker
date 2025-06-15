import React from 'react';

interface TreeNode {
  title: string;
  children?: TreeNode[];
}

interface ChildProps {
  node: TreeNode;
  path: number[];
  level?: number;
  addChildHandler: (path?: number[]) => void;
  removeChildHandler: (path: number[]) => void;
}

function Child({ node, path, level, addChildHandler, removeChildHandler }: ChildProps) {
  // ...
  return (
    <div  className="mb-4 flex-initial flex-row m-1 border-2 border-gray-500 border-solid" >
      <p>{node.title}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <button  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-4"
       onClick={() => addChildHandler([...path])}>+</button>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      onClick={() => removeChildHandler(path)}>-</button>
      <div className={`flex flex-row p-4 ${level === 3 ? 'text-sm' : ''}`}>
        {node.children?.map((child, idx) => (
          <Child
        key={idx}
        node={child}
        path={[...path, idx]}
        level={level ? level + 1 : 1}
        addChildHandler={addChildHandler}
        removeChildHandler={removeChildHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default Child;