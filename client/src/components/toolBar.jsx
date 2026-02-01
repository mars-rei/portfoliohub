const ToolBar = () => {
  return (
    <div className="w-1/3 absolute left-1/2 -translate-x-1/2 bottom-8">
      <div className="py-2 px-8 bg-[#EBFFF2] text-[#1F1F1F] flex items-center justify-between rounded-2xl fa-xl">
        <i className="fa fa-arrow-pointer"></i>
        <i className="fa fa-hand"></i>
        <i className="fa fa-file-circle-plus"></i>
        <i className="fa fa-draw-polygon"></i>
        <i className="fa fa-font"></i>

        <div class="inline-block h-full min-h-[2em] w-1 self-stretch bg-[#1F1F1F] rounded-full"></div>

        <div className="flex flex-row items-center px-2 py-1 border-3 border-[#111317] rounded-md text-lg font-fustat-semibold space-x-2">
          <i className="fa-solid fa-magnifying-glass fa-sm"></i>
          <p>60%</p>
        </div>
        <i className="fa fa-moon"></i>
      </div>
    </div>
  );
};

export default ToolBar;