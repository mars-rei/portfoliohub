import { useState } from "react";
import { Link } from "@inertiajs/react";

import Page from '../Components/Builder/Page';
import ColourPicker from '../Components/Builder/ColourPicker';

function Builder({ portfolio, projects }) {

    // to set the colour of the whole canvas (where the page canvases sit)
    const [canvasColor, setCanvasColor] = useState('#1d2025');

    // for adding items to canvas
    const [canvasItems, setCanvasItems] = useState([]);

    const addToCanvas = (type, src = null) => {
        setCanvasItems(prev => [...prev, { id: Date.now(), type, src }]);
    };

    // for removing items from canvas
    const [selectedId, setSelectedId] = useState(null);

    const removeFromCanvas = (id) => {
        setCanvasItems(prev => prev.filter(item => item.id !== id));
        setSelectedId(null);
    };


    // for opening component panels (on the left)
    const [openPanel, setOpenPanel] = useState(null);

    const togglePanel = (panel) => {
        setOpenPanel(prev => prev === panel ? null : panel);
    };

    // for opening folders in media and component panels
    const [openFolder, setOpenFolder] = useState({ panel: null, name: null });

    const toggleFolder = (panel, name) => {
        setOpenFolder(prev => prev.name === name ? { panel: null, name: null } : { panel, name });
    };


    // panel for editing (adding a shape or page)
    const [openEditPanel, setOpenEditPanel] = useState(null);

    const toggleEditPanel = (panel) => {
        setOpenEditPanel(prev => prev === panel ? null : panel);
    };


    // for toggling cursor to edit or move around canvas
    const [activeCursor, setActiveCursor] = useState('pointer');


    // project directory
    const projectMedia = Object.fromEntries(
        projects.map(project => [
            project.title,
            project.media.map(m => m.cloud_url)
        ])
    );

    // general components - need to get from database ('General' industry?)
    const general = ['slides', 'carousel', 'text'];

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

    // shapes library
    const shapes = ['square', 'triangle', 'circle', 'star'];


    // for toggling dark and light mode
    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
            <div>
                <div className="h-screen w-screen flex flex-row">
                    <div className={`w-1/6 flex flex-col
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
                            <div className={`text-lg font-fustat-semibold
                                ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
                            >
                                <p>Pages</p>
                                <div className="text-base font-fustat-medium hover:bg-[#B5446E]/8 pl-3 py-1 rounded-md">
                                    <p>Home</p>
                                </div>
                            </div>
                            <div className={`text-lg font-fustat-semibold
                                ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
                            >
                                <p>Layers</p>
                                <div className="text-base font-fustat-medium hover:bg-[#B5446E]/8 pl-3 py-1 rounded-md">
                                    {/*add components as added to canvas*/}
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
                                <div className={`scrollbar-hide overflow-y-auto max-h-full space-y-2 p-4 text-sm font-fustat-medium border-t ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
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
                                className={`flex flex-row items-center justify-between w-full px-4 py-2 text-lg font-fustat-medium cursor-pointer select-none hover:bg-[#B5446E]/2 border-t-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}
                                onClick={() => togglePanel('general')}
                            >
                                <div className="flex flex-row items-center space-x-2">
                                    <i className="fa fa-shapes fa-sm"></i>
                                    <p>General Components</p>
                                </div>
                                <i className={`fa fa-chevron-down fa-xs ${openPanel === 'general' ? 'rotate-180' : ''}`}></i>
                            </div>
                            
                            {openPanel === 'general' && (
                                <div className={`scrollbar-hide overflow-y-auto max-h-96 border-t ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
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
                                className={`flex flex-row items-center justify-between w-full px-4 py-2 text-lg font-fustat-medium cursor-pointer select-none hover:bg-[#B5446E]/2 border-t-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}
                                onClick={() => togglePanel('components')}
                            >
                                <div className="flex flex-row items-center space-x-2">
                                    <i className="fa fa-briefcase fa-sm"></i>
                                    <p>Industry Libraries</p>
                                </div>
                                <i className={`fa fa-chevron-down fa-xs ${openPanel === 'components' ? 'rotate-180' : ''}`}></i>
                            </div>
                            {openPanel === 'components' && (
                                <div className={`scrollbar-hide overflow-y-auto max-h-96 border-t ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
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

                    {/* canvas */}
                    <div 
                        className="w-2/3 h-full flex items-center justify-center" 
                        style={{ backgroundColor: canvasColor, cursor: activeCursor === 'hand' ? 'grab' : 'default' }}
                    >
                        <div className="w-216 flex flex-col text-[#EBFFF2] font-fustat-medium text-md">
                            <Page
                                items={canvasItems}
                                selectedId={selectedId}
                                onSelect={setSelectedId}
                                onRemove={removeFromCanvas}
                                activeCursor={activeCursor}
                            />
                        </div>
                    </div>

                    <div className={`w-1/6 flex flex-col ${darkMode ? "bg-[#111317]" : "bg-[#EBFFF2]"}`}>
                        <div className="flex flex-row items-center w-full px-4 h-20 justify-between shrink-0">
                            <div className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex">
                                Publish Portfolio
                            </div>
                            <div className="rounded-full px-4 h-8 border-[#B5446E] border-2 text-[#B5446E] font-fustat-medium items-center justify-center flex">
                                <i className="fa fa-download fa-md"></i>
                            </div>
                        </div>

                        {openEditPanel === 'shapes' ? (
                            /* shapes creation menu */
                            <div>
                                <div className={`space-y-4 p-4 border-t-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
                                    <div className={`space-y-2 text-lg font-fustat-semibold ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                                        <p>Shapes</p>
                                    </div>
                                </div>
                                <div className={`scrollbar-hide border-[#111317] ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                                    <div className="grid grid-cols-2 gap-2 px-4">
                                        <div className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-square fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Square</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-play fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Triangle</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-circle fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Circle</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-star fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Star</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : openEditPanel === 'pages' ? (
                            /* pages creation menu */
                            <div>
                                <div className={`space-y-4 p-4 border-t-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
                                    <div className={`space-y-2 text-lg font-fustat-semibold ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                                        <p>Pages</p>
                                    </div>
                                </div>
                                <div className={`scrollbar-hide border-[#111317] px-4 space-y-2 ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                                    <div className="flex flex-row items-center space-x-2 px-2 py-1 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                        <i className="fa fa-mobile-screen-button fa-lg text-[#B5446E] w-6 text-center"></i>
                                        <span className="font-fustat-medium">Mobile</span>
                                    </div>

                                    <div className="flex flex-row items-center space-x-2 px-2 py-1 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                        <i className="fa fa-tablet-screen-button fa-lg text-[#B5446E] w-6 text-center"></i>
                                        <span className="font-fustat-medium">Tablet</span>
                                    </div>

                                    <div className="flex flex-row items-center space-x-2 px-2 py-1 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                        <i className="fa fa-laptop fa-lg text-[#B5446E] w-6 text-center"></i>
                                        <span className="font-fustat-medium">Laptop</span>
                                    </div>

                                    <div className="flex flex-row items-center space-x-2 px-2 py-1 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                        <i className="fa fa-display fa-lg text-[#B5446E] w-6 text-center"></i>
                                        <span className="font-fustat-medium">Desktop</span>
                                    </div>

                                    <div className="flex flex-row items-center space-x-2 px-2 py-1 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                        <i className="fa fa-note-sticky fa-lg text-[#B5446E] w-6 text-center"></i>
                                        <span className="font-fustat-medium">Paper</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* default right side menu bar */
                            <div className={`flex-1 p-4 border-t-2 ${darkMode ? "border-[#EBFFF2] text-[#EBFFF2]" : "border-[#111317] text-[#111317]"}`}>
                                <p className="text-lg font-fustat-semibold mb-4">Canvas</p>
                                <ColourPicker color={canvasColor} onChange={setCanvasColor} darkMode={darkMode} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative">
                    <div className="w-1/3 absolute left-1/2 -translate-x-1/2 bottom-8">
                        <div className={`py-2 px-8 flex items-center justify-between rounded-2xl fa-xl
                            ${darkMode ? "text-[#EBFFF2] bg-[#1F1F1F]" : "text-[#1F1F1F] bg-[#EBFFF2]"}`}
                        >
                            {/* for editing on canvas */}
                            <button
                                className={`fa fa-arrow-pointer cursor-pointer hover:text-[#B5446E] ${activeCursor=== 'pointer' ? 'text-[#B5446E]' : ''}`}
                                onClick={() => setActiveCursor('pointer')}
                            />

                            {/* for grabbing and moving around canvas */}
                            <button
                                className={`fa fa-hand cursor-pointer hover:text-[#B5446E] ${activeCursor=== 'pointer' ? '' : 'text-[#B5446E]'}`}
                                onClick={() => setActiveCursor('hand')}
                            />

                            {/* for new page */}
                            <i className="fa fa-file-circle-plus cursor-pointer hover:text-[#B5446E]" onClick={() => toggleEditPanel('pages')}></i>

                            {/* for new shape */}
                            <i className="fa fa-draw-polygon cursor-pointer hover:text-[#B5446E]" onClick={() => toggleEditPanel('shapes')}></i>

                            {/* for adding text */}
                            <button className="fa fa-font cursor-pointer hover:text-[#B5446E]" onClick={() => addToCanvas('text')} />

                            <div className={`inline-block h-full min-h-[2em] w-1 self-stretch rounded-full ${darkMode ? "bg-[#EBFFF2]" : "bg-[#1F1F1F]"}`}></div>


                            <div className={`flex flex-row items-center px-2 py-1 border-2 rounded-md text-lg font-fustat-semibold space-x-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#1F1F1F]"}`}>
                                <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                                <p>60%</p>
                            </div>

                            {/* toggling dark and light mode */}
                            <button onClick={() => setDarkMode(!darkMode)} className={`hover:text-[#B5446E] cursor-pointer fa ${darkMode ? "fa-sun" : "fa-moon"}`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Builder;