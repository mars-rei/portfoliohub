const Media = ({ media = [], onMediaClick, onUploadClick }) => {
  const mediaCount = media?.length || 0;

  if (mediaCount === 0) {
    return (
      <div className="grid grid-cols-4 gap-8">
        <div 
          onClick={onUploadClick}
          className="w-full h-52 flex flex-col cursor-pointer group"
        >
          <div className="flex-grow bg-[#EBFFF2] rounded-t-2xl p-6 flex items-center justify-center group-hover:bg-[#B5446E]">
            <i className="text-[#111317] fa fa-plus fa-2x -mb-6"></i>
          </div>
          <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E]">
            <p>Upload new media</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {media.map((item) => (
        <div 
          key={item.id} 
          onClick={() => onMediaClick(item)}
          className="w-full h-52 flex flex-col cursor-pointer group"
        >          
          {/* preview for image like media */}
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

      {/* for uploading new media */}
      <div 
        onClick={onUploadClick}
        className="w-full h-52 flex flex-col cursor-pointer group"
      >
        <div className="flex-grow bg-[#EBFFF2] rounded-t-2xl p-6 flex items-center justify-center group-hover:bg-[#B5446E]">
          <i className="text-[#111317] fa fa-plus fa-2x -mb-6"></i>
        </div>
        <div className="h-12 bg-[#EBFFF2] rounded-b-2xl p-4 flex items-center group-hover:bg-[#B5446E]">
          <p>Upload new media</p>
        </div>
      </div>
    </div>
  );
};

export default Media;