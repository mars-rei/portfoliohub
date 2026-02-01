const RightCanvasMenu = () => {
  return (
    <div className="w-1/6 flex flex-col">
      <div className="flex flex-row items-center w-full px-4 h-20 justify-between">
        <div className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex">
          Publish Portfolio
        </div>
        <div className="rounded-full px-4 h-8 border-[#B5446E] border-2 text-[#B5446E] font-fustat-medium items-center justify-center flex">
          <i className="fa fa-download fa-md"></i>
        </div>
      </div>
      <div className="h-full space-y-4 p-4 border-[#111317] border-t-2">
        <div className="space-y-2 text-lg font-fustat-semibold">
          <p>Canvas</p>
          <div className="flex flex-row items-center w-full px-2 py-1 border-2 border-[#111317] rounded-md text-base font-fustat-medium space-x-2">
            <i className="fa fa-square fa-lg"></i>
            <p>1F1F1F</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightCanvasMenu;