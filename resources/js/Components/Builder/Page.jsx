// https://github.com/bokuweb/react-rnd/blob/master/stories/bounds-and-offset.js

import { useEffect } from "react";

import Carousel from './Carousel';
import Image from './Image';
import Slides from './Slides';
import Text from './Text';

// the last component to be declared is on the top layer

function Page({ items, selectedId, onSelect, onRemove, activeCursor }) {

    // for deleting components from canvas
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
                onRemove(selectedId);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedId]);

    // for rendering items onto canvas
    const showItem = (item) => {
        const props = {
            key: item.id,
            isSelected: selectedId === item.id,
            onSelect: () => onSelect(item.id),
            onRemove: () => onRemove(item.id),
            activeCursor,
        };

        if (item.type === 'image') return <Image {...props} src={item.src} />;
        if (item.type === 'slides') return <Slides {...props} />;
        if (item.type === 'carousel') return <Carousel {...props} />;
        if (item.type === 'text') return <Text {...props} />;
    };

    return (
        <div> {/* need to add on hover / on click without interfering with components on the page */}
            <div className="w-full flex flex-row justify-between">
                {/* page name */}
                <textarea 
                    className="p-0 resize-none bg-transparent outline-none border-0 focus:outline-none focus:ring-0 focus:shadow-none -mb-4"
                    onMouseDown={(e) => e.stopPropagation()}
                    placeholder="Enter page name..."
                    defaultValue="Home"
                />

                {/* height and width of page */}
                <p>720 x 480</p> 
            </div>
            <div className="bounds w-[54rem] h-[36rem] bg-[#B5446E]" onClick={() => onSelect(null)}>
                <div className="offsetParent">
                    {items.map(showItem)}
                </div>
            </div>
        </div>
    );
}

export default Page;