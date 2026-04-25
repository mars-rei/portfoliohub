import { Rnd } from "react-rnd";
import { useRef, useEffect } from "react";

function Carousel({ onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange, media = [], scale = 1 }) {
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

    const carouselMedia = [...media, ...media, ...media, ...media, ...media];

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