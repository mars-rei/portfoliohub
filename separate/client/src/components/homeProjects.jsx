const HomeProjects = () => {
  return (
    <div className="w-5/6 bg-[#111317] p-12 font-fustat-semibold text-md">
      <div className="grid grid-cols-4 gap-8">
        <div className="w-full h-52">
          <div className="w-1/2 h-6 bg-[#EBFFF2] rounded-t-2xl flex items-center justify-center">
          </div>
          <div className="w-full h-46 px-6 py-4 bg-[#EBFFF2] rounded-b-2xl  rounded-tr-2xl flex items-end">
            <p>Im SwissGambit</p>
          </div>
        </div>
        <div className="w-full h-52">
          <div className="w-1/2 h-6 bg-[#EBFFF2] rounded-t-2xl flex items-center justify-center"></div>
          <div className="w-full h-34 px-6 py-4 bg-[#EBFFF2] rounded-tr-2xl flex items-center justify-center">
            <i className="text-[#111317] fa fa-plus fa-2x mt-8"></i>
          </div>
          <div className="w-full h-12 px-6 py-4 bg-[#EBFFF2] rounded-b-2xl flex items-end">
            <p>Create new project</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProjects