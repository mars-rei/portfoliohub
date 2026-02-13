import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { useState } from "react";

export default function Register( auth ) {
    // toggle passwords
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // form submission
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div>
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
                                <Link href={route('login')} >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

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
                    <form onSubmit={submit} className="flex flex-col justify-start w-full space-y-4">
                        <div className="space-y-2">
                            <p>Name</p>
                            <input 
                                id="name"
                                name="name"
                                value={data.name}
                                type="text" 
                                autoComplete="name"
                                placeholder="Enter your name" 
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                className="text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md outline-none focus:outline-none focus:ring-0 focus:border-[#EBFFF2]"
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

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
                                required
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
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full bg-transparent outline-none border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none focus-visible:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="outline-none"
                                >
                                    <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} fa-lg pr-1`}></i>
                                </button>
                            </div>

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="space-y-2">
                            <p>Confirm Password</p>
                            <div className="text-base font-fustat-medium bg-[#1F1F1F] w-full h-12 border-[#EBFFF2] border-2 rounded-md items-center justify-end flex focus-within:outline-none focus-within:ring-0 focus-within:border-[#EBFFF2] pr-2">
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="w-full bg-transparent outline-none border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none focus-visible:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="outline-none"
                                >
                                    <i className={`fa-solid ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'} fa-lg pr-1`}></i>
                                </button>
                            </div>

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="rounded-full py-3 mt-8 px-28 text-xl bg-[#B5446E] items-center justify-center flex cursor-pointer"
                            disabled={processing}
                        >
                            Register
                        </button>
                    </form>
                    
                    <div className="flex flex-row text-base pt-1 space-x-1">
                        <p>Already have an account?</p>
                        <Link
                            href={route('login')}
                            className="text-[#B5446E]"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
