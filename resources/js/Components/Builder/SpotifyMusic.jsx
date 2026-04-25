// from https://www.jsdelivr.com/package/npm/spotify-embed
import { SpotifyEmbed } from 'spotify-embed'; 

import { Rnd } from "react-rnd";
import { useRef, useEffect } from "react";

function SpotifyMusic({ onSelect, activeCursor, onStyleChange, id, itemStyle, onSizeChange, scale = 1 }) {
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
            
            const width = typeof itemStyle?.width === 'number' ? itemStyle.width : 500;
            const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 'auto';
            rndRef.current.updateSize({ 
                width, 
                height 
            });
        }
    }, [itemStyle?.x, itemStyle?.y, itemStyle?.width, itemStyle?.height]);

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

    const width = typeof itemStyle?.width === 'number' ? itemStyle.width : '500';
    const height = typeof itemStyle?.height === 'number' ? itemStyle.height : 'auto';

    // get link from user input in right side bar
    const getLink = () => {
        const url = itemStyle?.url || 'https://open.spotify.com/track/4PTG3Z6ehGkBFwjybzWkR8?si=2e78071467524074';
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
            className="component group"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="p-4">
                <SpotifyEmbed src={getLink()} />
            </div>
        </Rnd>
    );
}

export default SpotifyMusic;