// svg from: https://www.shapes.gallery/

import { Rnd } from "react-rnd";
import { useRef, useState } from "react";

function Shape1({ isSelected, onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange }) {
    const rndRef = useRef(null);
    const locked = activeCursor === 'hand';

    // trying to sort out placement glitching problem
    const [localPosition, setLocalPosition] = useState({
        x: itemStyle?.x || 0,
        y: itemStyle?.y || 0
    });

    const style = {
        display: 'block',
    };

    const handleResizeStop = (e, direction, ref, delta, position) => {
        let newWidth = parseInt(ref.style.width);
        let newHeight = parseInt(ref.style.height);
        
        // make width and height equal - use smaller value
        const size = Math.min(newWidth, newHeight);
        
        ref.style.width = `${size}px`;
        ref.style.height = `${size}px`;
        
        if (onSizeChange) {
            onSizeChange(id, { width: size, height: size });
        }
        
        if (onStyleChange) {
            onStyleChange(id, 'x', position.x);
            onStyleChange(id, 'y', position.y);
        }
    };

    const handleDragStop = (e, data) => {
        setLocalPosition({ x: data.x, y: data.y });
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

            default={{
                x: itemStyle?.x || 0,
                y: itemStyle?.y || 0,
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
            className="component group"
            onClick={(e) => e.stopPropagation()} 
        >
            <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" fill={itemStyle.fill}></path>
            </svg>
        </Rnd>
    );
}

export default Shape1;