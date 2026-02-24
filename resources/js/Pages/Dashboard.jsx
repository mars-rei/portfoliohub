import { useState } from "react";
import { router, usePage } from '@inertiajs/react';

import Layout from '@/Layouts/Layout';

import Portfolios from '@/Pages/Portfolios/Index';
import CreatePortfolioModal from '@/Components/CreatePortfolioModal';
import EditPortfolioModal from '@/Components/EditPortfolioModal';
import ShowPortfolioModal from '@/Components/ShowPortfolioModal';
import DeletePortfolioModal from '@/Components/DeletePortfolioModal';

import Projects from '@/Pages/Projects/Index';
import CreateProjectModal from '@/Components/CreateProjectModal';
import EditProjectModal from '@/Components/EditProjectModal';
import ShowProjectModal from '@/Components/ShowProjectModal';
import DeleteProjectModal from '@/Components/DeleteProjectModal';

import Media from '@/Pages/Media/Index';
import CreateMediaModal from '@/Components/CreateMediaModal';
import ShowMediaModal from '@/Components/ShowMediaModal'; 
import EditMediaModal from '@/Components/EditMediaModal';
import DeleteMediaModal from '@/Components/DeleteMediaModal'; 

export default function Dashboard() {
    const { portfolios: initialPortfolios, projects: initialProjects, media: initialMedia, industries } = usePage().props;
    
    // default state is portfolios
    const [activeView, setActiveView] = useState('portfolios');
    
    
    // portfolio modal states
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showShowModal, setShowShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    

    // project modal states
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    const [showEditProjectModal, setShowEditProjectModal] = useState(false);
    const [showShowProjectModal, setShowShowProjectModal] = useState(false);
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);


    // media modal states
    const [showCreateMediaModal, setShowCreateMediaModal] = useState(false);
    const [showEditMediaModal, setShowEditMediaModal] = useState(false);
    const [showShowMediaModal, setShowShowMediaModal] = useState(false);
    const [showDeleteMediaModal, setShowDeleteMediaModal] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    

    const handleViewChange = (view) => {
        setActiveView(view);
    };


    // portfolio handlers
    const handlePortfolioClick = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setShowShowModal(true);
    };

    const handleEditClick = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setShowEditModal(true);
        setShowShowModal(false);
    };

    const handleDeleteClick = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setShowDeleteModal(true);
        setShowShowModal(false);
    };


    // project handlers
    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setShowShowProjectModal(true);
    };

    const handleEditProjectClick = (project) => {
        setSelectedProject(project);
        setShowEditProjectModal(true);
        setShowShowProjectModal(false);
    };

    const handleDeleteProjectClick = (project) => {
        setSelectedProject(project);
        setShowDeleteProjectModal(true);
        setShowShowProjectModal(false);
    };


    // media handlers
    const handleMediaClick = (media) => {
        setSelectedMedia(media);
        setShowShowMediaModal(true);
    };

    const handleEditMediaClick = (media) => {
        setSelectedMedia(media);
        setShowEditMediaModal(true);
        setShowShowMediaModal(false);
    };

    const handleDeleteMediaClick = (media) => {
        setSelectedMedia(media);
        setShowDeleteMediaModal(true);
        setShowShowMediaModal(false);
    };


    const handleCloseModals = () => {
        // portfolio modals
        setShowCreateModal(false);
        setShowEditModal(false);
        setShowShowModal(false);
        setShowDeleteModal(false);
        setSelectedPortfolio(null);
        
        // project modals
        setShowCreateProjectModal(false);
        setShowEditProjectModal(false);
        setShowShowProjectModal(false);
        setShowDeleteProjectModal(false);
        setSelectedProject(null);

        // media modals
        setShowCreateMediaModal(false);
        setShowEditMediaModal(false);
        setShowShowMediaModal(false);
        setShowDeleteMediaModal(false);
        setSelectedMedia(null);
    };


    // portfolio handlers for modals
    const handlePortfolioCreated = () => {
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


    // project handlers for modals
    const handleProjectCreated = () => {
        router.reload();
    };

    const handleProjectUpdated = () => {
        router.reload();
        handleCloseModals();
    };

    const handleProjectDeleted = () => {
        router.reload();
        handleCloseModals();
    };


    // media handlers for modals
    const handleMediaCreated = () => {
        router.reload();
        handleCloseModals();
    };

    const handleMediaUpdated = () => {
        router.reload();
        handleCloseModals();
    };

    const handleMediaDeleted = () => {
        router.reload();
        handleCloseModals();
    };


    // media upload handler
    const handleMediaUpload = async (formData) => {
        try {
            await router.post('/media', formData, {
                onSuccess: () => {
                    handleMediaCreated();
                },
            });
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div>
            <Layout>
                <div className="flex h-[calc(100vh-4rem)]">
                    <div className="w-1/6 flex flex-col justify-between">
                        <div className="space-y-4 p-4">
                            {/* to add in functionality later
                            <div className="flex flex-row items-center w-full px-4 py-1 border-2 border-[#111317] rounded-md text-lg font-fustat-medium space-x-2">
                                <i className="fa fa-search fa-sm"></i>
                                <p>Search</p>
                            </div>
                            */}

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
                                <p 
                                    onClick={() => handleViewChange('media')}
                                    className={`cursor-pointer hover:text-[#B5446E] ${activeView === 'media' ? 'text-[#003c66]' : ''}`}
                                >
                                    Media
                                </p>
                            </div>
                        </div>

                        {/* to add in functionality later
                        <div 
                            onClick={() => handleViewChange('deleted')}
                            className={`flex flex-row items-center w-full px-4 py-2 border-t border-[#111317] text-lg font-fustat-medium space-x-2 cursor-pointer hover:text-[#B5446E] ${activeView === 'deleted' ? 'text-[#003c66]' : ''}`}
                        >
                            <i className="fa fa-trash fa-sm"></i>
                            <p>Recently deleted</p>
                        </div>
                        */}
                    </div>

                    {/* main */}
                    <div className="w-5/6 bg-[#111317] p-12 font-fustat-semibold text-md">
                        {activeView === 'projects' && (
                            <Projects 
                                projects={initialProjects}
                                onProjectClick={handleProjectClick}
                                onCreateClick={() => setShowCreateProjectModal(true)}
                            />
                        )}
                        {activeView === 'portfolios' && (
                            <Portfolios 
                                portfolios={initialPortfolios} 
                                onPortfolioClick={handlePortfolioClick}
                                onCreateClick={() => setShowCreateModal(true)}
                            />
                        )}
                        {activeView === 'media' && (
                            <Media 
                                media={initialMedia}
                                onMediaClick={handleMediaClick}
                                onUploadClick={() => setShowCreateMediaModal(true)}
                            />
                        )}
                        {activeView === 'deleted' && (
                            <div className="text-white">
                                <p>Recently Deleted View</p>
                            </div>
                        )}
                    </div>
                </div>


                {/* portfolio modals */}
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


                {/* project modals */}
                <CreateProjectModal
                    isOpen={showCreateProjectModal}
                    onClose={handleCloseModals}
                    onSuccess={handleProjectCreated}
                />

                <ShowProjectModal
                    isOpen={showShowProjectModal}
                    onClose={handleCloseModals}
                    project={selectedProject}
                    onEdit={handleEditProjectClick}
                    onDelete={handleDeleteProjectClick}
                />

                <EditProjectModal
                    isOpen={showEditProjectModal}
                    onClose={handleCloseModals}
                    project={selectedProject}
                    onSuccess={handleProjectUpdated}
                />

                <DeleteProjectModal
                    isOpen={showDeleteProjectModal}
                    onClose={handleCloseModals}
                    project={selectedProject}
                    onSuccess={handleProjectDeleted}
                />


                {/* media modals */}
                <CreateMediaModal
                    isOpen={showCreateMediaModal}
                    onClose={handleCloseModals}
                    onUpload={handleMediaUpload}
                />

                <ShowMediaModal
                    isOpen={showShowMediaModal}
                    onClose={handleCloseModals}
                    media={selectedMedia}
                    onEdit={handleEditMediaClick}
                    onDelete={handleDeleteMediaClick}
                />

                <EditMediaModal
                    isOpen={showEditMediaModal}
                    onClose={handleCloseModals}
                    media={selectedMedia}
                    onSuccess={handleMediaUpdated}
                />

                <DeleteMediaModal
                    isOpen={showDeleteMediaModal}
                    onClose={handleCloseModals}
                    media={selectedMedia}
                    onSuccess={handleMediaDeleted}
                />
            </Layout>
        </div>
    );
}