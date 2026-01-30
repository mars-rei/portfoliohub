const Welcome = () => {
  return (
    <div className="min-h-screen">
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col space-y-12">
                <div className="text-[#1f1f1f] font-fustat-semibold text-5xl text-center">
                    Thanks for signing up to
                </div>
                <div className="flex flex-row items-center space-x-4 justify-center">
                    <div>
                        <img 
                            src="/icon.svg" 
                            className="w-16 h-16" // i don't know why there's a blue line on top of it
                        />
                    </div>
                    <div className="text-[#003c66] font-fustat-extrabold text-5xl">
                        PortfolioHub
                    </div>
                </div>
                <div className="text-3xl font-fustat-bold leading-12 text-center">
                    <p className="text-[#B5446E]">Made by a creative,</p>
                    <p className="text-[#B5446E]">for the creatives.</p>
                </div>
                <div className="text-md font-fustat-bold text-center pt-4">
                    <p className="text-[#1f1f1f]">Redirecting you in... <span className="text-[#B5446E]">3 seconds</span></p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Welcome;

<div className="flex flex-col items-center justify-center text-[#1f1f1f]">
            
            
        </div>