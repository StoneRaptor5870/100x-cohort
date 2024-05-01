import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
  const [input, setInput] = useState(0);
  const expensiveValue = useMemo(() => {
    let value = 1;
    for (let i = 1; i <= input; i++) {
      value = value * i;
    }
    return value;
  }, [input]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
  };

  return (
    <div>
      <input placeholder="type a number" type="number" value={input} onChange={handleInputChange} />
      <p>Calculated Value: {expensiveValue}</p>
    </div>
  );
}