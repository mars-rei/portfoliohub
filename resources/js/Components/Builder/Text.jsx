import { Rnd } from "react-rnd";

function Text({ isSelected, onSelect, activeCursor }) {
    
    const locked = activeCursor === 'hand';

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <Rnd
            style={style}
            default={{ x: 0, y: 0, width: 190, height: 60 }}
            bounds=".bounds"
            disableDragging={locked}
            enableResizing={!locked}
            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className={`group p-4 ${isSelected ? "outline outline-2 outline-[#003c66]" : "hover:outline outline-2 hover:outline-[#003c66]"}`}
        >
            <div
                contentEditable={!locked}
                suppressContentEditableWarning
                onMouseDown={(e) => e.stopPropagation()}
                data-placeholder="Enter your text..."
                className={`w-full h-full flex items-center justify-center text-center scrollbar-hide font-extrabold text-xl 
                        text-white bg-transparent outline-none overflow-hidden empty:before:content-[attr(data-placeholder)] 
                        empty:before:text-white/40 
                        ${locked ? 'cursor-grab pointer-events-none' : 'cursor-text'}`}
            />
        </Rnd>
    );
}

export default Text;