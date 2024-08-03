import { faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import useSearch from "../hooks/useSearch";

const CustomSearch = ({ onSearch, data, isLoading }) => {
  const { query, setQuery, isFocused, setIsFocused } = useSearch(onSearch);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef, setIsFocused]);

  return (
    <div className="w-full relative" ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        className="input input-sm input-bordered focus:outline-offset-[0.4px] focus:border-white focus:outline-emerald-400 input-primary w-full"
      />
      {isFocused && (
        <div className="absolute bottom-[-11.3rem] w-full rounded h-[11rem] z-50 bg-white border border-slate-400">
          <div className="border-b p-2">
            <h3 className="font-semibold">
              List user{" "}
              <span className="opacity-55">
                {data?.length > 0 ? data.length : ""}
              </span>
            </h3>
          </div>
          <div className="overflow-y-auto h-full pb-12">
            {isLoading && (
              <span className="loading loading-dots loading-xs"></span>
            )}
            {data?.length == 0 && !isLoading ? (
              <div className="h-full flex flex-col items-center mt-5 gap-2 opacity-65">
                <FontAwesomeIcon icon={faUserNinja} size="lg" />
                <h4 className="text-sm">User not found</h4>
              </div>
            ) : (
              data?.map((user: any, index: number) => (
                <button
                  className="flex gap-3 hover:bg-emerald-200/50 transition duration-100 w-full border-b p-2 pb-2"
                  key={index}
                >
                  <div className="w-8 h-8 rounded bg-emerald-400"></div>
                  <div className="flex flex-col text-xs">
                    <span className="text-start">{user.fullname}</span>
                    <span className="opacity-45 text-start">
                      @{user.username}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSearch;
