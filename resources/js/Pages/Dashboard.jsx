import { useState } from "react";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Portfolios from '@/Layouts/Portfolios';
import Projects from '@/Layouts/Projects';

export default function Dashboard() {

    // toggling between portfolios and projects (and recent deleted later on)
    const [activeView, setActiveView] = useState('portfolios'); 
    
    const handleViewChange = (view) => {
        setActiveView(view);
    };

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
                                <p 
                                    onClick={() => handleViewChange('portfolios')}
                                    className={`cursor-pointer hover:text-[#B5446E] ${activeView === 'portfolios' ? 'text-[#003c66]' : ''}`}
                                >
                                    Portfolios
                                </p>


                                <p 
                                    onClick={() => handleViewChange('projects')}
                                    className={`cursor-pointer hover:text-[#B5446E] ${activeView === 'projects' ? 'text-[#003c66]' : ''}`}
                                >
                                    Projects
                                </p>
                            </div>
                        </div>

                        <div 
                            onClick={() => handleViewChange('deleted')}
                            className={`flex flex-row items-center w-full px-4 py-2 border-t border-[#111317] text-lg font-fustat-medium space-x-2 cursor-pointer hover:text-[#B5446E] ${activeView === 'deleted' ? 'text-[#003c66]' : ''}`}
                        >
                            <i className="fa fa-trash fa-sm"></i>
                            <p>Recently deleted</p>
                        </div>
                    </div>

                    <div className="w-5/6 bg-[#111317] p-12 font-fustat-semibold text-md">
                        {activeView === 'projects' && <Projects />}
                        {activeView === 'portfolios' && <Portfolios />}
                        {activeView === 'deleted' && (
                            <div className="text-white">
                                <p>Recently Deleted View</p>
                                {/* add recently deleted component here later */}
                            </div>
                        )}
                    </div>
                </div>
                
            </AuthenticatedLayout>
        </div>
    );
}
