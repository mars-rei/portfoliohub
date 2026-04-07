import { Rnd } from "react-rnd";

function Carousel({ isSelected, onSelect, activeCursor }) {

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

    return (
        <Rnd
            style={style}
            default={{ x: 0, y: 0, width: 600, height: 400 }}
            bounds="parent" 
            disableDragging={locked}
            enableResizing={!locked}
            onDragStart={(e) => e.stopPropagation()}
            onResizeStart={(e) => e.stopPropagation()}
            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className={`group ${isSelected ? "outline-2 outline-[#003c66]" : "hover:outline-2 hover:outline-[#003c66]"}`}
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