import { Rnd } from "react-rnd";
import { useRef } from "react";

function Square({ isSelected, onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange }) {
    const rndRef = useRef(null);
    const locked = activeCursor === 'hand';

    const style = {
        display: 'block'
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
            className="component group"
            onClick={(e) => e.stopPropagation()} 
        >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <rect width="100" height="100" fill={itemStyle.fill}/>
            </svg>        
        </Rnd>
    );
}

export default Square;