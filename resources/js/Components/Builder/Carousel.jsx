import { Rnd } from "react-rnd";
import { useState, useRef } from "react";

function Carousel({ isSelected, onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange }) {
    const rndRef = useRef(null);
    const locked = activeCursor === 'hand';

    {/* creates list of media */}
    const items = [
        "/images/2.png",
        "/images/1.png",
        "/images/2.png",
        "/images/1.png"
    ];

    // make it seem infinite
    const duplicatedItems = [...items, ...items, ...items, ...items, ...items];

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    };

    const handleDragStop = (e, data) => {
        if (onStyleChange) {
            onStyleChange(id, 'x', data.x);
            onStyleChange(id, 'y', data.y);
        }
    };

    return (
        <Rnd
            ref={rndRef}
            style={style}
            default={{ 
                x: 0,
                y: 0, 
                width: itemStyle?.width, 
                height: itemStyle?.height
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
                        {duplicatedItems.map((item, index) => (
                            <div
                                key={index}
                                className="h-full rounded-xl shadow-lg overflow-hidden transform hover:scale-110 transition-transform duration-300"
                            >
                                <img
                                    src={item}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Rnd>
    );
}

export default Carousel;