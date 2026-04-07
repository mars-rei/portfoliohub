import { useState } from 'react';
import { Rnd } from "react-rnd";

function Slides({ isSelected, onSelect, activeCursor }) {

    const locked = activeCursor === 'hand';

    const items = [
        "/images/1.png",
        "/images/2.png",
        "/images/1.png",
        "/images/2.png"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const next = () => {
        setCurrentSlide((prev) => (prev + 1) % items.length);
    };

    const prev = () => {
        setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
    };

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <Rnd
            style={style}
            default={{ x: 0, y: 0, width: 200, height: 200 }}
            bounds="parent" 
            disableDragging={locked}
            enableResizing={!locked}
            onDragStart={(e) => e.stopPropagation()}
            onResizeStart={(e) => e.stopPropagation()}
            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className={`group ${isSelected ? "outline-2 outline-[#003c66]" : "hover:outline-2 hover:outline-[#003c66]"}`}
        >
            <div className="relative h-full overflow-hidden flex flex-col">
                <img
                    src={items[currentSlide]}
                    className="w-full object-contain rounded-md flex-1 min-h-0"
                    draggable={false}
                />

                {items.length > 1 && (
                    <div className="flex flex-col items-center py-4 shrink-0">
                        <p className="text-xs text-white text-center">
                            Slide {currentSlide + 1}/{items.length}
                        </p>
                        <div className="flex justify-center">
                            {currentSlide === 0 && items.length > 1 && (
                                <div onClick={next} className={`hover:text-white ${locked ? 'cursor-grab pointer-events-none' : 'cursor-pointer'}`}>
                                    <i className="fa-solid fa-arrow-right fa-sm"></i>
                                </div>
                            )}
                            {currentSlide === items.length - 1 && items.length > 1 && (
                                <div onClick={prev} className={`hover:text-white ${locked ? 'cursor-grab pointer-events-none' : 'cursor-pointer'}`}>
                                    <i className="fa-solid fa-arrow-left fa-sm"></i>
                                </div>
                            )}
                            {currentSlide > 0 && currentSlide < items.length - 1 && items.length > 1 && (
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