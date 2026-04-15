import { Rnd } from "react-rnd";
import { useRef, useEffect } from "react";

function Text({ onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange }) {
    const rndRef = useRef(null); // div containing text
    const contentRef = useRef(null); // for the actual text
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

            // update text
            if (contentRef.current && itemStyle?.text !== undefined) {
                contentRef.current.innerText = itemStyle.text;
            }
        }
        isInternalUpdate.current = false;
    }, [itemStyle?.x, itemStyle?.y, itemStyle?.width, itemStyle?.height, itemStyle?.text]);

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

    const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 'auto';
    const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 'auto';


    // text handling
    const handleTextChange = () => {
        if (contentRef.current) {
            const newText = contentRef.current.innerText;
            isInternalUpdate.current = true;
            if (onStyleChange) {
                onStyleChange(id, 'text', newText);
            }
        }
    };

    const handleBlur = () => {
        handleTextChange();
    };

    const handleInput = () => {
        handleTextChange();
    };

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
            className="component group p-4"
            onClick={(e) => e.stopPropagation()} 
        >
            <div
                ref={contentRef}
                onBlur={handleBlur}
                onInput={handleInput}

                contentEditable={!locked}
                suppressContentEditableWarning
                onMouseDown={(e) => e.stopPropagation()}
                data-placeholder="Enter your text..."
                style={{ color: itemStyle.fill ?? '#ffffff' }}
                className={`w-full h-full flex flex-row scrollbar-hide font-extrabold text-xl 
                    bg-transparent outline-none overflow-auto break-all empty:before:content-[attr(data-placeholder)] 
                    empty:before:text-white/40 
                    ${locked ? 'cursor-grab pointer-events-none' : 'cursor-text'}`}
            />
        </Rnd>
    );
}

export default Text;