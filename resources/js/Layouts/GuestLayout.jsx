import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen">
            <nav>
                <div className="bg-[#ebfff2] flex justify-between items-center px-4 border-b border-[#c6c6c6] h-16">
                    <Link href="/" className="text-[#003c66] hover:text-[#B5446E] font-fustat-extrabold text-3xl">
                        PortfolioHub
                    </Link>

                    <div className="flex items-center text-[#1f1f1f] space-x-4 font-fustat-bold text-xl">
                        <Link className="hover:text-[#B5446E]" href="/about">About</Link>
                        <Link className="hover:text-[#B5446E]" href="/documentation">Documentation</Link>
                        <Link className="hover:text-[#B5446E]" href="/login">Log in</Link>
                        <Link className="hover:text-[#B5446E]" href="/register">Register</Link>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
