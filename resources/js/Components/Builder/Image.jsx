// there's a problem with the boundary of the page becoming smaller unless the image is resized

import { Rnd } from "react-rnd";
import { useRef } from "react";

function Image({ src, isSelected, onSelect, activeCursor, onStyleChange, id, itemStyle }) {
    const rndRef = useRef(null);
    const locked = activeCursor === 'hand';

    const style = {
        display: 'block',
    };

    // stored dimensions or defaults
    const initialWidth = itemStyle?.width || 100;
    const initialHeight = itemStyle?.height || 100;
    const initialX = itemStyle?.x || 0;
    const initialY = itemStyle?.y || 0;

    const handleResizeStop = (e, direction, ref, delta, position) => {
        const newWidth = parseInt(ref.style.width);
        const newHeight = parseInt(ref.style.height);
        
        if (onStyleChange) {
            onStyleChange(id, 'width', newWidth);
            onStyleChange(id, 'height', newHeight);
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

    return (
        <Rnd
            ref={rndRef}
            style={style}
            default={{ 
                // position is top left corner of image
                x: initialX,
                y: initialY, 

                width: initialWidth, 
                height: initialHeight 
            }}
            bounds="parent" 
            disableDragging={locked}
            enableResizing={!locked}
            onDragStart={(e) => e.stopPropagation()}
            onResizeStart={(e) => e.stopPropagation()}

            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}

            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className={`group ${isSelected ? "outline-2 outline-[#003c66]" : "hover:outline-2 hover:outline-[#003c66]"}`}
            onClick={(e) => e.stopPropagation()} 
        >
            <img 
                src={src} 
                className="w-full h-full object-contain" 
                draggable={false}
            />
        </Rnd>
    );
}

export default Image;