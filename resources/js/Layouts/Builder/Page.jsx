// https://github.com/bokuweb/react-rnd/blob/master/stories/bounds-and-offset.js

import { useEffect } from "react";

import Carousel from '@/Components/Builder/Carousel';
import Image from '@/Components/Builder/Image';
import Slides from '@/Components/Builder/Slides';
import Text from '@/Components/Builder/Text';

import Star from '@/Components/Builder/shapes/ordinary/Star';
import Square from '@/Components/Builder/shapes/ordinary/Square';
import Circle from '@/Components/Builder/shapes/ordinary/Circle';
import Rectangle from '@/Components/Builder/shapes/ordinary/Rectangle';
import Triangle from '@/Components/Builder/shapes/ordinary/Triangle';

import Shape1 from '@/Components/Builder/shapes/svgShapesByMo/Shape1';
import Shape2 from '@/Components/Builder/shapes/svgShapesByMo/Shape2';

// the last component to be declared is on the top layer

function Page({ 
    pageId,
    pageName, 
    onPageNameChange,
    items, 
    itemStyles, 
    selectedId, 
    onSelect, 
    onRemove, 
    activeCursor, 
    pageColour,
    dimensions = { width: 720, height: 480 } // default page dimensions
}) {

    // for deleting components from canvas
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
                onRemove(selectedId);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedId, onRemove]);

    // for rendering items onto canvas
    const showItem = (item) => {
        const style = itemStyles?.[item.id] ?? {};
        const props = {
            key: item.id,
            isSelected: selectedId === item.id,
            onSelect: () => onSelect(item.id),
            onRemove: () => onRemove(item.id),
            activeCursor,
            itemStyle: style, 
        };

        // components
        if (item.type === 'image') return <Image {...props} src={item.src} />;
        if (item.type === 'slides') return <Slides {...props} />;
        if (item.type === 'carousel') return <Carousel {...props} />;
        if (item.type === 'text') return <Text {...props} />;

        // ordinary shapes
        if (item.type === 'star') return <Star {...props} />;
        if (item.type === 'square') return <Square {...props} />;
        if (item.type === 'circle') return <Circle {...props} />;
        if (item.type === 'rectangle') return <Rectangle {...props} />;
        if (item.type === 'triangle') return <Triangle {...props} />;

        // shapesByMo
        if (item.type === 'shape1') return <Shape1 {...props} />;
        if (item.type === 'shape2') return <Shape2 {...props} />;
        
        return null;
    };

    // update page name as user types
    const handlePageNameChange = (e) => {
        onPageNameChange(pageId, e.target.value);
    };

    // Generate dynamic classes based on dimensions
    const pageStyle = {
        backgroundColor: pageColour,
        width: dimensions.width,
        height: dimensions.height,
        position: 'relative',
        overflow: 'hidden' 
    };

    return (
        <>
            <div className="flex flex-col text-[#EBFFF2] font-fustat-medium text-md">
                <div className="w-full flex flex-row justify-between items-center">
                    <textarea 
                        className="scrollbar-hide -ml-3 resize-none bg-transparent border-none outline-none focus:border-none focus:outline-none focus:ring-0 font-fustat-semibold text-lg"
                        onMouseDown={(e) => e.stopPropagation()}
                        placeholder="Enter page name..."
                        value={pageName}
                        onChange={handlePageNameChange}
                        rows={1}
                        style={{ width: 'auto', minWidth: '100px' }}
                    />

                    {/* page height and width */}
                    <p className="text-sm opacity-70">{dimensions.width} x {dimensions.height}</p> 
                </div>
                <div 
                    className="bounds relative" 
                    style={pageStyle}
                    onClick={(e) => { e.stopPropagation(); onSelect('page'); }}
                    onDragStart={(e) => e.stopPropagation()}
                    onDrag={(e) => e.stopPropagation()}
                >
                    <div className="offsetParent relative w-full h-full">
                        {items && items.length > 0 ? (
                            items.map(showItem)
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <p className="opacity-50">Add components here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;