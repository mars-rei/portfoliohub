const NavBar = () => {
  return (
    <div className="bg-[#ebfff2] flex justify-between items-center px-4 border-b-2 border-[##1f1f1f] h-16">
      <div className="text-[#003c66] font-fustat-extrabold text-3xl">
        PortfolioHub
      </div>

      <div className="flex items-center text-[#1f1f1f] space-x-4 font-fustat-bold text-xl">
        <div>
          About
        </div>
        <div>
          Documentation
        </div>
        <div>
          <img 
            src="/userIcon.svg" 
            className="w-8 h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;