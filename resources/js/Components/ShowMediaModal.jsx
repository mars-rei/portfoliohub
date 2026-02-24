export default function ShowMediaModal({ isOpen, onClose, media, onDelete, onEdit }) {
    if (!isOpen || !media) return null;

    const isImage = media.file_type?.match(/(jpg|jpeg|png|gif|webp)/i);

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#111317] border-[#EBFFF2] border-2 p-4 sm:rounded-lg sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-fustat-medium text-2xl text-[#EBFFF2]">
                        {media.file_name}
                    </h2>
                    <button onClick={onClose} className="text-[#EBFFF2] hover:text-[#B5446E]">
                        <i className="fa fa-times fa-xl"></i>
                    </button>
                </div>

                <div className="mb-4">
                    {isImage ? (
                        <img 
                            src={media.cloud_url} 
                            alt={media.caption}
                            className="w-full object-contain border-[#EBFFF2] border-4"
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="fa fa-file fa-4x"></span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="col-span-2">
                        <p className="text-sm text-gray-400">Caption</p>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">{media.caption}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">File type:</p>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">
                            .{media.file_type}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Uploaded on:</p>
                        <p className="text-[#EBFFF2] text-base font-fustat-medium">{new Date(media.created_at).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* form buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => onDelete(media)}
                        className="justify-center flex items-center rounded-full border border-transparent bg-[#872328] px-8 py-2 text-md text-[#EBFFF2]"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => onEdit(media)}
                        className="justify-center flex items-center rounded-full bg-[#B5446E] text-[#EBFFF2] px-8 py-2 text-md"
                    >
                        Edit Details
                    </button>
                </div>
            </div>
        </div>
    );
}