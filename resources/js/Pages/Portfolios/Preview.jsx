// issue - either the builder is synced more quickly or the preview is

import { useEffect, useState } from 'react';

export default function Preview({ portfolio, pages }) {

    // make tab name the name of the user's portfolio being previewed
    useEffect(() => {
        document.title = `${portfolio.title}`;
    }, [portfolio.title]);

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const currentPage = pages[currentPageIndex];




    // render items
    const renderItem = (item, customStyles) => {
        const styles = {...customStyles};

        switch(item.type) {
            case 'square':
                return (
                    <div
                        key={item.id}
                        style={{
                            position: 'absolute',
                            left: `${styles.x}px`,
                            top: `${styles.y}px`,
                            width: `${styles.width}px`,
                            height: `${styles.height}px`
                        }}
                    >
                        <svg 
                            width="100%" 
                            height="100%" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect 
                                width="100%" 
                                height="100%"
                                fill={styles.fill}
                            />
                        </svg>
                    </div>  
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-[#ebfff2] p-4">
            {/* portfolio info */}
            <div className="p-8">
                <h1 className="text-4xl font-fustat-bold text-[#003c66]">{portfolio.title}</h1>
                <p className="text-lg font-fustat-medium">{portfolio.description}</p>
            </div>

            {/* portfolio page navigation */}
            <div className="mx-4">
                <div className="flex space-x-4 overflow-x-auto">
                    {pages.map((page, index) => (
                        <button
                            key={page.id}
                            onClick={() => setCurrentPageIndex(index)}
                            className={`px-4 py-2 font-fustat--medium ${
                                currentPageIndex === index
                                    ? 'text-[#B5446E] border-b-2 border-[#B5446E]'
                                    : 'text-[#111317] hover:text-[#B5446E]'
                            }`}
                        >
                            {page.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* just for implementation purposes */}
            <div className="mx-4">
                <div className="flex flex-col">
                    {pages.map((page) => {
                        const items = page.items || [];
                        const itemStyles = page.itemStyles || {};
                        const defaultColour = { 
                            circle: '#545454',
                            square: '#545454',
                            rectangle: '#545454',
                            triangle: '#545454',
                            star: '#545454',
                            shape1: '#545454',
                            shape2: '#545454',
                            text: '#ffffff',
                        };    

                        return (
                            <>
                                <p className="pt-4">{page.id}</p>
                                <p>{page.name}</p>
                                <p>{page.colour}</p>
                                <p>{page.dimensions.width}</p>  
                                <p>{page.dimensions.height}</p>
                                
                                <p>
                                    Page Items: ({items.length})
                                </p>
                                <ul>
                                    {items.map((item) => {
                                        const customStyles = itemStyles[item.id] || {};
                                        const defaultFill = defaultColour[item.type] || '#545454';
                                        const currentFill = customStyles.fill || defaultFill;
                                        
                                        const shouldShowFill = !['image', 'slides', 'carousel'].includes(item.type);
                                        
                                        return (
                                            <li key={item.id}>
                                                <div>
                                                    {item.type}-{item.id}
                                                </div>
                                                
                                                <div>
                                                    {shouldShowFill && (
                                                        <>fill: {currentFill}</>
                                                    )}
                                                    
                                                    {Object.entries(customStyles)
                                                        .filter(([key]) => key !== 'fill')
                                                        .map(([styleKey, styleValue]) => (
                                                            <div key={styleKey}>
                                                                {styleKey}: {JSON.stringify(styleValue)}
                                                            </div>
                                                        ))}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        );
                    })}
                </div>
            </div>

            {/* page previews */}
            <div className="flex justify-center items-center p-8">
                <div className="flex flex-col">
                    <div 
                        className="bounds relative" 
                        style={{
                            backgroundColor: currentPage?.colour || '#B5446E',
                            width: currentPage?.dimensions?.width || 1920,
                            height: currentPage?.dimensions?.height || 1080,
                            position: 'relative',
                            overflow: 'hidden',
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        <div className="offsetParent relative w-full h-full">
                            {currentPage?.items?.map(item => {
                                const itemStyles = currentPage?.itemStyles || {};
                                const customStyles = itemStyles[item.id] || {};
                                return renderItem(item, customStyles);
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}