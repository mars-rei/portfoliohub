import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Projects from '@/Layouts/Projects';

export default function Dashboard() {
    return (
        <div>
            
            <AuthenticatedLayout>
                <div className="flex h-[calc(100vh-4rem)]">
                    <div className="w-1/6 flex flex-col justify-between">
                        <div className="space-y-4 p-4">

                            <div className="flex flex-row items-center w-full px-4 py-1 border-2 border-[#111317] rounded-md text-lg font-fustat-medium space-x-2">
                                <i className="fa fa-search fa-sm"></i>
                                <p>Search</p>
                            </div>

                            <div className="space-y-2 text-lg font-fustat-bold">
                            <p>Portfolios</p>
                            <p>Projects</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center w-full px-4 py-2 border-t border-[#111317] text-lg font-fustat-medium space-x-2">
                            <i className="fa fa-trash fa-sm"></i>
                            <p>Recently deleted</p>
                        </div>
                    </div>

                    <div className="w-5/6 bg-[#111317] p-12 font-fustat-semibold text-md">
                        <Projects />
                    </div>
                </div>
                
            </AuthenticatedLayout>
        </div>
    );
}
