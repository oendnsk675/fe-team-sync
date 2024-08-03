import { useState, useEffect } from "react";

const useSearch = (searchFunction: any, delay = 1000) => {
  const [query, setQuery] = useState("");
  const [delayedQuery, setDelayedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayedQuery(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  useEffect(() => {
    if (delayedQuery) {
      searchFunction(delayedQuery);
    }
  }, [delayedQuery, searchFunction]);

  return {
    query,
    setQuery,
    isFocused,
    setIsFocused,
  };
};

export default useSearch;
