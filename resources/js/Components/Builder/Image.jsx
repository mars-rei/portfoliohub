import { useState } from "react";
import { Rnd } from "react-rnd";

function Image({ src, isSelected, onSelect, activeCursor }) {

    const locked = activeCursor === 'hand';
    const [size, setSize] = useState({ width: 200, height: 200 });

    const handleImageLoad = (e) => {
        const maxW = 864; // default page width
        const maxH = 576; // default page height
        const naturalW = e.target.naturalWidth; // get width of image import
        const naturalH = e.target.naturalHeight; // get height of image import

        const scale = Math.min(maxW / naturalW, maxH / naturalH, 1); // keep scale

        setSize({
            width: Math.round(naturalW * scale),
            height: Math.round(naturalH * scale),
        });
    };

    return (
        <Rnd
            size={size}
            onResizeStop={(e, direction, ref) => {
                setSize({
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                });
            }}
            default={{ x: 0, y: 0 }}
            bounds=".bounds"
            disableDragging={locked}
            enableResizing={!locked}
            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className={`group ${isSelected ? "outline outline-2 outline-[#003c66]" : "hover:outline hover:outline-2 hover:outline-[#003c66]"}`}
        >
            <img
                src={src}
                onLoad={handleImageLoad}
                className="w-full h-full object-fill"
                draggable={false}
            />
        </Rnd>
    );
}

export default Image;