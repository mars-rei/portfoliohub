import { Rnd } from "react-rnd";
import { useRef, useState, useEffect } from "react";

function Slides({ onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange, media = [] }) {
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


    const [currentSlide, setCurrentSlide] = useState(0);

    const next = () => {
        setCurrentSlide((prev) => (prev + 1) % media.length);
    };

    const prev = () => {
        setCurrentSlide((prev) => (prev - 1 + media.length) % media.length);
    };

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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