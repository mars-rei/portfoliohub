import { Link} from "@inertiajs/react"; 
import { useState } from "react";

import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword, auth }) {

    // password toggling
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // form controls
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <header>
                <nav>
                    <div className="bg-[#ebfff2] flex justify-between items-center px-4 border-b border-[##1f1f1f] h-16">
                        <Link href="/" className="text-[#003c66] font-fustat-extrabold text-3xl">
                            PortfolioHub
                        </Link>

                        <div className="flex items-center text-[#1f1f1f] space-x-4 font-fustat-bold text-xl">
                            <Link href="/about">About</Link>
                            <Link href="/documentation">Documentation</Link>

                            {auth.user ? (
                                <Link href={route('dashboard')} >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link href={route('register')} >
                                    Register
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

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
                    <form onSubmit={submit}>
                        <div className="flex flex-col justify-start w-full space-y-4">
                            <div className="space-y-2">
                                <p>Email</p>

                                <input 
                                    id="email"
                                    type="email" 
                                    name="email"
                                    value={data.email}
                                    placeholder="Enter your email" 
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2]"
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <p>Password</p>
                                <div className="text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md items-center justify-end flex focus-within:outline-none focus-within:ring-0 focus-within:border-[#EBFFF2] pr-2">
                                    <input
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="w-full bg-transparent outline-none border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none focus-visible:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                                    >
                                        <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} fa-lg pr-1`}></i>
                                    </button>
                                </div>

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex flex-row justify-between w-full text-base pt-3">
                            <label className="flex items-center space-x-2">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                />
                                <span>
                                    Remember me
                                </span>
                            </label>
                            
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-[#B5446E]"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <button 
                            type="submit" 
                            className="rounded-full py-3 mt-8 px-28 text-xl bg-[#B5446E] items-center justify-center flex cursor-pointer"
                            disabled={processing}
                        >
                            Log in
                        </button>
                    </form>
                    
                    <div className="flex flex-row text-base pt-1 space-x-1">
                        <p>Don't have an account?</p>
                        <Link href={route('register')} >
                            <p className="text-[#B5446E]">Register</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

