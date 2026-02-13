const Projects = () => {
  return (
    <div className="grid grid-cols-4 gap-8 w-full h-full">
  {/* First folder - simplified */}
  <div className="w-full h-52 flex flex-col">
    <div className="w-1/2 h-6 bg-[#EBFFF2] rounded-t-2xl flex-shrink-0"></div>
    <div className="flex-grow bg-[#EBFFF2] rounded-b-2xl rounded-tr-2xl p-6 flex items-end">
      <p className="-mb-3">Im SwissGambit</p>
    </div>
  </div>

  {/* Second folder - simplified */}
  <div className="w-full h-52 flex flex-col">
    <div className="w-1/2 h-6 bg-[#EBFFF2] rounded-t-2xl flex-shrink-0"></div>
    <div className="flex-grow bg-[#EBFFF2] rounded-tr-2xl p-6 flex items-center justify-center">
      <i className="text-[#111317] fa fa-plus fa-2x -mb-6"></i>
    </div>
    <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center">
      <p>Create new project</p>
    </div>
  </div>
</div>
  );
};

export default Projects;