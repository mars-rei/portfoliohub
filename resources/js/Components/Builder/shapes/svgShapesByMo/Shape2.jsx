// svg from: https://www.shapes.gallery/

import { Rnd } from "react-rnd";
import { useRef, useEffect } from "react";

function Shape2({ onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange }) {
    const rndRef = useRef(null);
    const locked = activeCursor === 'hand';

    // trying to sort out placement glitching problem - prevents infinite update loops
    const isInternalUpdate = useRef(false);
    
    // to sync undo and redo (item styles is updated but the visual of the component didn't use to change)
    useEffect(() => {
        if (rndRef.current && !isInternalUpdate.current) {
            // update position
            rndRef.current.updatePosition({
                x: itemStyle?.x || 0,
                y: itemStyle?.y || 0
            });
            
            // update size
            const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 'auto';
            const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 'auto';
            rndRef.current.updateSize({
                width: width,
                height: height
            });
        }
        isInternalUpdate.current = false;
    }, [itemStyle?.x, itemStyle?.y, itemStyle?.width, itemStyle?.height]);

    const style = {
        display: 'block',
    };

    const handleResizeStop = (e, direction, ref, delta, position) => {
        let newWidth = parseInt(ref.style.width);
        let newHeight = parseInt(ref.style.height);

        isInternalUpdate.current = true;
        
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
        isInternalUpdate.current = true;
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
                <path d="M 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 128 C 256 198.692 198.692 256 128 256 L 128 192 C 163.346 192 192 163.346 192 128 Z M 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z M 256 0 C 256 70.692 198.692 128 128 128 L 128 64 C 163.346 64 192 35.346 192 0 Z" fill={itemStyle.fill}></path>            
            </svg>
        </Rnd>
    );
}

export default Shape2;