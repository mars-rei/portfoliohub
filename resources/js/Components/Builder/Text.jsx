import { Rnd } from "react-rnd";

function Text({ isSelected, onSelect, activeCursor, itemStyle = {} }) {
    const colour   = itemStyle.fill;
    
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
            bounds="parent" 
            disableDragging={locked}
            enableResizing={!locked}
            onDragStart={(e) => e.stopPropagation()}
            onResizeStart={(e) => e.stopPropagation()}
            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className={`group p-4 ${isSelected ? "outline-2 outline-[#003c66]" : "hover:outline-2 hover:outline-[#003c66]"}`}
            onClick={(e) => e.stopPropagation()} 
        >
            <div
                contentEditable={!locked}
                suppressContentEditableWarning
                onMouseDown={(e) => e.stopPropagation()}
                data-placeholder="Enter your text..."
                style={{ color: itemStyle.fill ?? '#ffffff' }}
                className={`w-full h-full flex items-center justify-center text-center scrollbar-hide font-extrabold text-xl 
                        bg-transparent outline-none overflow-hidden empty:before:content-[attr(data-placeholder)] 
                        empty:before:text-white/40 
                        ${locked ? 'cursor-grab pointer-events-none' : 'cursor-text'}`}
            />
        </Rnd>
    );
}

export default Text;