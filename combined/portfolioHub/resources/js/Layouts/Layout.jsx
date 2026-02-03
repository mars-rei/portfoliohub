import { Link } from "@inertiajs/react";

export default function Layout({children}) {
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
                            <Link href="/profile">
                                <i className="fa fa-circle-user text-[#B5446E] fa-xl"></i>
                            </Link>
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