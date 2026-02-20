import { Link } from "@inertiajs/react";

export default function Layout({children, auth}) {
    return (
        <>
            <header>
                <nav>
                    <div className="bg-[#ebfff2] flex justify-between items-center px-4 border-b border-[#1f1f1f] h-16">
                        <Link href="/" className="text-[#003c66] hover:text-[#B5446E] font-fustat-extrabold text-3xl">
                            PortfolioHub
                        </Link>

                        <div className="flex items-center text-[#1f1f1f] space-x-4 font-fustat-bold text-xl">
                            <Link className="hover:text-[#B5446E]" href="/about">About</Link>
                            <Link className="hover:text-[#B5446E]" href="/documentation">Documentation</Link>

                            {auth.user ? (
                                <Link className="hover:text-[#B5446E]" href={route('dashboard')} >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link className="hover:text-[#B5446E]" href={route('register')} >
                                    Register
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </>
    )
}