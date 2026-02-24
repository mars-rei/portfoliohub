export default function ProjectShow({ 
    project, 
    allMedia = [], 
    onBack, 
    onEdit, 
    onDelete,
    onMediaClick,
    onAddMediaClick
}) {
    
    // get all media for this project
    const projectMedia = allMedia.filter(item => 
        item.projects?.some(p => p.id === project.id)
    );

    return (
        <div>
            <div className="mb-8">
                <button 
                    onClick={onBack}
                    className="text-[#EBFFF2] hover:text-[#B5446E] transition-colors flex items-center gap-2 mb-4"
                >
                    <i className="fa fa-arrow-left"></i>
                    <span>Back to all projects</span>
                </button>

                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl text-[#EBFFF2] mb-2">{project.title}</h1>
                            <p className="text-gray-300 mb-4">{project.description}</p>
                            <div className="text-sm text-gray-400">
                                <p>Started: {new Date(project.started_on).toLocaleDateString()}</p>
                                {project.ended_on && (
                                    <p>Ended: {new Date(project.ended_on).toLocaleDateString()}</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={() => onEdit(project)}
                                className="justify-center flex items-center rounded-full bg-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                            >
                                Edit Details
                            </button>
                            <button
                                onClick={() => onDelete(project)}
                                className="justify-center flex items-center rounded-full border border-transparent bg-[#872328] px-8 py-2 text-md text-[#EBFFF2]"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white">Project Media</h2>
                    <button
                        onClick={() => onAddMediaClick(project.id)}
                        className="justify-center flex items-center rounded-full bg-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                    >
                        <i className="fa fa-plus mr-2"></i>
                        Add Media
                    </button>
                </div>
            </div>

            {projectMedia.length === 0 ? (
                <div className="text-white text-center py-12 bg-[#1E1E24] rounded-lg">
                    <p className="mb-4">No media in this project yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-8">
                    {projectMedia.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => onMediaClick(item)}
                            className="w-full h-52 flex flex-col cursor-pointer group"
                        >          
                            <div className="flex-grow bg-[#EBFFF2] rounded-t-2xl flex items-center justify-center group-hover:bg-[#B5446E] overflow-hidden">
                                {item.file_type?.match(/(jpg|jpeg|png|gif|webp)/i) ? (
                                    <img 
                                        src={item.cloud_url} 
                                        alt={item.caption || 'Media'}
                                        className="object-cover h-full w-full"
                                    />
                                ) : (
                                    <i className="text-[#111317] fa fa-file fa-2x -mb-6"></i>
                                )}
                            </div>

                            <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E]">
                                <p className="text-sm truncate">{item.file_name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}