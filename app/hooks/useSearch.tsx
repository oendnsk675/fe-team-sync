import { useState, useEffect } from "react";

const useSearch = (searchFunction: any, delay = 1000) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      searchFunction(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay, searchFunction]);

  return {
    query,
    setQuery,
    isFocused,
    setIsFocused,
  };
};

export default useSearch;
