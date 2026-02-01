import SearchBar from './searchBar.jsx';

const LeftCanvasMenu = () => {
  return (
    <div className="w-1/6 flex flex-col justify-between">
      <div className="flex flex-row items-center w-full px-4 h-20 text-lg font-fustat-bold space-x-2 justify-between">
        <div className="flex flex-row items-center space-x-2">
          <i className="fa fa-xl fa-briefcase text-[#003c66]"></i>
          <p>art</p>
        </div>
        <img 
            src="/userIcon.svg" 
            className="w-8 h-8"
          />
      </div>
      <div className="h-full space-y-4 p-4 border-[#111317] border-y-2">
        <SearchBar />
        <div className="space-y-2 text-lg font-fustat-semibold">
          <p>Layers</p>
          <div className="text-base font-fustat-medium">
            <p>Home</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center w-full px-4 py-2 text-lg font-fustat-medium space-x-2">
        <i className="fa fa-folder fa-sm"></i>
        <p>Project Media</p>
      </div>
      <div className="flex flex-row items-center w-full px-4 py-2 border-t-2 border-[#111317] text-lg font-fustat-medium space-x-2">
        <i className="fa fa-shapes fa-sm"></i>
        <p>Component Libraries</p>
      </div>
    </div>
  );
};

export default LeftCanvasMenu;