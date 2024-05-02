import { useRef, useState } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export default function Assignment2_useRef() {
  const [renderCount, setRenderCount] = useState(0);
  let renderTimes = useRef(0);

  const handleReRender = () => {
    setRenderCount(renderCount + 1);
  };
  renderTimes.current++;

  return (
    <div>
      <p>This component has rendered {renderTimes.current} times.</p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  )
}