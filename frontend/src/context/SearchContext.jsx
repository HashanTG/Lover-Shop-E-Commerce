import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <SearchContext.Provider value={{ showSearchBar, setShowSearchBar }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
