import { Rnd } from "react-rnd";
import { useRef, useEffect } from "react";

function Link({ onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange, scale = 1 }) {
    const rndRef = useRef(null); // div containing text
    const contentRef = useRef(null); // for the actual text
    const locked = activeCursor === 'hand';
    const isDraggingResizing = useRef(false); // changed internal update to dragging and resizing
    
    // only syncs position for external updates like undo/redo
    useEffect(() => {
        if (rndRef.current && !isDraggingResizing.current) {
            rndRef.current.updatePosition({ 
                x: itemStyle?.x || 0, 
                y: itemStyle?.y || 0 
            });
            
            const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 500;
            const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 'auto';
            rndRef.current.updateSize({ 
                width, 
                height 
            });

            // update text
            if (contentRef.current && itemStyle?.text !== undefined) {
                contentRef.current.innerText = itemStyle.text;
            }
        }
    }, [itemStyle?.x, itemStyle?.y, itemStyle?.width, itemStyle?.height, itemStyle?.text]);

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
        const newWidth = parseInt(ref.style.width);
        const newHeight = parseInt(ref.style.height);
        
        if (onSizeChange) {
            onSizeChange(id, { width: newWidth, height: newHeight });
        }

        if (onStyleChange) {
            onStyleChange(id, 'x', position.x);
            onStyleChange(id, 'y', position.y);
        }

        setTimeout(() => { 
            isDraggingResizing.current = false; 
        }, 100); // lets the update save first
    };

    const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 500;
    const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 'auto';


    // text handling
    const handleTextChange = () => {
        if (contentRef.current) {
            const newText = contentRef.current.innerText;
            isDraggingResizing.current = true;
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

    // get link from user input in right side bar
    const getLink = () => {
        const url = itemStyle?.url || 'http://portfoliohub.marsrei.com';
        return url;
    };

    return (
        <Rnd
            ref={rndRef}
            style={{ display: 'block' }} // just stated style here instead
            
            default={{
                x: itemStyle?.x || 0,
                y: itemStyle?.y || 0,
                width,
                height
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
            className="component group p-4"
            onClick={(e) => e.stopPropagation()} 
        >
            <a
                href={getLink()}
                target="_blank"
                style={{ 
                    display: 'block',
                    textDecoration: 'none'
                }}
            >
                <div
                    ref={contentRef}
                    onBlur={handleBlur}
                    onInput={handleInput}

                    contentEditable={!locked}
                    suppressContentEditableWarning
                    onMouseDown={(e) => e.stopPropagation()}
                    data-placeholder="Enter your link text..."
                    style={{ 
                        color: itemStyle.fill ?? '#ffffff',
                        fontSize: itemStyle.fontSize ? `${itemStyle.fontSize}px` : '2rem',
                        fontFamily: itemStyle.fontFamily || 'Arial, sans-serif'
                    }}
                    className={`w-full h-full flex flex-row scrollbar-hide
                        bg-transparent outline-none overflow-auto break-all empty:before:content-[attr(data-placeholder)] 
                        empty:before:text-white/40 
                        ${locked ? 'cursor-grab pointer-events-none' : 'cursor-text'}`}
                />
            </a>
        </Rnd>
    );
}

export default Link;