import SearchBar from '../components/searchBar.jsx';

const HomeMenu = () => {
  return (
    <div className="w-1/6 flex flex-col justify-between">
      <div className="space-y-4 p-4">
        <SearchBar />
        <div className="space-y-2 text-lg font-fustat-bold">
          <p>Portfolios</p>
          <p>Projects</p>
        </div>
      </div>
      <div className="flex flex-row items-center w-full px-4 py-2 border-t border-[#111317] text-lg font-fustat-medium space-x-2">
        <i className="fa fa-trash fa-sm"></i>
        <p>Recently deleted</p>
      </div>
    </div>
  );
};

export default HomeMenu;