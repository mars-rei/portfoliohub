import { Link } from "@inertiajs/react";

export default function Register() {
    return (
        <>
            <div className="flex h-[calc(100vh-4rem)]">
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

                <div className="w-2/5 bg-[#111317] flex flex-col justify-center items-center text-[#EBFFF2] px-44 text-xl">
                    <div className="font-fustat-semibold text-5xl pb-12">
                        Register
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
                        <div className="space-y-2">
                            <p>Confirm Password</p>
                            <div className="bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md items-center justify-end flex px-3">
                                <i className="fa-solid fa-eye-slash fa-md"></i>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-full py-3 mt-8 px-28 text-xl bg-[#B5446E] items-center justify-center flex">
                        Register
                    </div>
                    <div className="flex flex-row text-base pt-1 space-x-1">
                        <p>Already have an account?</p>
                        <Link href="/">
                            <p className="text-[#B5446E]">Log in</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}