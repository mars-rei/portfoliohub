export default function ShowProjectModal({ isOpen, onClose, project, onEdit, onDelete }) {
    if (!isOpen || !project) return null;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isOngoing = !project.ended_on;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">
                        {project.title}
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                {/* project details */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="col-span-2">
                        <p className="text-sm text-gray-400">Description</p>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">{project.description}</p>
                    </div>

                    {isOngoing ? (
                        //  for ongoing projects
                        <>
                            <div className="">
                                <p className="text-sm text-gray-400">Duration</p>
                                <p className="text-[#EBFFF2] text-base font-fustat-medium">
                                    {formatDate(project.started_on)} to Now
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Last Updated</p>
                                <p className="text-[#EBFFF2] text-base font-fustat-medium">{formatDate(project.updated_at)}</p>
                            </div>
                        </>
                    ) : (
                        // for completed projects
                        <>
                            <div>
                                <p className="text-sm text-gray-400">Started On</p>
                                <p className="text-[#EBFFF2] text-base font-fustat-medium">
                                    {formatDate(project.started_on)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Ended On</p>
                                <p className="text-[#EBFFF2] text-base font-fustat-medium">
                                    {formatDate(project.ended_on)}
                                </p>
                            </div>
                            
                            <div>
                                <p className="text-sm text-gray-400">Last Updated</p>
                                <p className="text-[#EBFFF2] text-base font-fustat-medium">{formatDate(project.updated_at)}</p>
                            </div>
                        </>
                    )}
                </div>

                {/* form buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => onDelete(project)}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#872328] px-8 py-2 text-md text-[#EBFFF2]"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => onEdit(project)}
                        className="justify-center flex items-center rounded-full bg-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                    >
                        Edit Details
                    </button>
                </div>
            </div>
        </div>
    );
}