function Toolbar({ 
    activeCursor,
    setActiveCursor,
    toggleEditPanel,
    addToCanvas,
    darkMode,
    setDarkMode,
    undo, 
    canUndo,
    redo,
    canRedo
}) {
    return (
        <div className="relative z-10">
            <div className="w-2/5 absolute left-1/2 -translate-x-1/2 bottom-8">
                <div className={`py-4 px-8 flex items-center justify-between rounded-2xl fa-xl
                    ${darkMode ? "text-[#EBFFF2] bg-[#1F1F1F]" : "text-[#1F1F1F] bg-[#EBFFF2]"}`}
                >
                    {/* undo */}
                    <div className={`flex flex-col gap-y-1 text-sm font-fustat-medium ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <button
                            className={`fa fa-2x fa-rotate-left cursor-pointer hover:text-[#B5446E] ${!canUndo ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={undo}
                            disabled={!canUndo}
                        />
                        <p>Undo</p>
                    </div>

                    {/* redo */}
                    <div className={`flex flex-col gap-y-1 text-sm font-fustat-medium ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <button
                            className={`fa fa-2x fa-rotate-right cursor-pointer hover:text-[#B5446E] ${!canRedo ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={redo}
                            disabled={!canRedo}
                        />
                        <p>Redo</p>
                    </div>
                    

                    <div className={`inline-block h-full min-h-[2em] w-1 self-stretch rounded-full ${darkMode ? "bg-[#EBFFF2]" : "bg-[#1F1F1F]"}`}></div>

                    {/* for editing on canvas - to implement just selecting */}
                    <div className={`flex flex-col gap-y-1 text-sm font-fustat-medium ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <button
                            className={`fa fa-2x fa-arrow-pointer cursor-pointer hover:text-[#B5446E] ${activeCursor=== 'pointer' ? 'text-[#B5446E]' : ''}`}
                            onClick={() => setActiveCursor('pointer')}
                        />
                        <p>Select</p>
                    </div>

                    {/* for grabbing and moving around canvas */}
                    <div className={`flex flex-col gap-y-1 text-sm font-fustat-medium ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <button
                            className={`fa fa-hand fa-2x cursor-pointer hover:text-[#B5446E] ${activeCursor=== 'pointer' ? '' : 'text-[#B5446E]'}`}
                            onClick={() => setActiveCursor('hand')}
                        />
                        <p>Grab</p>
                    </div>

                    {/* for new page */}
                    <div className={`flex flex-col gap-y-1 text-sm font-fustat-medium ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <button 
                            className="fa fa-2x fa-file-circle-plus hover:text-[#B5446E]" 
                            onClick={() => toggleEditPanel('pages')}
                        />
                        <p>Pages</p>
                    </div>

                    {/* for new shape */}
                    <div className={`flex flex-col gap-y-1 text-sm font-fustat-medium ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <button 
                            className="fa fa-2x fa-shapes cursor-pointer hover:text-[#B5446E]" 
                            onClick={() => toggleEditPanel('shapes')}
                        />
                        <p>Shapes</p>
                    </div>

                    {/* for adding text */}
                    <div className={`flex flex-col gap-y-1 text-sm font-fustat-medium ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <button 
                            className="fa fa-2x fa-font cursor-pointer hover:text-[#B5446E]" 
                            onClick={() => addToCanvas('text')} 
                        />
                        <p>Text</p>
                    </div>

                    <div className={`inline-block h-full min-h-[2em] w-1 self-stretch rounded-full ${darkMode ? "bg-[#EBFFF2]" : "bg-[#1F1F1F]"}`}></div>

                    {/* toggling dark and light mode */}
                    <div className={`flex flex-col gap-y-1 text-sm font-fustat-medium ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <button 
                            className={`fa fa-2x cursor-pointer hover:text-[#B5446E] ${darkMode ? "fa-sun" : "fa-moon"}`} 
                            onClick={() => setDarkMode(!darkMode)} 
                        />
                        <p>Theme</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;