import { useEffect } from "react";
import { GET } from "../services/api";
import { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import GlobalTable from "../components/GlobalTable";
import Loading from "../components/Loading";
import EmptySearch from "../components/EmptySearch";

export default function Products() {
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  const theadList = ["Thumbnail", "Name", "Price"];

  const tableProps = {
    theadList,
    products,
  };

  const searchProps = {
    setIsLoading,
    setProducts,
    setIsSearchEmpty,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { status, data } = await GET("/products");
      if (status === 200) {
        setProducts(data?.products);
      }
    };
    fetchProducts();
  }, []);

  const loaders = () => {
    return isSearchEmpty ? <EmptySearch /> : <Loading />;
  };

  return (
    <div className="max-w-5xl flex flex-col gap-2  w-full ">
      <Header />
      <div className="flex flex-col gap-2 p-3">
        <SearchBar {...searchProps} />
        {!isLoading && !isSearchEmpty ? (
          <GlobalTable {...tableProps} />
        ) : (
          loaders()
        )}
      </div>
    </div>
  );
}
