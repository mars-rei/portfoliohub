import { Rnd } from "react-rnd";
import { useRef } from "react";

function Text({ isSelected, onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange }) {
    const rndRef = useRef(null);
    const locked = activeCursor === 'hand';

    const style = {
        display: 'block',
    };

    const handleResizeStop = (e, direction, ref, delta, position) => {
        const newWidth = parseInt(ref.style.width);
        const newHeight = parseInt(ref.style.height);
        
        if (onSizeChange) {
            onSizeChange(id, { width: newWidth, height: newHeight });
        }
        
        if (onStyleChange) {
            onStyleChange(id, 'x', position.x);
            onStyleChange(id, 'y', position.y);
        }
    };

    const handleDragStop = (e, data) => {
        if (onStyleChange) {
            onStyleChange(id, 'x', data.x);
            onStyleChange(id, 'y', data.y);
        }
    };

    const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 'auto';
    const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 'auto';

    return (
        <Rnd
            ref={rndRef}
            style={style}
            
            position={{
                x: itemStyle?.x || 0,
                y: itemStyle?.y || 0
            }}
            size={{
                width: width,
                height: height
            }}

            bounds="parent" 
            disableDragging={locked}
            enableResizing={!locked}
            onDragStart={(e) => e.stopPropagation()}
            onResizeStart={(e) => e.stopPropagation()}

            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}

            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className="component group p-4"
            onClick={(e) => e.stopPropagation()} 
        >
            <div
                contentEditable={!locked}
                suppressContentEditableWarning
                onMouseDown={(e) => e.stopPropagation()}
                data-placeholder="Enter your text..."
                style={{ color: itemStyle.fill ?? '#ffffff' }}
                className={`w-full h-full flex scrollbar-hide font-extrabold text-xl 
                    bg-transparent outline-none overflow-auto break-all empty:before:content-[attr(data-placeholder)] 
                    empty:before:text-white/40 
                    ${locked ? 'cursor-grab pointer-events-none' : 'cursor-text'}`}
            />
        </Rnd>
    );
}

export default Text;