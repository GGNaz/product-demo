export default function GlobalModal({ viewProduct, clearModal }) {
  const { category, title, description, price, images } = viewProduct || {};
  const CloseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke="currentColor"
      className="w-5 h-5 "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const titleLayout = (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <div className="text-xs text-gray-500">{category?.toUpperCase()}</div>
        <div className="font-bold text-lg">{title}</div>
      </div>
      <button onClick={() => clearModal()}>
        <CloseIcon />
      </button>
    </div>
  );

  const descLayout = <div className="text-sm text-gray-600">{description}</div>;

  const priceLayout = <div>₱ {price?.toFixed(2)}</div>;

  const imageLayout = () => {
    return (
      <div className="grid grid-cols-1 p-2 gap-2 rounded-sm  bg-[#F9FAFB]">
        <div className="text-sm font-medium">MORE IMAGES</div>
        <div className="col-span-1 grid grid-cols-3 sm:grid-cols-4 justify-center  items-center">
          {images?.length > 0 && images?.slice(0, 4)?.map(renderImg)}
        </div>
      </div>
    );
  };

  const renderImg = (imageUrl) => (
    <div className="flex justify-center items-center">
      <img className="w-fit h-fit sm:h-36 " src={imageUrl} alt={imageUrl} />
    </div>
  );

  return (
    <div className="w-full fixed top-0 left-0 h-full flex justify-center items-center bg-[#E2E2E2]/50">
      <div className="relative overflow-y-auto flex flex-col gap-3 max-w-2xl w-full bg-white rounded-lg drop-shadow-xl p-6">
        {titleLayout}
        {descLayout}
        {priceLayout}
        {imageLayout()}
      </div>
    </div>
  );
}
