import { useEffect, useState } from "react";
import { GETBYQUERY } from "../services/api";

export default function SearchBar({
  setProducts,
  setIsLoading,
  setIsSearchEmpty,
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchAPI = async () => {
      const { data, status } = await GETBYQUERY(search);

      if (status === 200 && data?.products?.length > 0) {
        setIsSearchEmpty(false);

        setIsLoading(false);
        setProducts(data?.products);
      } else {
        setIsSearchEmpty(true);
      }
    };
    searchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const CloseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className="relative">
      <input
        type="text"
        className="border w-full h-10 focus:outline-blue-500 rounded-sm"
        value={search}
        onChange={(e) => {
          setIsLoading(true);
          setSearch(e.target.value);
        }}
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute top-3 right-2 hover:text-blue-500"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
