import { useState } from "react";

export const useArray = (initialValue) => {
  const [array, setArray] = useState(initialValue);
  
  function filter (cb) {
    setArray(a => a.filter(cb));
  }

  function clear() {
    setArray([]);
  }

  return { array, setArray, filter, clear };
}