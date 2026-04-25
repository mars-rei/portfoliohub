import { Rnd } from "react-rnd";
import { useRef, useState, useEffect } from "react";

function Slides({ onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange, media = [], scale = 1 }) {
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
            
            const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 400;
            const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 150;
            rndRef.current.updateSize({ 
                width, 
                height 
            });
        }
    }, [itemStyle?.x, itemStyle?.y, itemStyle?.width, itemStyle?.height]);


    const [currentSlide, setCurrentSlide] = useState(0);

    const next = () => {
        setCurrentSlide((prev) => (prev + 1) % media.length);
    };

    const prev = () => {
        setCurrentSlide((prev) => (prev - 1 + media.length) % media.length);
    };

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

    const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 400;
    const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 150;

    return (
        <Rnd
            ref={rndRef}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            
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
            className="component group"
        >
            <div className="relative h-full overflow-hidden flex flex-col">
                {media[currentSlide].type === 'image' ? (
                    <img 
                        src={media[currentSlide].url}
                        className="w-full object-contain rounded-md flex-1 min-h-0"
                    />
                ) : media[currentSlide].type === 'video' ? (
                    <video 
                        src={media[currentSlide].url}
                        className="w-full object-contain rounded-md flex-1 min-h-0"
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 rounded">
                        <i className="fa fa-file text-2xl text-red-400 mb-2"></i>
                    </div>
                )}

                {media.length > 1 && (
                    <div className="flex flex-col items-center pt-4 shrink-0">
                        <p className="text-xs text-white text-center">
                            Slide {currentSlide + 1}/{media.length}
                        </p>
                        <div className="flex justify-center">
                            {currentSlide === 0 && media.length > 1 && (
                                <div onClick={next} className={`hover:text-white ${locked ? 'cursor-grab pointer-events-none' : 'cursor-pointer'}`}>
                                    <i className="fa-solid fa-arrow-right fa-sm"></i>
                                </div>
                            )}
                            {currentSlide === media.length - 1 && media.length > 1 && (
                                <div onClick={prev} className={`hover:text-white ${locked ? 'cursor-grab pointer-events-none' : 'cursor-pointer'}`}>
                                    <i className="fa-solid fa-arrow-left fa-sm"></i>
                                </div>
                            )}
                            {currentSlide > 0 && currentSlide < media.length - 1 && media.length > 1 && (
                                <div className="flex">
                                    <div onClick={prev} className={`mx-2 hover:text-white ${locked ? 'cursor-grab pointer-events-none' : 'cursor-pointer'}`}>
                                        <i className="fa-solid fa-arrow-left fa-sm"></i>
                                    </div>
                                    <div onClick={next} className={`mx-2 hover:text-white ${locked ? 'cursor-grab pointer-events-none' : 'cursor-pointer'}`}>
                                        <i className="fa-solid fa-arrow-right fa-sm"></i>
                                    </div>
                                </div>
                            )}
                        </div>                    
                    </div>
                )}
            </div>
        </Rnd>
    );
}

export default Slides;