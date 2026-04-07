function Toolbar({ 
    activeCursor,
    setActiveCursor,
    toggleEditPanel,
    addToCanvas,
    darkMode,
    setDarkMode
}) {
    return (
        <div className="relative z-10">
            <div className="w-1/3 absolute left-1/2 -translate-x-1/2 bottom-8">
                <div className={`py-2 px-8 flex items-center justify-between rounded-2xl fa-xl
                    ${darkMode ? "text-[#EBFFF2] bg-[#1F1F1F]" : "text-[#1F1F1F] bg-[#EBFFF2]"}`}
                >
                    {/* undo - to implement */}
                    <button
                        className={`fa fa-rotate-left cursor-pointer hover:text-[#B5446E]`}
                    />

                    {/* redo - to implement */}
                    <button
                        className={`fa fa-rotate-right cursor-pointer hover:text-[#B5446E]`}
                    />

                    <div className={`inline-block h-full min-h-[2em] w-1 self-stretch rounded-full ${darkMode ? "bg-[#EBFFF2]" : "bg-[#1F1F1F]"}`}></div>

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
                    <button 
                        className="fa fa-file-circle-plus hover:text-[#B5446E]" 
                        onClick={() => toggleEditPanel('pages')}
                    />

                    {/* for new shape */}
                    <button 
                        className="fa fa-draw-polygon cursor-pointer hover:text-[#B5446E]" 
                        onClick={() => toggleEditPanel('shapes')}
                    />

                    {/* for adding text */}
                    <button className="fa fa-font cursor-pointer hover:text-[#B5446E]" onClick={() => addToCanvas('text')} />

                    <div className={`inline-block h-full min-h-[2em] w-1 self-stretch rounded-full ${darkMode ? "bg-[#EBFFF2]" : "bg-[#1F1F1F]"}`}></div>

                    {/* toggling dark and light mode */}
                    <button onClick={() => setDarkMode(!darkMode)} className={`hover:text-[#B5446E] cursor-pointer fa ${darkMode ? "fa-sun" : "fa-moon"}`} />
                </div>
            </div>
        </div>
    );
};

export default Toolbar;