import { faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import useSearch from "../hooks/useSearch";

const SelectSearch = ({ onSearch, data, isLoading, onSelectedUser }) => {
  const { query, setQuery, isFocused, setIsFocused } = useSearch(onSearch);
  const [selectedUser, setSelectedUser] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
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

  const toggleUserSelection = (user: any, e: any) => {
    e.preventDefault();
    setSelectedUser((prevSelected: any) => {
      let newSelected;
      if (prevSelected.includes(user)) {
        newSelected = prevSelected.filter((u) => u !== user); // Keluarkan user jika sudah ada
      } else {
        newSelected = [...prevSelected, user]; // Masukkan user jika belum ada
      }
      // Kirim data terbaru ke parent
      onSelectedUser(newSelected);
      return newSelected;
    });
  };

  const removeUserSelected = (user: any, e: any) => {
    e.preventDefault();
    setSelectedUser((prevSelected: any) => {
      const newSelected = prevSelected.filter((u: any) => u !== user);
      // Kirim data terbaru ke parent
      onSelectedUser(newSelected);
      return newSelected;
    });
  };

  return (
    <div className="w-full relative" ref={containerRef}>
      <div className="w-full h-full overflow-x-auto border border-slate-400 rounded relative flex">
        <div className="h-full w-fit flex gap-2 p-1">
          {selectedUser.map((selected: any, index: any) => (
            <div
              className="bg-emerald-500 rounded p-1 px-2 flex text-white w-max"
              key={index}
            >
              <span>@{selected.username}</span>
              <button
                onClick={(e) => removeUserSelected(selected, e)}
                className="text-xs border-l ml-1 pl-2 h-full flex items-center hover:opacity-45"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="input input-sm focus:outline-none border-none input-primary w-full h-auto px-1"
        />
      </div>
      {isFocused && (
        <div className="absolute bottom-[-11.3rem] w-full rounded h-[11rem] z-50 bg-white border border-slate-400 flex flex-col">
          {/* header*/}
          <div className="border-b p-2 w-full h-fit">
            <h3 className="font-semibold">
              List user{" "}
              <span className="opacity-55">
                {data?.length > 0 ? data.length : ""}
              </span>
            </h3>
          </div>
          {/* list user */}
          <div className="overflow-y-auto h-full w-full flex-1">
            {isLoading && (
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-dots loading-xs"></span>
              </div>
            )}
            {data?.length == 0 && !isLoading ? (
              <div className="h-full flex flex-col items-center mt-5 gap-2 opacity-65">
                <FontAwesomeIcon icon={faUserNinja} size="lg" />
                <h4 className="text-sm">User not found</h4>
              </div>
            ) : (
              data?.map((user: any, index: number) => (
                <button
                  onClick={(e) => toggleUserSelection(user, e)}
                  className={`flex gap-3 hover:bg-emerald-200/50 transition duration-100 w-full border-b p-2 pb-2 ${
                    selectedUser.includes(user) ? "bg-emerald-200/50" : ""
                  }`}
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

export default SelectSearch;
