const Projects = ({ projects = [], onProjectClick, onCreateClick }) => {

  const projectCount = projects?.length || 0;

  if (projectCount === 0) {
    return (
      <div className="grid grid-cols-4 gap-8">
        <div 
          onClick={onCreateClick}
          className="w-full h-52 flex flex-col cursor-pointer group"
        >
          <div className="w-1/2 h-6 bg-[#EBFFF2] rounded-t-2xl flex-shrink-0 group-hover:bg-[#B5446E]"></div>
            <div className="flex-grow bg-[#EBFFF2] rounded-tr-2xl p-6 flex items-center justify-center group-hover:bg-[#B5446E]">
              <i className="text-[#111317] fa fa-plus fa-2x -mb-6"></i>
            </div>
            <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E]">
              <p>Create new project</p>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {projects.map((project) => (
        <div 
          key={project.id} 
          onClick={() => onProjectClick(project)}
          className="w-full h-52 flex flex-col cursor-pointer group"
        >
          <div className="w-1/2 h-6 bg-[#EBFFF2] rounded-t-2xl flex-shrink-0 group-hover:bg-[#B5446E]"></div>
          <div className="flex-grow bg-[#EBFFF2] rounded-b-2xl rounded-tr-2xl p-6 flex items-end group-hover:bg-[#B5446E]">
            <p className="-mb-3">{project.title}</p>
          </div>
        </div>
      ))}

      <div 
        onClick={onCreateClick}
        className="w-full h-52 flex flex-col cursor-pointer group"
      >
        <div className="w-1/2 h-6 bg-[#EBFFF2] rounded-t-2xl flex-shrink-0 group-hover:bg-[#B5446E]"></div>
          <div className="flex-grow bg-[#EBFFF2] rounded-tr-2xl p-6 flex items-center justify-center group-hover:bg-[#B5446E]">
            <i className="text-[#111317] fa fa-plus fa-2x -mb-6"></i>
          </div>
          <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E]">
            <p>Create new project</p>
          </div>
      </div>
    </div>
  );
};

export default Projects;