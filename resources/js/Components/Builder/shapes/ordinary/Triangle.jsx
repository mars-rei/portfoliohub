// just need to manage colouring

import { Rnd } from "react-rnd";

function Triangle({ src, isSelected, onSelect, activeCursor, itemStyle = {} }) {

    const fill   = itemStyle.fill ?? 'rgb(84, 84, 84)';

    const locked = activeCursor === 'hand';

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <Rnd
            style={style}
            default={{ x: 0, y: 0, width: 100, height: 100 }}
            bounds="parent" 
            disableDragging={locked}
            enableResizing={!locked}
            onDragStart={(e) => e.stopPropagation()}
            onResizeStart={(e) => e.stopPropagation()}
            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className={`group ${isSelected ? "outline-2 outline-[#003c66]" : "hover:outline-2 hover:outline-[#003c66]"}`}
            onClick={(e) => e.stopPropagation()} 
        >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <polygon points="50,0 100,100 0,100" fill={fill}/>
            </svg>
        </Rnd>
    );
}

export default Triangle;