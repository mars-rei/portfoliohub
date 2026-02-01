const HomePortfolios = () => {
  return (
    <div className="w-5/6 bg-[#111317] p-12 font-fustat-semibold text-md">
      <div className="grid grid-cols-4 gap-8">
        <div className="w-full h-52">
          <div className="w-full h-40 bg-[#003C66] rounded-t-2xl"></div>
          <div className="w-full h-12 px-4 bg-[#EBFFF2] rounded-b-2xl flex justify-between items-center">
            <p>animation</p>
            <p>Just now</p>
          </div>
        </div>
        <div className="w-full h-52">
          <div className="w-full h-40 bg-[#003C66] rounded-t-2xl"></div>
          <div className="w-full h-12 px-4 bg-[#EBFFF2] rounded-b-2xl flex justify-between items-center">
            <p>art</p>
            <p>3 mins ago</p>
          </div>
        </div>
        <div className="w-full h-52">
          <div className="w-full h-40 bg-[#003C66] rounded-t-2xl flex items-center justify-center">
            <i className="text-[#EBFFF2] fa fa-plus fa-2x"></i>
          </div>
          <div className="w-full h-12 px-4 bg-[#EBFFF2] rounded-b-2xl flex items-center">
            <p>Create new portfolio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePortfolios;