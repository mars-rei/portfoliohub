import { Link } from "@inertiajs/react"; 
import { useState } from "react";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

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
                    <form className="flex flex-col justify-start w-full space-y-4">
                        <div className="space-y-2">
                            <p>Name</p>
                            <input 
                                type="text" 
                                placeholder="Enter your name" 
                                className="text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md p-2 outline-none"
                            />
                        </div>
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
                        <div className="space-y-2">
                            <p>Confirm Password</p>
                            <div className="text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md items-center justify-end flex p-2">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="w-full bg-transparent outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="outline-none"
                                >
                                    <i className={`fa-solid ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'} fa-lg pr-1`}></i>
                                </button>
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="rounded-full py-3 mt-8 px-28 text-xl bg-[#B5446E] items-center justify-center flex cursor-pointer"
                        >
                            Register
                        </button>
                    </form>
                    
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