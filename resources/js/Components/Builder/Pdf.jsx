// from https://www.npmjs.com/package/react-pdf
import { Rnd } from "react-rnd";
import { useRef, useEffect } from "react";

function Pdf({ src, onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange }) {
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
        const newWidth = parseInt(ref.style.width);
        const newHeight = parseInt(ref.style.height);

        isInternalUpdate.current = true;
        
        if (onSizeChange) {
            onSizeChange(id, { width: newWidth, height: newHeight });
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

    const width = typeof itemStyle?.width === 'number' ? itemStyle.width : '500';
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
            <iframe 
                src={src}
                title="PDF Viewer"
                width="100%" 
                height="100%"
                style={{ 
                    border: 'none',
                    display: 'block'   
                }}
            />
        </Rnd>
    );
}

export default Pdf;