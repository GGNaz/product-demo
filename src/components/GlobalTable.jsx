import { useState } from "react";
import GlobalModal from "./GlobalModal";
import { GETBYID } from "../services/api";

export default function GlobalTable(props) {
  const { products, theadList } = props || {};

  const [openModal, setOpenModal] = useState(false);
  const [viewProduct, setViewProduct] = useState({});

  const clearModal = () => {
    setOpenModal(false);
    setViewProduct({});
  };

  const modalProps = {
    clearModal,
    viewProduct,
  };

  const getProduct = async (id) => {
    const { data, status } = await GETBYID(id);
    if (status === 200) {
      setOpenModal(true);
      setViewProduct(data);
    }
  };

  return (
    <div>
      {openModal && <GlobalModal {...modalProps} />}
      <table className="w-full border">
        <thead className="bg-[#F2F3F5]">
          <tr>
            {theadList?.map((name) => (
              <td key={name} className="p-3 text-sm font-semibold">
                {name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 &&
            products?.map((data) => {
              const { id, title, description, thumbnail, price } = data ?? {};
              return (
                <tr
                  key={id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => getProduct(id)}
                >
                  <td className="p-3 ">
                    <img
                      src={thumbnail}
                      className="w-20 md:w-32 h-12 md:h-16 "
                      alt="title"
                    />
                  </td>
                  <td>
                    <div className="p-3 w-24 sm:w-full  h-full flex flex-col text-sm justify-center">
                      <div className="font-semibold truncate">{title}</div>
                      <div className="max-w-sm sm:max-w-xl truncate">
                        {description}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 w-16 md:w-28 text-sm">
                    ₱{price?.toFixed(2)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
