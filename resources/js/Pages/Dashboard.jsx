import { useState } from "react";
import { router, usePage } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Portfolios from '@/Pages/Portfolios/Index';
import Projects from '@/Layouts/Projects';
import CreatePortfolioModal from '@/Components/CreatePortfolioModal';
import EditPortfolioModal from '@/Components/EditPortfolioModal';
import ShowPortfolioModal from '@/Components/ShowPortfolioModal';
import DeletePortfolioModal from '@/Components/DeletePortfolioModal';

export default function Dashboard() {
    const { portfolios: initialPortfolios, industries } = usePage().props;
    
    // toggling between portfolios and projects
    const [activeView, setActiveView] = useState('portfolios');
    
    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showShowModal, setShowShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    
    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const handlePortfolioClick = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setShowShowModal(true);
    };

    const handleEditClick = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setShowEditModal(true);
        setShowShowModal(false); // Close show modal
    };

    const handleDeleteClick = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setShowDeleteModal(true);
        setShowShowModal(false); // Close show modal
    };

    const handleCloseModals = () => {
        setShowCreateModal(false);
        setShowEditModal(false);
        setShowShowModal(false);
        setShowDeleteModal(false);
        setSelectedPortfolio(null);
    };

    const handlePortfolioCreated = () => {
        // Refresh the page to get updated portfolios
        router.reload();
    };

    const handlePortfolioUpdated = () => {
        router.reload();
        handleCloseModals();
    };

    const handlePortfolioDeleted = () => {
        router.reload();
        handleCloseModals();
    };

    return (
        <div>
            <AuthenticatedLayout>
                <div className="flex h-[calc(100vh-4rem)]">
                    {/* Sidebar - unchanged */}
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

                    {/* main */}
                    <div className="w-5/6 bg-[#111317] p-12 font-fustat-semibold text-md">
                        {activeView === 'projects' && <Projects />}
                        {activeView === 'portfolios' && (
                            <Portfolios 
                                portfolios={initialPortfolios} 
                                onPortfolioClick={handlePortfolioClick}
                                onCreateClick={() => setShowCreateModal(true)}
                            />
                        )}
                        {activeView === 'deleted' && (
                            <div className="text-white">
                                <p>Recently Deleted View</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modals */}
                <CreatePortfolioModal
                    isOpen={showCreateModal}
                    onClose={handleCloseModals}
                    industries={industries}
                    onSuccess={handlePortfolioCreated}
                />

                <ShowPortfolioModal
                    isOpen={showShowModal}
                    onClose={handleCloseModals}
                    portfolio={selectedPortfolio}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                />

                <EditPortfolioModal
                    isOpen={showEditModal}
                    onClose={handleCloseModals}
                    portfolio={selectedPortfolio}
                    industries={industries}
                    onSuccess={handlePortfolioUpdated}
                />

                <DeletePortfolioModal
                    isOpen={showDeleteModal}
                    onClose={handleCloseModals}
                    portfolio={selectedPortfolio}
                    onSuccess={handlePortfolioDeleted}
                />
            </AuthenticatedLayout>
        </div>
    );
}