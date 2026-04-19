import { Rnd } from "react-rnd";
import { useRef, useEffect } from "react";

function Carousel({ onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange, media = [] }) {
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
            const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 400;
            const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 150;
            rndRef.current.updateSize({ width, height });
        }
        isInternalUpdate.current = false;
    }, [itemStyle?.x, itemStyle?.y, itemStyle?.width, itemStyle?.height]);

    const carouselMedia = [...media, ...media, ...media, ...media, ...media];

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

    const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 400;
    const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 150;

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
            <div className="w-full h-full overflow-hidden">
                <div className="overflow-x-auto scrollbar-hide h-full">
                    <div className="flex items-center h-full p-4 gap-2 min-w-max">
                        {carouselMedia.map((item, index) => (
                            <div key={index} className="h-full rounded-xl shadow-lg overflow-hidden transform hover:scale-110 transition-transform duration-300">
                                {item.type === 'image' ? (
                                    <img 
                                        src={item.url} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : item.type === 'video' ? (
                                    <video 
                                        src={item.url} 
                                        className="w-full h-full object-cover" 
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Rnd>
    );
}

export default Carousel;