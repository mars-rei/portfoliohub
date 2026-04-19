import { useState } from 'react';

function CreateSlidesModal({ 
    projects, 
    onClose, 
    onCreateSlides
}) {

    const [selectedMedia, setSelectedMedia] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const getMediaType = (url) => {
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i;
        const videoExtensions = /\.(mp4|mov|webm|avi|mkv|m4v|flv|wmv|ogv)(\?.*)?$/i;
        
        if (imageExtensions.test(url)) return 'image';
        if (videoExtensions.test(url)) return 'video';
        return 'undefined';
    };

    const toggleMediaSelection = (project, mediaIndex) => {
        const mediaItem = project.media[mediaIndex];
    
        setSelectedMedia(prev => {
            const isSelected = prev.some(media => media.url === mediaItem.cloud_url);
            if (isSelected) {
                return prev.filter(media => media.url !== mediaItem.cloud_url);
            } else {
                return [...prev, {
                    url: mediaItem.cloud_url,
                    type: getMediaType(mediaItem.cloud_url)
                }];
            }
        });
    };

    const handleCreateSlides = () => {
        if (selectedMedia.length === 0) {
            alert('Please select at least one media item');
            return;
        }

        onCreateSlides(selectedMedia);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">
                        Create Slides
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto flex gap-6 p-6">
                    {/* shows projects to select media from */}
                    <div className="w-1/3 flex flex-col space-y-4">
                        <p className="text-md font-fustat-semibold text-[#EBFFF2]">Projects</p>
                        <div className="space-y-2">
                            {projects && projects.length > 0 ? (
                                projects.map(project => (
                                    <button
                                        key={project.id}
                                        onClick={() => setSelectedProject(project.id)}
                                        className={`
                                            w-full text-left text-[#EBFFF2] px-4 py-3 rounded-lg 
                                            ${selectedProject === project.id ? 'bg-[#B5446E]' : `bg-[#1F1F1F]`}
                                        `}
                                    >
                                        <p className="font-fustat-semibold">{project.title}</p>
                                        <p className="text-xs text-[#EBFFF2] mt-1">
                                            {project.media?.length || 0} items
                                        </p>
                                    </button>
                                ))
                            ) : (
                                <p className="text-sm text-[#EBFFF2] text-center py-4">No projects found</p>
                            )}
                        </div>
                    </div>

                    {/* media */}
                    <div className="flex-1 flex flex-col">
                        {selectedProject ? (
                            <>
                                <p className="text-md font-fustat-semibold mb-3 text-[#EBFFF2]">
                                    Select Media
                                </p>
                                <div className="grid grid-cols-3 gap-4 overflow-y-auto">
                                    {projects
                                        .find(p => p.id === selectedProject)
                                        ?.media?.map((media, key) => {
                                            const mediaType = getMediaType(media.cloud_url);
                                            const isSelected = selectedMedia.some(m => m.url === media.cloud_url);

                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => toggleMediaSelection(
                                                        projects.find(p => p.id === selectedProject),
                                                        key
                                                    )}
                                                    className="relative group rounded-lg overflow-hidden border-2 border-[#EBFFF2]"
                                                >
                                                    {/* preview of media */}
                                                    <div className={`w-full aspect-square flex items-center justify-center overflow-hidden relative`}>
                                                        {mediaType === 'image' ? (
                                                            <img
                                                                src={media.cloud_url}
                                                                alt="media"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : mediaType === 'video' ? (
                                                            <div className="w-full h-full bg-gradient-to-br from-[#B5446E]/20 to-[#B5446E]/5 flex items-center justify-center">
                                                                <i className="fa fa-play fa-2x text-[#B5446E]"></i>
                                                            </div>
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-[#B5446E]/20 to-[#B5446E]/5 flex items-center justify-center">
                                                                <i className="fa fa-file fa-2x text-[#B5446E]"></i>
                                                            </div>
                                                        )}

                                                        {/* checkbox to show selected items */}
                                                        <div className="absolute top-2 right-2 w-5 h-5 rounded border-2 border-[#EBFFF2] flex items-center justify-center bg-black/30">
                                                            {isSelected && (
                                                                <i className="fa fa-check text-[#EBFFF2] text-xs"></i>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* caption */}
                                                    {media.caption && (
                                                        <p className={`text-xs p-2 text-center text-[#EBFFF2] truncate`}>
                                                            {media.caption}
                                                        </p>
                                                    )}
                                                </button>
                                            );
                                        }) || []}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center text-center text-[#EBFFF2] space-y-3">
                                <i className="fa fa-images fa-3x"></i>
                                <p>Select a project to choose slides media</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-6 py-4 border-t-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-[#EBFFF2]">
                            {selectedMedia.length} item{selectedMedia.length !== 1 ? 's' : ''} selected
                        </p>
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="justify-center flex items-center rounded-full border-2 border-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateSlides}
                                disabled={selectedMedia.length === 0}
                                className={`justify-center flex items-center rounded-full border border-transparent px-8 py-2 text-md text-[#EBFFF2] ${
                                    selectedMedia.length === 0
                                        ? 'bg-gray-600 opacity-50 cursor-not-allowed'
                                        : 'bg-[#B5446E]'
                                }`}
                            >
                                Create Slides
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateSlidesModal;