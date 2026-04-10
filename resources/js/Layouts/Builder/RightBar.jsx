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
    currentPageName,
    currentPageItems,
    updatePageColour,
    selectedItem,
    currentItemStyles,
    defaultColour,
    onStyleChange,
    currentPageWidth,
    currentPageHeight
}) {
    
    return (
        <div className={`w-1/6 flex flex-col relative z-10 ${darkMode ? "bg-[#111317]" : "bg-[#EBFFF2]"}`}>
            <div className={`flex flex-row items-center w-full px-4 h-20 justify-between shrink-0 border-b-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
                <div className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex">
                    Publish Portfolio
                </div>
                <div className="rounded-full px-4 h-8 border-[#B5446E] border-2 text-[#B5446E] font-fustat-medium items-center justify-center flex">
                    <i className="fa fa-download fa-md"></i>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
            {openEditPanel === 'shapes' ? (
                /* shapes creation menu */
                <div>
                    <div className="space-y-4 p-4">
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
                    <div className="space-y-4 p-4">
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
                                className={`focus:outline-none focus:ring-0 bg-transparent flex flex-row items-center w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium space-x-2 ${darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"}`}                                            
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
                                className={`focus:outline-none focus:ring-0 bg-transparent flex flex-row items-center w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium space-x-2 ${darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"}`}      
                            >
                                <option value="720x480">720 x 480</option>
                                <option value="1280x720">1280 x 720</option>
                                <option value="1920x1080">1920 x 1080</option>
                                <option value="2480x3508">A4 - 2480 x 3508</option>
                                <option value="custom">Custom dimensions</option>
                            </select>

                            {selectedDimensions === 'custom' && (
                                <div className="flex gap-2 mt-2">
                                    <input
                                        type="number"
                                        placeholder="Width"
                                        className={`focus:outline-none focus:ring-0 bg-transparent w-1/2 px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"}`}
                                        onChange={(e) => {
                                            const height = selectedDimensions.split('x')[1] || '480';
                                            setSelectedDimensions(`${e.target.value}x${height}`);
                                        }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Height"
                                        className={`focus:outline-none focus:ring-0 bg-transparent w-1/2 px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"}`}
                                        onChange={(e) => {
                                            const width = selectedDimensions.split('x')[0] || '720';
                                            setSelectedDimensions(`${width}x${e.target.value}`);
                                        }}
                                    />
                                </div>
                            )}
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
                <div className={`flex-1 p-4 ${darkMode ? " text-[#EBFFF2]" : " text-[#111317]"}`}>
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

                            {/* page details */}
                            <div className="pt-6 space-y-2">
                                <p className="text-md font-fustat-bold">Page Details</p>
                                <p className="text-sm font-fustat-semibold">Page ID: {currentPageId}</p>
                                <p className="text-sm font-fustat-semibold">Page Name: {currentPageName}</p>

                                <p className="text-sm font-fustat-semibold">Page Colour: {currentPageColour}</p>

                                <p className="text-sm font-fustat-semibold">Page Dimensions:</p>
                                <p className="text-sm font-fustat-semibold px-2">Page Width: {currentPageWidth}</p>
                                <p className="text-sm font-fustat-semibold px-2">Page Height: {currentPageHeight}</p>

                                {/* paage items details */}
                                <p className="text-sm font-fustat-semibold pt-4">Page Items: ({currentPageItems.length})</p>
                                <ul className="text-sm font-fustat-semibold px-2">
                                    {currentPageItems.map((item) => (
                                        <li key={item.id}>
                                            {item.type}-{item.id}
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-sm font-fustat-semibold pt-4">Page Item Styles: </p>
                                {currentPageItems.map((item) => {
                                    // making sure to include default styling
                                    const customStyles = currentItemStyles[item.id] || {};
                                    const defaultFill = defaultColour[item.type] || '#545454';
                                    const currentFill = customStyles.fill || defaultFill;

                                    // only show fill for specific components
                                    const shouldShowFill = !['image', 'slides', 'carousel'].includes(item.type);

                                    return (
                                        <ul className="text-sm font-fustat-semibold px-2">
                                            <li key={item.id}>
                                                <div>
                                                    {item.type}-{item.id}
                                                </div>

                                                <div className="text-sm font-fustat-semibold px-2">
                                                    {shouldShowFill && (
                                                        <>fill: {currentFill}</>
                                                    )}

                                                    {Object.entries(customStyles).filter(([key]) => key !== 'fill').map(([styleKey, styleValue]) => (
                                                        <div key={styleKey}>
                                                            {styleKey}: {JSON.stringify(styleValue)}
                                                        </div>
                                                    ))}
                                                </div>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>
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

                            <div className="pt-6 space-y-2">
                                <p className="text-md font-fustat-bold capitalize">{selectedItem?.type} Details</p>
                                <p className="text-sm font-fustat-semibold capitalize">{selectedItem?.type} ID: {selectedItem?.id || 'No ID'}</p>
                            </div>

                            <p className="text-sm font-fustat-semibold pt-4 capitalize">{selectedItem?.type} Styles: </p>
                            {(() => {
                                const customStyles = currentItemStyles[selectedItem?.id] || {};
                                const defaultFill = defaultColour[selectedItem?.type] || '#545454';
                                const allStyles = {
                                    fill: customStyles.fill || defaultFill,
                                    ...customStyles
                                };

                                const shouldShowFill = !['image', 'slides', 'carousel'].includes(selectedItem?.type);
                                const stylesToShow = shouldShowFill 
                                    ? allStyles 
                                    : Object.fromEntries(Object.entries(allStyles).filter(([key]) => key !== 'fill'));
                                
                                return (
                                    <div className="text-sm font-fustat-semibold px-2">
                                        {Object.entries(stylesToShow).map(([key, value]) => (
                                            <div key={key}>
                                                <span>{key}: {typeof value === 'object' ? JSON.stringify(value) : value}</span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()}

                            <div className="pt-4">
                                {/* to customise styling menus for specific components */}
                                {selectedItem?.type === 'text' ? (
                                    <p>*Insert text customisation*</p>
                                ) : (
                                    <p>*Insert shape customisation*</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
            </div>
        </div>
    );
}

export default RightBar;