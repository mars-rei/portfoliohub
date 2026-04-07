import { Link } from "@inertiajs/react";

function LeftBar({ 
    darkMode,
    toggleEditPanel,
    pages,
    currentPageId,
    setCurrentPageId,
    removePage,
    currentPageItems,
    selectedId,
    setSelectedId,
    openPanel,
    openFolder,
    portfolio,
    projects,
    setOpenFolder,
    addToCanvas,
    removeFromCanvas,  
    togglePanel,      
    toggleFolder    
    
}) {

    // project directory
    const projectMedia = Object.fromEntries(
        projects.map(project => [
            project.title,
            project.media.map(m => m.cloud_url)
        ])
    );

    // industry library components directory - need to get from database
        const components = {
            'Graphic Design': ['fa-bezier-curve', { 'h': 'h' }],
            'Illustration': ['fa-paint-brush', { 'h': 'h' }],
            'Animation': ['fa-person-walking', { 'h': 'h' }],
            'UI/UX Design': ['fa-user-check', { 'h': 'h' }],
            'Software Design': ['fa-laptop-code', { 'h': 'h' }],
            'Game Design': ['fa-gamepad', { 'h': 'h' }],
            '3d Art / Animation': ['fa-cube', { 'h': 'h' }],
            'Photography': ['fa-camera', { 'h': 'h' }],
            'Film Production': ['fa-film', { 'h': 'h' }],
            'Fashion Design': ['fa-shirt', { 'h': 'h' }],
            'Architecture': ['fa-archway', { 'h': 'h' }],
            'Product Design': ['fa-box-open', { 'h': 'h' }],
            'Content Creation': ['fa-lightbulb', { 'Social media embed': 'h' }],
            'Marketing': ['fa-magnifying-glass-chart', { 'h': 'h' }],
            'Social Media Management': ['fa-hashtag', { 'h': 'h' }],
            'Journalism': ['fa-book-open', { 'h': 'h' }],
            'Screen Writing': ['fa-pen-clip', { 'h': 'h' }],
            'Creative Writing': ['fa-bookmark', { 'h': 'h' }],
            'Music': ['fa-music', { 'h': 'h' }],
        };
    
    return (
        <div className={`w-1/6 flex flex-col relative z-10
            ${darkMode ? "bg-[#111317]" : "bg-[#EBFFF2]"}`}
        >
            <div className={`flex flex-row items-center w-full px-4 h-20 text-lg font-fustat-bold space-x-2 justify-between shrink-0
                ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
            >
                <Link href="/dashboard">
                    <i className="fa fa-xl fa-briefcase text-[#003c66]"></i>
                </Link>
                <div className="flex flex-row items-center space-x-2">
                    <p>{portfolio.title}</p>
                    <i className="fa fa-circle-user text-[#B5446E] fa-xl"></i>
                </div>
            </div>

            <div className={`flex-1 space-y-4 p-4 border-y-2 overflow-hidden
                ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}
            >
                <div className={`flex flex-row items-center w-full px-4 py-1 border-2 rounded-md text-lg font-fustat-medium space-x-2
                    ${darkMode ? "border-[#EBFFF2] text-[#EBFFF2]" : "border-[#111317] text-[#111317]"}`}
                >
                    <i className="fa fa-search fa-sm"></i>
                    <p>Search</p>
                </div>

                {/* pages */}
                <div className={`text-lg font-fustat-semibold ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                    <div className="flex flex-row items-center justify-between">
                        <p className="pb-2">Pages</p>
                        <button 
                            onClick={() => toggleEditPanel('pages')}
                            className="hover:text-[#B5446E] text-sm"
                        >
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                    <div className="text-base font-fustat-medium space-y-2">
                        {pages.map(page => (
                            <div 
                                key={page.id}
                                className={`flex flex-row items-center justify-between pl-3 py-1 rounded-md cursor-pointer
                                    ${currentPageId === page.id ? 'bg-[#B5446E]/20' : 'hover:bg-[#B5446E]/8'}`}
                                onClick={() => setCurrentPageId(page.id)}
                            >
                                <div className="flex flex-row items-center space-x-2">
                                    <i className="fa fa-file fa-xs text-[#B5446E]"></i>
                                    <span>{page.name}</span>
                                </div>
                                {pages.length > 1 && (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removePage(page.id);
                                        }}
                                        className="text-[#872328] text-xs mr-2 cursor-pointer"
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* layers */}
                <div className={`text-lg font-fustat-semibold ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                    <p className="pb-2">Layers</p>
                    <div className="text-base font-fustat-medium space-y-2">
                        {currentPageItems.map((item) => (
                            <div 
                                key={item.id}
                                className={`flex flex-row items-center justify-between pl-3 py-1 rounded-md cursor-pointer
                                    ${selectedId === item.id ? 'bg-[#B5446E]/20' : 'hover:bg-[#B5446E]/8'}`}
                                onClick={() => setSelectedId(item.id)}
                            >
                                <div className="flex flex-row items-center space-x-2">
                                    <i className="fa fa-shapes fa-xs text-[#B5446E]"></i>
                                    <span className="capitalize">{item.type}</span>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCanvas(item.id);
                                    }}
                                    className="text-[#872328] text-xs mr-2 cursor-pointer"
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* project media */}
            <div className={`shrink-0 ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                <div
                    className="flex flex-row items-center justify-between w-full px-4 py-2 text-lg font-fustat-medium cursor-pointer select-none hover:bg-[#B5446E]/2"
                    onClick={() => togglePanel('media')}
                >
                    <div className="flex flex-row items-center space-x-2">
                        <i className="fa fa-folder fa-sm"></i>
                        <p>Project Media</p>
                    </div>
                    <i className={`fa fa-chevron-down fa-xs ${openPanel === 'media' ? 'rotate-180' : ''}`}></i>
                </div>
                {openPanel === 'media' && (
                    <div className="scrollbar-hide overflow-y-auto max-h-full space-y-2 p-4 text-sm font-fustat-medium border-t border-[#111317]">
                        {openFolder.panel === 'media' && projectMedia[openFolder.name] ? (
                            // inner level - project media
                            <div className="space-y-2">
                                <div
                                    className="flex flex-row items-center space-x-2 text-base hover:text-[#B5446E] cursor-pointer mb-3"
                                    onClick={() => setOpenFolder({ panel: null, name: null })}
                                >
                                    <i className="fa fa-chevron-left fa-xs"></i>
                                    <span>{openFolder.name}</span>
                                </div>
                                {projectMedia[openFolder.name].length === 0 ? (
                                    <p className="text-xs text-gray-500 text-center">No media yet</p>
                                ) : (
                                    projectMedia[openFolder.name].map((url) => (
                                        <div key={url} onClick={() => addToCanvas('image', url)} className="flex flex-row items-center space-x-2 px-2 py-1 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <img src={url} className="w-full h-full object-cover" />
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            // outer level - project folders
                            <div className="grid grid-cols-2">
                                {Object.entries(projectMedia).map(([project, media]) => (
                                    <div key={project} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer" onClick={() => toggleFolder('media', project)}>
                                        <i className="fa fa-folder fa-3x text-[#B5446E]"></i>
                                        <span className="truncate">{project}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* general components */}
            <div className={`shrink-0 ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                <div
                    className="flex flex-row items-center justify-between w-full px-4 py-2 text-lg font-fustat-medium cursor-pointer select-none hover:bg-[#B5446E]/2 border-t-2 border-[#111317]"
                    onClick={() => togglePanel('general')}
                >
                    <div className="flex flex-row items-center space-x-2">
                        <i className="fa fa-shapes fa-sm"></i>
                        <p>General Components</p>
                    </div>
                    <i className={`fa fa-chevron-down fa-xs ${openPanel === 'general' ? 'rotate-180' : ''}`}></i>
                </div>
                
                {openPanel === 'general' && (
                    <div className="scrollbar-hide overflow-y-auto max-h-96 border-t border-[#111317]">
                        <div className="grid grid-cols-2 gap-2 p-4">
                            <div onClick={() => addToCanvas('slides')} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-images fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Slides</span>
                            </div>
                            <div onClick={() => addToCanvas('carousel')} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-film fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Carousel</span>
                            </div>
                            <div onClick={() => addToCanvas('text')} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-font fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Text</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* component libraries */}
            <div className={`shrink-0 ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                <div
                    className="flex flex-row items-center justify-between w-full px-4 py-2 text-lg font-fustat-medium cursor-pointer select-none hover:bg-[#B5446E]/2 border-t-2 border-[#111317]"
                    onClick={() => togglePanel('components')}
                >
                    <div className="flex flex-row items-center space-x-2">
                        <i className="fa fa-briefcase fa-sm"></i>
                        <p>Industry Libraries</p>
                    </div>
                    <i className={`fa fa-chevron-down fa-xs ${openPanel === 'components' ? 'rotate-180' : ''}`}></i>
                </div>
                {openPanel === 'components' && (
                    <div className="scrollbar-hide overflow-y-auto max-h-96 border-t border-[#111317]">
                        {openFolder.panel === 'components' && components[openFolder.name] ? (
                            // inner level - library components
                            <div className="p-4 space-y-2">
                                <div
                                    className="flex flex-row items-center space-x-2 text-base hover:text-[#B5446E] cursor-pointer mb-3"
                                    onClick={() => setOpenFolder({ panel: null, name: null })}
                                >
                                    <i className="fa fa-chevron-left fa-xs"></i>
                                    <span>{openFolder.name}</span>
                                </div>
                                {Object.entries(components[openFolder.name][1]).map(([componentName, component]) => (
                                    <div key={componentName} className="flex flex-row items-center space-x-2 px-2 py-1 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                        <i className="fa fa-shapes fa-xs text-[#B5446E]"></i>
                                        <span className="font-fustat-medium">{componentName}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // outer level - industry libraries
                            <div className="grid grid-cols-2 gap-2 p-4">
                                {Object.entries(components).map(([industry, [icon, subComponents]]) => (
                                    <div key={industry} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer" onClick={() => toggleFolder('components', industry)}>
                                        <i className={`fa ${icon} fa-2x text-[#B5446E]`}></i>
                                        <span className="text-sm line-clamp-2 leading-tight">{industry}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
}

export default LeftBar;