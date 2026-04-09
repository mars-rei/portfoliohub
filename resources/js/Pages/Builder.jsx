import { useState } from "react";

import Toolbar from "@/Layouts/Builder/ToolBar";
import RightBar from "@/Layouts/Builder/RightBar";
import LeftBar from "@/Layouts/Builder/LeftBar";
import Canvas from "@/Layouts/Builder/Canvas";
import Page from "@/Layouts/Builder/Page";



function Builder({ portfolio, projects }) {

    // to set the colour of the whole canvas (where the page canvases sit)
    const [canvasColour, setCanvasColour] = useState('#1d2025'); 


    /* ---------- pages ---------- */
    const firstPageId = `page-${Date.now()}`
    const [pages, setPages] = useState([
        { 
            id: firstPageId, 
            name: 'Home', 
            colour: '#B5446E', 
            items: [], 
            itemStyles: {},
            dimensions: { width: 720, height: 480 } 
        }
    ]);
    const [currentPageId, setCurrentPageId] = useState(firstPageId);

    // to get current page data
    const currentPage = pages.find(p => p.id === currentPageId);
    const currentPageName = currentPage.name || 'Untitled';
    const currentPageColour = currentPage?.colour || '#B5446E';
    const currentPageItems = currentPage?.items || [];
    const currentItemStyles = currentPage?.itemStyles || {};
    const { width: currentPageWidth, height: currentPageHeight } = currentPage?.dimensions || { width: 720, height: 480 };

    // new page
    const addPage = (pageConfig) => {
        const newPageId = `page-${Date.now()}`;
        setPages(prev => [...prev, {
            id: newPageId,
            name: pageConfig.name || 'Untitled',
            colour: pageConfig.colour || '#B5446E',
            items: [],
            itemStyles: {},
            dimensions: pageConfig.dimensions || { width: 720, height: 480 }
        }]);
        setCurrentPageId(newPageId);
    };

    // defaults for a new page
    const [newPageName, setNewPageName] = useState('Untitled Page');
    const [newPageColour, setNewPageColour] = useState('#B5446E');
    const [selectedDimensions, setSelectedDimensions] = useState('720x480');

    // delete page
    const removePage = (pageId) => {
        if (pages.length === 1) {
            alert("Cannot remove the last page");
            return;
        }
        
        setPages(prev => prev.filter(p => p.id !== pageId));
        
        // If removing current page, switch to another page
        if (currentPageId === pageId) {
            const remainingPages = pages.filter(p => p.id !== pageId);
            if (remainingPages.length > 0) {
                setCurrentPageId(remainingPages[0].id);
            }
        }
    };

    // update page name
    const updatePageName = (pageId, newName) => {
        setPages(prev => prev.map(page => 
            page.id === pageId ? { ...page, name: newName } : page
        ));
    };

    // update page colour
    const updatePageColour = (pageId, newColour) => {
        setPages(prev => prev.map(page => 
            page.id === pageId ? { ...page, colour: newColour } : page
        ));
    };


    /* ---------- canvas ---------- */
    // add elements to current page on canvas
    const addToCanvas = (type, src = null) => {
        setPages(prev => prev.map(page => {
            if (page.id === currentPageId) {
                return {
                    ...page,
                    items: [...page.items, { id: Date.now(), type, src }]
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
        console.log('onStyleChange called with:', { id, key, value });
        console.log('Current pages before update:', pages);
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
            console.log('New styles for page:', newStyles);
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
                        />
                    </Canvas>

                    <RightBar
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