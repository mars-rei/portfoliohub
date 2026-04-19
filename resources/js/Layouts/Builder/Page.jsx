// https://github.com/bokuweb/react-rnd/blob/master/stories/bounds-and-offset.js

import { useEffect } from "react";

import Carousel from '@/Components/Builder/Carousel';
import Image from '@/Components/Builder/Image';
import Video from '@/Components/Builder/Video';
// import Pdf from '@/Components/Builder/Pdf'; pdf is not working
import Slides from '@/Components/Builder/Slides';
import Text from '@/Components/Builder/Text';
import Link from '@/Components/Builder/Link';
import SpotifyMusic from '@/Components/Builder/SpotifyMusic';

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
    dimensions = { width: 1920, height: 1080 }, // default page dimensions
    onStyleChange // to help dynamic classes for components on page
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
            id: item.id, 
            isSelected: selectedId === item.id,
            onSelect: () => onSelect(item.id),
            onRemove: () => onRemove(item.id),
            activeCursor,
            itemStyle: style, 
            onStyleChange: onStyleChange
        };

        // to track sizes of components
        const handleSizeChange = (id, dimensions) => {
            onStyleChange(id, 'width', dimensions.width);
            onStyleChange(id, 'height', dimensions.height);
        };

        // components
        if (item.type === 'image') return <Image {...props} src={item.src} onSizeChange={handleSizeChange} showCaption={style.showCaption || false} caption={item.caption || ''} />;
        if (item.type === 'video') return <Video {...props} src={item.src} onSizeChange={handleSizeChange} showCaption={style.showCaption || false} caption={item.caption || ''} />;
        // if (item.type === 'pdf') return <Pdf {...props} src={item.src} onSizeChange={handleSizeChange}/>;
        if (item.type === 'slides') return <Slides {...props} media={item.media} onSizeChange={handleSizeChange} />;
        if (item.type === 'carousel') return <Carousel {...props} media={item.media} onSizeChange={handleSizeChange} />;
        if (item.type === 'text') return <Text {...props} onSizeChange={handleSizeChange} />;
        if (item.type === 'link') return <Link {...props} onSizeChange={handleSizeChange} />;
        if (item.type === 'spotifyMusic') return <SpotifyMusic {...props} onSizeChange={handleSizeChange} />;

        // ordinary shapes
        if (item.type === 'star') return <Star {...props} onSizeChange={handleSizeChange} />;
        if (item.type === 'square') return <Square {...props} onSizeChange={handleSizeChange} />;
        if (item.type === 'circle') return <Circle {...props} onSizeChange={handleSizeChange} />;
        if (item.type === 'rectangle') return <Rectangle {...props} onSizeChange={handleSizeChange} />;
        if (item.type === 'triangle') return <Triangle {...props} onSizeChange={handleSizeChange} />;

        // shapesByMo
        if (item.type === 'shape1') return <Shape1 {...props} onSizeChange={handleSizeChange} />;
        if (item.type === 'shape2') return <Shape2 {...props} onSizeChange={handleSizeChange} />;
        
        return null;
    };

    // update page name as user types
    const handlePageNameChange = (e) => {
        onPageNameChange(pageId, e.target.value);
    };

    // dynamic classes to be edited in the right side bar
    const pageStyle = {
        backgroundColor: pageColour,
        width: dimensions.width,
        height: dimensions.height,
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
    };

    return (
        <>
            <div className="flex flex-col text-[#EBFFF2] font-fustat-medium text-md">
                <div className="w-full flex flex-row justify-between items-center">
                    <textarea 
                        className="scrollbar-hide -ml-3 resize-none bg-transparent border-none outline-none focus:border-none focus:outline-none focus:ring-0 font-fustat-semibold text-2xl"
                        onMouseDown={(e) => e.stopPropagation()}
                        placeholder="Enter page name..."
                        value={pageName}
                        onChange={handlePageNameChange}
                        rows={1}
                        style={{ width: 'auto', minWidth: '100px' }}
                    />

                    {/* page height and width */}
                    <p className="text-2xl opacity-70">{dimensions.width} x {dimensions.height}</p> 
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
                                <p className="txt-xl opacity-50">Zoom out & add components here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;