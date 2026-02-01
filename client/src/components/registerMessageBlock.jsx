const RegisterMessageBlock = () => {
  return (
    <div className="w-3/5 flex flex-col justify-center items-center text-center space-y-16 text-[#1f1f1f]">
        <div className="flex flex-row items-center space-x-4">
            <i className="fa fa-4x fa-briefcase text-[#003c66]"></i>
            <div className="text-[#003c66] font-fustat-extrabold text-5xl">
                PortfolioHub
            </div>
        </div>
        <div className="text-3xl font-fustat-bold leading-12">
            <p>Start your portfolio journey.</p>
            <p className="text-[#B5446E]">Made by a creative,</p>
            <p className="text-[#B5446E]">for the creatives.</p>
        </div>
    </div>
  );
};

export default RegisterMessageBlock;