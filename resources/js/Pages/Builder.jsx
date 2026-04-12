import { useState } from "react";
import axios from "axios"; // using instead of inertia to fetch data

import Toolbar from "@/Layouts/Builder/ToolBar";
import RightBar from "@/Layouts/Builder/RightBar";
import LeftBar from "@/Layouts/Builder/LeftBar";
import Canvas from "@/Layouts/Builder/Canvas";
import Page from "@/Layouts/Builder/Page";

function Builder({ portfolio, projects }) {

    // to set the colour of the whole canvas (where the page canvases sit)
    const [canvasColour, setCanvasColour] = useState('#1d2025'); 


    /* ---------- pages ---------- */
    const [pages, setPages] = useState(() => {
        // on load
        if (portfolio.pages && portfolio.pages.length > 0) {
            return portfolio.pages.map(page => ({
                id: page.id, 
                name: page.page_name,
                colour: page.code?.colour || '#B5446E',
                items: page.code?.items || [],
                itemStyles: page.code?.itemStyles || {},
                dimensions: page.code?.dimensions || { width: 1920, height: 1080 }
            }));
        }
    });
    
    const [currentPageId, setCurrentPageId] = useState(() => {
        return pages.length > 0 ? pages[0].id : null;
    });

    // to get current page data
    const currentPage = pages.find(p => p.id === currentPageId) || pages[0];
    const currentPageName = currentPage.name || 'Untitled';
    const currentPageColour = currentPage?.colour || '#B5446E';
    const currentPageItems = currentPage?.items || [];
    const currentItemStyles = currentPage?.itemStyles || {};
    const { width: currentPageWidth, height: currentPageHeight } = currentPage?.dimensions || { width: 1920, height: 1080 };

    // new page
    const addPage = async (pageConfig) => {
        // temporary id before getting the id of the page to add
        const temporaryId = `temporary-${Date.now()}`;

        const newPage = {
            id: temporaryId,
            name: pageConfig.name || 'Untitled',
            colour: pageConfig.colour || '#B5446E',
            items: [],
            itemStyles: {},
            dimensions: pageConfig.dimensions || { width: 1920, height: 1080 }
        };
        
        setPages(prev => [...prev, newPage]);
        setCurrentPageId(temporaryId);
        
        const response = await axios.post('/pages', {
            portfolio_id: portfolio.id,
            page_name: newPage.name,
            code: {
                name: newPage.name,
                colour: newPage.colour,
                items: newPage.items,
                itemStyles: newPage.itemStyles,
                dimensions: newPage.dimensions
            }
        });
        
        // replace temporary id with id from database
        setPages(prev => prev.map(p => 
            p.id === temporaryId 
                ? { ...p, id: response.data.page.id }
                : p
        ));
        setCurrentPageId(response.data.page.id);
    };

    // defaults for a new page
    const [newPageName, setNewPageName] = useState('Untitled Page');
    const [newPageColour, setNewPageColour] = useState('#B5446E');
    const [selectedDimensions, setSelectedDimensions] = useState('1920x1080');

    // delete page
    const removePage = async (pageId) => {
        if (pages.length === 1) {
            alert("Cannot remove the last page");
            return;
        }
                
        setPages(prev => prev.filter(p => p.id !== pageId));
        
        if (currentPageId === pageId) {
            const remainingPages = pages.filter(p => p.id !== pageId);
            if (remainingPages.length > 0) {
                setCurrentPageId(remainingPages[0].id);
            }
        }

        if (!String(pageId).startsWith('temporary-')) {
            await axios.delete(`/pages/${pageId}`);
        }
    };

    // update page name
    const updatePageName = async (pageId, newName) => {
        setPages(prev => prev.map(page => 
            page.id === pageId ? { ...page, name: newName } : page
        ));
        
        await axios.put(`/pages/${pageId}`, {
            page_name: newName,
            code: {
                name: newName  
            }
        });
    };

    // update page colour
    const updatePageColour = async (pageId, newColour) => {
        setPages(prev => prev.map(page => 
            page.id === pageId ? { ...page, colour: newColour } : page
        )); 

        await axios.put(`/pages/${pageId}`, {
            code: {
                colour: newColour
            }
        });
    };


    /* ---------- canvas ---------- */
    // add elements to current page on canvas
    const addToCanvas = (type, src = null) => {
        // id for new components
        const newId = Date.now(); 

        // default dimensions for all components
        const defaultDimensions = 
        (type === 'image' || type === 'text')
            ? { width: 'auto', height: 'auto' }
            : type === 'rectangle'
                ? { width: 200, height: 100 }
                : type === 'carousel' || type == 'slides'
                    ? { width: 400, height: 150 }
                    : { width: 100, height: 100 }

        setPages(prev => prev.map(page => {
            if (page.id === currentPageId) {
                return {
                    ...page,
                    items: [...page.items, { id: newId, type, src }],
                    itemStyles: {
                        ...page.itemStyles,
                        [newId]: {
                            ...page.itemStyles[newId],
                            width: defaultDimensions.width,
                            height: defaultDimensions.height,
                            fill: defaultColour[type],
                            x: 0,  // x position on page
                            y: 0 // y position on page
                        }
                    }
                };
            }
            return page;
        }));
    };

    // remove elements from current page on canvas
    const removeFromCanvas = (id) => {
        setPages(prev => prev.map(page => {
            if (page.id === currentPageId) {
                return {
                    ...page,
                    items: page.items.filter(item => item.id !== id)
                };
            }
            return page;
        }));
        setSelectedId(null);
    };

    // update styles of elements of current page on canvas
    const onStyleChange = (id, key, value) => {
        setPages(prev => prev.map(page => {
            if (page.id === currentPageId) {
                const currentStyles = page.itemStyles || {};
                return {
                    ...page,
                    itemStyles: {
                        ...currentStyles,
                        [id]: { ...currentStyles[id], [key]: value }
                    }
                };
            }
            return page;
        }));
    };

    // for removing items from canvas
    const [selectedId, setSelectedId] = useState(null);


    /* ---------- panels ---------- */
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

    // find element for menu to show
    const selectedItem = currentPageItems.find(i => i.id === selectedId) ?? null;

    // panel for editing (adding a shape or page)
    const [openEditPanel, setOpenEditPanel] = useState(null);

    const toggleEditPanel = (panel) => {
        setOpenEditPanel(prev => prev === panel ? null : panel);
    };


    // default colour for components
    const defaultColour = { 
        circle: '#545454',
        square: '#545454',
        rectangle: '#545454',
        triangle: '#545454',
        star: '#545454',
        shape1: '#545454',
        shape2: '#545454',
        text: '#ffffff',
    };


    // for toggling cursor to edit or move around canvas
    const [activeCursor, setActiveCursor] = useState('pointer');

    // for toggling dark and light mode
    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
            <div style={{ backgroundColor: canvasColour }}>
                <div className="h-screen w-screen flex flex-row">
                    <LeftBar
                        darkMode={darkMode}
                        toggleEditPanel={toggleEditPanel}
                        pages={pages}
                        currentPageId={currentPageId}
                        setCurrentPageId={setCurrentPageId}
                        removePage={removePage}
                        currentPageItems={currentPageItems}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        removeFromCanvas={removeFromCanvas}
                        openPanel={openPanel}
                        openFolder={openFolder}
                        togglePanel={togglePanel}
                        toggleFolder={toggleFolder}
                        portfolio={portfolio}
                        projects={projects}
                        setOpenFolder={setOpenFolder}
                        addToCanvas={addToCanvas}
                    />

                    {/* canvas */}
                    <div className="flex-1 h-full" />

                    <Canvas canvasColour={canvasColour} activeCursor={activeCursor} onSelect={setSelectedId}>
                        <Page
                            pageId={currentPageId}
                            pageName={currentPage.name}
                            onPageNameChange={updatePageName}
                            items={currentPageItems}
                            itemStyles={currentItemStyles}          
                            selectedId={selectedId}
                            onSelect={setSelectedId}
                            onRemove={removeFromCanvas}
                            activeCursor={activeCursor}
                            pageColour={currentPageColour}
                            dimensions={currentPage.dimensions}
                            onStyleChange={onStyleChange}
                        />
                    </Canvas>

                    <RightBar
                        portfolioId={portfolio.id}
                        darkMode={darkMode}
                        openEditPanel={openEditPanel}
                        addToCanvas={addToCanvas}
                        toggleEditPanel={toggleEditPanel}
                        newPageName={newPageName}
                        setNewPageName={setNewPageName}
                        newPageColour={newPageColour}
                        setNewPageColour={setNewPageColour}
                        selectedDimensions={selectedDimensions}
                        setSelectedDimensions={setSelectedDimensions}
                        addPage={addPage}
                        selectedId={selectedId}
                        canvasColour={canvasColour}
                        setCanvasColour={setCanvasColour}
                        currentPageColour={currentPageColour}
                        currentPageId={currentPageId}
                        currentPageName={currentPageName}
                        currentPageItems={currentPageItems}
                        updatePageColour={updatePageColour}
                        selectedItem={selectedItem}
                        currentItemStyles={currentItemStyles}
                        defaultColour={defaultColour}
                        onStyleChange={onStyleChange}
                        currentPageWidth={currentPageWidth}
                        currentPageHeight={currentPageHeight}
                        pages={pages} // to output data
                    />
                </div>

                <Toolbar
                    activeCursor={activeCursor}
                    setActiveCursor={setActiveCursor}
                    toggleEditPanel={toggleEditPanel}
                    addToCanvas={addToCanvas}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
            </div>
        </>
    );
}

export default Builder;