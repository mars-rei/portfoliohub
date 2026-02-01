const VerifyBlock = () => {
  return (
    <div className="w-3/5 bg-[#111317] flex flex-col justify-center text-[#EBFFF2] px-44 text-xl space-y-12">
        <div className="flex justify-start items-center space-x-2 text-base">
            <i className="fa fa-chevron-left fa-lg"></i>
            <p>Back to registration</p>
        </div>
        <div className="flex flex-col items-center w-full">
            <div className="font-fustat-semibold text-5xl">
                Please verify your email
            </div>
        </div>
        <div className="flex flex-col items-center w-full space-y-8">
            <div>
                <p>We have sent a code to <span className="font-fustat-semibold">user@gmail.com</span></p>
            </div>
            <div className="flex flex-row space-x-4">
                <div className="bg-[#1F1F1F] w-20 h-24 border-[#EBFFF2] border-2 rounded-xl"></div>
                <div className="bg-[#1F1F1F] w-20 h-24 border-[#EBFFF2] border-2 rounded-xl"></div>
                <div className="bg-[#1F1F1F] w-20 h-24 border-[#EBFFF2] border-2 rounded-xl"></div>
                <div className="bg-[#1F1F1F] w-20 h-24 border-[#EBFFF2] border-2 rounded-xl"></div>
                <div className="bg-[#1F1F1F] w-20 h-24 border-[#EBFFF2] border-2 rounded-xl"></div>
                <div className="bg-[#1F1F1F] w-20 h-24 border-[#EBFFF2] border-2 rounded-xl"></div>
            </div>
            <div className="rounded-full py-3 px-24 text-xl bg-[#B5446E] items-center justify-center flex">
                Verify
            </div>
            <div className="flex flex-row text-base space-x-1">
                <p>Didn't recieve the email?</p>
                <p className="text-[#B5446E]">Click to resend</p>
            </div>
        </div>
    </div>
  );
};

export default VerifyBlock;