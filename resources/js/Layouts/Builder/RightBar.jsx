import ColourPicker from "@/Components/Builder/ColourPicker";

function RightBar({ 
    darkMode,
    openEditPanel,
    addToCanvas,
    toggleEditPanel,
    newPageName,
    setNewPageName,
    newPageColour,
    setNewPageColour,
    selectedDimensions,
    setSelectedDimensions,
    addPage,
    selectedId,
    canvasColour,
    setCanvasColour,
    currentPageColour,
    currentPageId,
    updatePageColour,
    selectedItem,
    currentItemStyles,
    defaultColour,
    onStyleChange
}) {
    
    return (
        <div className={`w-1/6 flex flex-col relative z-10 ${darkMode ? "bg-[#111317]" : "bg-[#EBFFF2]"}`}>
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
                            <div onClick={() => { addToCanvas('square'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-square fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Square</span>
                            </div>
                            <div onClick={() => { addToCanvas('rectangle'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-square fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Rectangle</span>
                            </div>
                            <div onClick={() => { addToCanvas('triangle');  toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-play fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Triangle</span>
                            </div>
                            <div onClick={() => { addToCanvas('circle'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-circle fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Circle</span>
                            </div>
                            <div onClick={() => { addToCanvas('star'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-star fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Star</span>
                            </div>
                        </div>
                    </div>

                    {/* for shapes by mo */}
                    <div className={`mt-12 scrollbar-hide border-[#111317] ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <div className="grid grid-cols-2 gap-2 px-4">
                            <div onClick={() => { addToCanvas('shape1'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-shapes fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Shape 1</span>
                            </div>
                            <div onClick={() => { addToCanvas('shape2'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-shapes fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Shape 2</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : openEditPanel === 'pages' ? (
                /* pages creation menu */
                <div>
                    <div className={`space-y-4 p-4 border-t-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
                        <div className={`space-y-2 text-lg font-fustat-semibold ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                            <p>Add new page</p>
                        </div>
                    </div>

                    <div className={`scrollbar-hide space-y-4 text-md font-fustat-semibold border-[#111317] ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        {/* page name input */}
                        <div className="px-4">
                            <p className="text-md font-fustat-semibold mb-1">Page Name</p>
                            <input 
                                type="text"
                                value={newPageName}
                                onChange={(e) => setNewPageName(e.target.value)}
                                className={`bg-transparent flex flex-row items-center w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium space-x-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}                                            
                                placeholder="Enter page name..."
                            />
                        </div>

                        {/* page colour picker */}
                        <div className="px-4">
                            <p className="text-md font-fustat-semibold mb-1">Page Colour</p>
                            <ColourPicker 
                                color={newPageColour}
                                onChange={setNewPageColour}
                                darkMode={darkMode}
                            />
                        </div>

                        {/* screen size input */}
                        <div className="px-4">
                            <p className="text-md font-fustat-semibold mb-1">Dimensions</p>
                            <select 
                                value={selectedDimensions} 
                                onChange={(e) => setSelectedDimensions(e.target.value)}
                                className={`bg-transparent flex flex-row items-center w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium space-x-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}      
                            >
                                <option value="720x480">720 x 480</option>
                                <option value="1280x720">1280 x 720</option>
                                <option value="1920x1080">1920 x 1080</option>
                                <option value="2480x3508">A4 - 2480 x 3508</option>
                            </select>
                        </div>

                        <div className="px-4 flex justify-center">
                            <button 
                                onClick={() => {
                                    const [width, height] = selectedDimensions.split('x').map(Number);
                                    addPage({ 
                                        name: newPageName, 
                                        colour: newPageColour, 
                                        dimensions: { width, height } 
                                    });
                                    toggleEditPanel('pages');

                                    setNewPageName('Untitled Page');
                                    setNewPageColour('#B5446E');
                                    setSelectedDimensions('720x480');
                                }}
                                className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex"
                            >
                                Create Page
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* styling menus */
                <div className={`flex-1 p-4 border-t-2 ${darkMode ? "border-[#EBFFF2] text-[#EBFFF2]" : "border-[#111317] text-[#111317]"}`}>
                    {selectedId === null ? (
                        <>
                            {/* default styling menu is for colouring canvas */}
                            <p className="text-lg font-fustat-semibold mb-1">Canvas</p>
                            <ColourPicker color={canvasColour} onChange={setCanvasColour} darkMode={darkMode} />
                        </>
                    ) : selectedId === 'page' ? (
                        <>
                            {/* styling menu for colouring page */}
                            <p className="text-lg font-fustat-semibold mb-1">Page</p>
                            <ColourPicker 
                                color={currentPageColour} 
                                onChange={(val) => updatePageColour(currentPageId, val)} 
                                darkMode={darkMode} 
                            />
                        </>
                    ) : (
                        <>
                            {/* styling menu for components such as shapes and text */}
                            <p className="text-lg font-fustat-semibold mb-1 capitalize">{selectedItem?.type}</p>
                            <ColourPicker
                                color={currentItemStyles[selectedItem?.id]?.fill ?? defaultColour[selectedItem?.type]}
                                onChange={val => onStyleChange(selectedItem?.id, 'fill', val)}
                                darkMode={darkMode}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default RightBar;