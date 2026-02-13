import { Link } from '@inertiajs/react';

export default function Home( auth ) {

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
                                <>
                                    <Link href={route('login')} >
                                        Log in
                                    </Link>
                                    <Link href={route('register')} >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            <div className="flex h-[calc(100vh-4rem)] w-full justify-center flex-col items-center gap-y-8">
                <div className="text-3xl font-fustat-bold leading-12 text-center">
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
        </>
    );
}
