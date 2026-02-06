import { Link} from "@inertiajs/react"; 
import { useState } from "react";

import TickBox from '../Components/TickBox.jsx';

export default function Home() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex h-[calc(100vh-4rem)]">
                {/* login message block */}
                <div className="w-3/5 flex flex-col justify-center items-center text-center space-y-20 text-[#1f1f1f]">
                    <div className="text-3xl font-fustat-bold leading-12">
                        <p>Welcome to <span className="text-[#003c66]">PortfolioHub</span>,</p>
                        <p>a portfolio site builder</p>
                        <p className="text-[#B5446E]">made by a creative,</p>
                        <p className="text-[#B5446E]">for the creatives.</p>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <i className="fa fa-4x fa-briefcase text-[#003c66]"></i>
                        <div className="text-[#003c66] font-fustat-extrabold text-5xl">
                            PortfolioHub
                        </div>
                    </div>
                </div>

                {/* login block */}
                <div className="w-2/5 bg-[#111317] flex flex-col justify-center items-center text-[#EBFFF2] px-44 text-xl">
                    <div className="font-fustat-semibold text-5xl pb-12">
                        Login
                    </div>
                    <form>
                        <div className="flex flex-col justify-start w-full space-y-4">
                            <div className="space-y-2">
                                <p>Email</p>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md p-2 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <p>Password</p>
                                <div className="text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md items-center justify-end flex p-2">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="w-full bg-transparent outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="outline-none"
                                    >
                                        <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} fa-lg pr-1`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between w-full text-base pt-3">
                            <TickBox />
                            
                            <p>Forgot password?</p>
                        </div>
                        <button 
                            type="submit" 
                            className="rounded-full py-3 mt-8 px-28 text-xl bg-[#B5446E] items-center justify-center flex cursor-pointer"
                        >
                            Log in
                        </button>
                    </form>
                    <div className="flex flex-row text-base pt-1 space-x-1">
                        <p>Don't have an account?</p>
                        <Link href="/register">
                            <p className="text-[#B5446E]">Register</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}