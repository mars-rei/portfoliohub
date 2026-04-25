import { Rnd } from "react-rnd";
import { useRef, useEffect } from "react";

function Triangle({ onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange, scale = 1 }) {
    const rndRef = useRef(null);
    const locked = activeCursor === 'hand';
    const isDraggingResizing = useRef(false); // changed internal update to dragging and resizing
    
    // only syncs position for external updates like undo/redo
    useEffect(() => {
        if (rndRef.current && !isDraggingResizing.current) {
            rndRef.current.updatePosition({ 
                x: itemStyle?.x || 0, 
                y: itemStyle?.y || 0 
            });
            
            const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 100;
            const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 100;
            rndRef.current.updateSize({ 
                width, 
                height 
            });
        }
    }, [itemStyle?.x, itemStyle?.y, itemStyle?.width, itemStyle?.height]);

    const handleDragStart = (e) => {
        isDraggingResizing.current = true;
    };

    const handleDragStop = (e, data) => {
        if (onStyleChange) {
            onStyleChange(id, 'x', data.x);
            onStyleChange(id, 'y', data.y);
        }

        // let update save first
        setTimeout(() => { 
            isDraggingResizing.current = false;
        }, 100);
    };

    const handleResizeStart = (e) => {
        isDraggingResizing.current = true;
    };

    const handleResizeStop = (e, direction, ref, delta, position) => {
        const size = Math.min(
            parseInt(ref.style.width), 
            parseInt(ref.style.height)
        ); // merged width and height from before to become size in one go
        
        ref.style.width = `${size}px`;
        ref.style.height = `${size}px`;
        
        if (onSizeChange) onSizeChange( id, 
            { 
                width: size, 
                height: size 
            }
        );

        if (onStyleChange) {
            onStyleChange(id, 'x', position.x);
            onStyleChange(id, 'y', position.y);
        }

        setTimeout(() => { 
            isDraggingResizing.current = false; 
        }, 100); // lets the update save first
    };

    const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 'auto';
    const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 'auto';

    return (
        <Rnd
            ref={rndRef}
            style={{ display: 'block' }} // just stated style here instead
            
            default={{
                x: itemStyle?.x || 0,
                y: itemStyle?.y || 0,
                width: width,
                height: height
            }}

            scale={scale} // added scale so zoom in or out doesn't affect positioning
            
            bounds="parent" 
            disableDragging={locked}
            enableResizing={!locked}

            onDragStart={handleDragStart} // changed to flag if update is being made
            onDragStop={handleDragStop}

            onResizeStart={handleResizeStart} // changed to flag if update is being made
            onResizeStop={handleResizeStop}

            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className="component group"
            onClick={(e) => e.stopPropagation()} 
        >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <polygon 
                    points="50,0 100,100 0,100" 
                    fill={itemStyle.fill}
                />
            </svg>
        </Rnd>
    );
}

export default Triangle;