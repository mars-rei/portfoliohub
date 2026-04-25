import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios"; // using instead of inertia to fetch data

import Toolbar from "@/Layouts/Builder/ToolBar";
import RightBar from "@/Layouts/Builder/RightBar";
import LeftBar from "@/Layouts/Builder/LeftBar";
import Canvas from "@/Layouts/Builder/Canvas";
import Page from "@/Layouts/Builder/Page";

import CreateCarouselModal from "@/Components/Builder/CreateModals/CreateCarouselModal";
import CreateSlidesModal from "@/Components/Builder/CreateModals/CreateSlidesModal";


function Builder({ portfolio, projects }) {

    // to set the colour of the whole canvas (where the page canvases sit)
    const [canvasColour, setCanvasColour] = useState(() => {
        if (portfolio.canvas_colour) {
            return portfolio.canvas_colour;
        }
        return '#1d2025';
    });

    useEffect(() => {
        const saveCanvasColour = async () => {
            await axios.put(`/portfolios/${portfolio.id}`, {
                canvas_colour: canvasColour
            });
        };

        saveCanvasColour();
    }, [canvasColour, portfolio.id]);


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
        return []; // validation for undefined pages
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
        // save state before making changes
        saveToHistory();

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
        // save state before making changes
        saveToHistory();

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
        // save state before making changes
        saveToHistory();

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
        // save state before making changes
        saveToHistory();

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

    // for adding carousel or slide media components
    const [showCarouselModal, setShowCarouselModal] = useState(false);
    const [showSlidesModal, setShowSlidesModal] = useState(false);


    // add elements to current page on canvas
    const addToCanvas = async (type, src = null, caption = null) => {
        // save state before making changes
        saveToHistory();

        // id for new components
        const newId = Date.now(); 

        // default dimensions for all components
        const defaultDimensions = 
        (type === 'image' || type === 'text' || type === 'link' || type === 'spotifyMusic' || type === 'video')
            ? { width: 500, height: 'auto' }
            : type === 'rectangle'
                ? { width: 200, height: 100 }
                : type === 'carousel' || type === 'slides'
                    ? { width: 400, height: 150 }
                    : { width: 100, height: 100 }

        // default text
        const defaultText = type === 'text' ? 'Enter your text...' : type === 'link' ? 'Click here!' : undefined;

        const currentPageData = pages.find(p => p.id === currentPageId);
    
        const updatedItems = [...currentPageData.items, { id: newId, type, src, caption }];

        const newItemStyles = {
            width: defaultDimensions.width,
            height: defaultDimensions.height,
            fill: defaultColour[type] || '#545454',
            x: 0,
            y: 0,
            text: defaultText 
        };
        

        if (type === 'text') {
            newItemStyles.fontSize = 50;
            newItemStyles.fontFamily = 'Arial, sans-serif'; 
        }

        if (type === 'link' || type == 'spotifyMusic') {
            newItemStyles.url = ''; 
        }

        if (type === 'image' || type === 'video') {
            newItemStyles.showCaption = false;
        }


        const updatedItemStyles = {
            ...currentPageData.itemStyles,
            [newId]: newItemStyles
        };

        setPages(prev => prev.map(page => 
            page.id === currentPageId 
                ? { ...page, items: updatedItems, itemStyles: updatedItemStyles }
                : page
        ));

        await axios.put(`/pages/${currentPageId}`, {
            code: {
                items: updatedItems,
                itemStyles: updatedItemStyles
            }
        });
    };

    // remove elements from current page on canvas
    const removeFromCanvas = async (id) => {
        // save state before making changes
        saveToHistory();

        const currentPageData = pages.find(p => p.id === currentPageId);
        
        const updatedItems = currentPageData.items.filter(item => item.id !== id);
        const updatedItemStyles = { ...currentPageData.itemStyles };
        delete updatedItemStyles[id];
        
        setPages(prev => prev.map(page => 
            page.id === currentPageId 
                ? { ...page, items: updatedItems, itemStyles: updatedItemStyles }
                : page
        ));
        setSelectedId(null);
        
        await axios.put(`/pages/${currentPageId}`, {
            code: {
                items: updatedItems,
                itemStyles: updatedItemStyles
            }
        });
    };

    // update styles of elements of current page on canvas
    const onStyleChange = async (id, key, value) => {
        // save state before making changes
        saveToHistory();

        setPages(prev => {
            const currentPageData = prev.find(p => p.id === currentPageId);
            
            const updatedItemStyles = {
                ...currentPageData.itemStyles,
                [id]: { ...currentPageData.itemStyles[id], [key]: value }
            };
                        
            axios.put(`/pages/${currentPageId}`, {
                code: { itemStyles: updatedItemStyles }
            });
            
            
            // return updated pages to display
            return prev.map(page => 
                page.id === currentPageId 
                    ? { ...page, itemStyles: updatedItemStyles }
                    : page
            );
        });
    };

    // for removing items from canvas
    const [selectedId, setSelectedId] = useState(null);

    // repetitive due to time crunch - should refactor into main addToCanvas method later on
    const handleCreateCarousel = async (selectedMedia) => {
        // save state before making changes
        saveToHistory();

        const newId = Date.now();

        const currentPageData = pages.find(p => p.id === currentPageId);

        const updatedItems = [...currentPageData.items, { 
            id: newId, 
            type: 'carousel',
            media: selectedMedia,
        }];

        const newItemStyles = {
            width: 400,
            height: 150,
            x: 0,
            y: 0
        };

        const updatedItemStyles = {
            ...currentPageData.itemStyles,
            [newId]: newItemStyles
        };

        setPages(prev => prev.map(page => 
            page.id === currentPageId 
                ? { ...page, items: updatedItems, itemStyles: updatedItemStyles }
                : page
        ));

        await axios.put(`/pages/${currentPageId}`, {
            code: {
                items: updatedItems,
                itemStyles: updatedItemStyles
            }
        });

        setShowCarouselModal(false);
    };

    // repetitive due to time crunch - should refactor into main addToCanvas method later on
    const handleCreateSlides = async (selectedMedia) => {
        // save state before making changes
        saveToHistory();

        const newId = Date.now();

        const currentPageData = pages.find(p => p.id === currentPageId);

        const updatedItems = [...currentPageData.items, { 
            id: newId, 
            type: 'slides',
            media: selectedMedia,
        }];

        const newItemStyles = {
            width: 400,
            height: 150,
            x: 0,
            y: 0
        };

        const updatedItemStyles = {
            ...currentPageData.itemStyles,
            [newId]: newItemStyles
        };

        setPages(prev => prev.map(page => 
            page.id === currentPageId 
                ? { ...page, items: updatedItems, itemStyles: updatedItemStyles }
                : page
        ));

        await axios.put(`/pages/${currentPageId}`, {
            code: {
                items: updatedItems,
                itemStyles: updatedItemStyles
            }
        });

        setShowSlidesModal(false);
    };

    
    /* ---------- redo & undo history ---------- */
    const [undoHistory, setUndoHistory] = useState([]);
    const [redoHistory, setRedoHistory] = useState([]);
    const isUndoOrRedo = useRef(false); // have a reference and pointer for checking if the builder is currently undoing or redoing

    const pagesRef = useRef(pages); // reference to portfolio pages

    useEffect(() => {
        pagesRef.current = pages; // change everytime an edit is made
    }, [pages]);

    // for saving to history method using callback
    const saveToHistory = useCallback(() => {
        if (isUndoOrRedo.current) return; 
        
        setRedoHistory([]); 
        
        setUndoHistory(prev => {
            const newHistory = [...prev, pagesRef.current]; 
            while (newHistory.length > 10) newHistory.shift();  // keep last 10 edits only
            return newHistory;
        });
    }, []); 

    // for undoing method using callback
    const undo = useCallback(() => {
        if (undoHistory.length === 0) return;
        
        isUndoOrRedo.current = true; 
        
        const lastState = undoHistory[undoHistory.length - 1];  // get top of stack
        
        setRedoHistory(prev => [...prev, pagesRef.current]);  // move top of stack to redo top of stack
        
        setPages(lastState);  // restore previous state
        
        setUndoHistory(prev => prev.slice(0, -1));  
        
        setTimeout(() => { isUndoOrRedo.current = false; }, 0);  
    }, [undoHistory]);

    // for redoing method using callback
    const redo = useCallback(() => {
        if (redoHistory.length === 0) return;
        
        isUndoOrRedo.current = true; 
        
        const lastState = redoHistory[redoHistory.length - 1];  // get top of redo stack
        
        setUndoHistory(prev => [...prev, pagesRef.current]);  // move top of stack to undo top of stack
        
        setPages(lastState);  // restore state that's been redone
        
        setRedoHistory(prev => prev.slice(0, -1)); 
        
        setTimeout(() => { isUndoOrRedo.current = false; }, 0); 
    }, [redoHistory]);

    // undo redo keyboard events - supports windows, linux and mac
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault(); // prevent from handling twice
                if (undoHistory.length > 0) {
                    undo();
                }
            }
            
            if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
                e.preventDefault(); // prevent from handling twice
                if (redoHistory.length > 0) {
                    redo();
                }
            }
        };
        
        window.addEventListener('keydown', handleKeyDown); // only listen when a key is pressed
        
        return () => window.removeEventListener('keydown', handleKeyDown); // stop listening when a key is no longer pressed
    }, [undo, redo, undoHistory.length, redoHistory.length]);


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
        link: '#ffffff',
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

                        setShowCarouselModal={setShowCarouselModal}
                        setShowSlidesModal={setShowSlidesModal}
                    />

                    {/* canvas */}
                    <div className="flex-1 h-full" />

                    <Canvas canvasColour={canvasColour} activeCursor={activeCursor} onSelect={setSelectedId}>
                        {(scale) => (
                            // passing scale to apply to components
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
                                scale={scale}
                            />
                        )}
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
                        pages={pages} // to output data
                        portfolioId={portfolio.id}
                    />
                </div>

                <Toolbar
                    activeCursor={activeCursor}
                    setActiveCursor={setActiveCursor}
                    toggleEditPanel={toggleEditPanel}
                    addToCanvas={addToCanvas}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}

                    // for undo and redo
                    undo={undo}
                    canUndo={undoHistory.length > 0}
                    redo={redo}
                    canRedo={redoHistory.length > 0}
                />
            </div>

            {showCarouselModal && (
                <CreateCarouselModal
                    projects={projects}
                    onClose={() => setShowCarouselModal(false)}
                    onCreateCarousel={handleCreateCarousel}
                />
            )}

            {showSlidesModal && (
                <CreateSlidesModal
                    projects={projects}
                    onClose={() => setShowSlidesModal(false)}
                    onCreateSlides={handleCreateSlides}
                />
            )}
        </>
    );
}

export default Builder;