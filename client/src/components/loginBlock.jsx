const LoginBlock = () => {
  return (
    <div className="w-2/5 bg-[#111317] flex flex-col justify-center items-center text-[#EBFFF2] px-44 text-xl">
        <div className="font-fustat-semibold text-5xl pb-12">
            Login
        </div>
        <div className="flex flex-col justify-start w-full space-y-4">
            <div className="space-y-2">
                <p>Email</p>
                <div className="bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md"></div>
            </div>
            <div className="space-y-2">
                <p>Password</p>
                <div className="bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md items-center justify-end flex px-3">
                    <i className="fa-solid fa-eye-slash fa-md"></i>
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full text-base pt-3">
            <div className="flex items-center space-x-2">
                <i className="fa-regular fa-square fa-xl"></i>
                <p>Remember me</p>
            </div>
            
            <p>Forgot password?</p>
        </div>
        <div className="rounded-full py-3 mt-8 px-28 text-xl bg-[#B5446E] items-center justify-center flex">
            Login
        </div>
    </div>
  );
};

export default LoginBlock;