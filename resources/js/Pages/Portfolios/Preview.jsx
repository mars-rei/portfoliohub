// issue - the preview is more synced to positions than the builder

import { useEffect, useState } from 'react';

// from https://www.jsdelivr.com/package/npm/spotify-embed
import { SpotifyEmbed } from 'spotify-embed'; 

export default function Preview({ portfolio, pages }) {

    // make tab name the name of the user's portfolio being previewed
    useEffect(() => {
        document.title = `${portfolio.title}`;
    }, [portfolio.title]);

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const currentPage = pages[currentPageIndex];

    // render items - would probably be better if there was a function to compress the interactable components to static ones
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

            case 'circle':
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
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <circle 
                                cx="50" cy="50" r="50" 
                                fill={styles.fill}
                            />
                        </svg>
                    </div>  
                );

            case 'rectangle':
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
                            <rect width="100%" height="100%" fill={styles.fill}/>
                        </svg>
                    </div>  
                );

            case 'star':
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
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <polygon
                                points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
                                fill={styles.fill}
                            />
                        </svg>
                    </div>  
                );

            case 'triangle':
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
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <polygon 
                                points="50,0 100,100 0,100" 
                                fill={styles.fill}
                            />
                        </svg>
                    </div>  
                );

            case 'shape1':
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
                        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" fill={styles.fill}></path>
                        </svg>
                    </div>  
                );

            case 'shape2':
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
                        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                            <path d="M 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 128 C 256 198.692 198.692 256 128 256 L 128 192 C 163.346 192 192 163.346 192 128 Z M 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z M 256 0 C 256 70.692 198.692 128 128 128 L 128 64 C 163.346 64 192 35.346 192 0 Z" fill={styles.fill}></path>            
                        </svg>
                    </div>  
                );

            case 'text':
                return (
                    <div
                        key={item.id}
                        style={{
                            display: 'block',
                            position: 'absolute',
                            left: `${styles.x}px`,
                            top: `${styles.y}px`,
                            width: `${styles.width}px`,
                            height: `${styles.height}px`
                        }}
                    >
                        <p
                            style={{
                                color: styles.fill,
                                fontSize: styles.fontSize ? `${styles.fontSize}px` : '2rem',
                                fontFamily: styles.fontFamily || 'Arial, sans-serif'
                            }}
                        >
                            {styles.text}
                        </p>
                    </div>  
                );

            case 'link':
                return (
                    <div
                        key={item.id}
                        style={{
                            display: 'block',
                            position: 'absolute',
                            left: `${styles.x}px`,
                            top: `${styles.y}px`,
                            width: `${styles.width}px`,
                            height: `${styles.height}px`
                        }}
                    >
                        <a
                            href={`${styles.url}`}
                            style={{
                                textDecoration: 'none',
                                color: styles.fill,
                                fontSize: styles.fontSize ? `${styles.fontSize}px` : '2rem',
                                fontFamily: styles.fontFamily || 'Arial, sans-serif'
                            }}
                        >
                            {styles.text}
                        </a>
                    </div>  
                );

            case 'spotifyMusic':
                return (
                    <div
                        key={item.id}
                        style={{
                            display: 'block',
                            position: 'absolute',
                            left: `${styles.x}px`,
                            top: `${styles.y}px`,
                            width: `${styles.width}px`,
                            height: `${styles.height}px`
                        }}
                    >
                        <div className="p-4">
                            <SpotifyEmbed src={styles.url} />
                        </div>
                    </div>  
                );

            case 'image':
                return (
                    <div
                        key={item.id}
                        style={{
                            display: 'block',
                            position: 'absolute',
                            left: `${styles.x}px`,
                            top: `${styles.y}px`,
                            width: `${styles.width}px`,
                            height: `${styles.height}px`
                        }}
                    >
                        <img 
                            src={item.src} 
                            className="w-full h-full" 
                        />
                        {styles.showCaption && (
                            <div className="pt-2 w-full text-center">
                                <p className="text-sm text-white font-fustat-medium">
                                    {item.caption}
                                </p>
                            </div>
                        )}
                    </div>  
                );

            case 'video':
                return (
                    <div
                        key={item.id}
                        style={{
                            display: 'block',
                            position: 'absolute',
                            left: `${styles.x}px`,
                            top: `${styles.y}px`,
                            width: `${styles.width}px`,
                            height: `${styles.height}px`
                        }}
                    >
                        <video
                            src={item.src} 
                            controls
                            className="w-full h-full" 
                        />
                        {styles.showCaption && (
                            <div className="pt-2 w-full text-center">
                                <p className="text-sm text-white font-fustat-medium">
                                    {item.caption}
                                </p>
                            </div>
                        )}
                    </div>  
                );

            case 'slides':
                const [currentSlide, setCurrentSlide] = useState(0);

                const next = () => {
                    setCurrentSlide((prev) => (prev + 1) % item.media.length);
                };

                const prev = () => {
                    setCurrentSlide((prev) => (prev - 1 + item.media.length) % item.media.length);
                };

                return (
                    <div
                        key={item.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            left: `${styles.x}px`,
                            top: `${styles.y}px`,
                            width: `${styles.width}px`,
                            height: `${styles.height}px`
                        }}
                    >
                        <div className="relative h-full overflow-hidden flex flex-col">
                            {item.media[currentSlide].type === 'image' ? (
                                <img 
                                    src={item.media[currentSlide].url}
                                    className="w-full object-contain rounded-md flex-1 min-h-0"
                                />
                            ) : item.media[currentSlide].type === 'video' ? (
                                <video 
                                    src={item.media[currentSlide].url}
                                    className="w-full object-contain rounded-md flex-1 min-h-0"
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 rounded">
                                    <i className="fa fa-file text-2xl text-red-400 mb-2"></i>
                                </div>
                            )}

                            {item.media.length > 1 && (
                                <div className="flex flex-col items-center pt-4 shrink-0">
                                    <p className="text-xs text-white text-center">
                                        Slide {currentSlide + 1}/{item.media.length}
                                    </p>
                                    <div className="flex justify-center">
                                        {currentSlide === 0 && item.media.length > 1 && (
                                            <div onClick={next} className={`hover:text-white`}>
                                                <i className="fa-solid fa-arrow-right fa-sm"></i>
                                            </div>
                                        )}
                                        {currentSlide === item.media.length - 1 && item.media.length > 1 && (
                                            <div onClick={prev} className={`hover:text-white`}>
                                                <i className="fa-solid fa-arrow-left fa-sm"></i>
                                            </div>
                                        )}
                                        {currentSlide > 0 && currentSlide < item.media.length - 1 && item.media.length > 1 && (
                                            <div className="flex">
                                                <div onClick={prev} className={`mx-2 hover:text-white`}>
                                                    <i className="fa-solid fa-arrow-left fa-sm"></i>
                                                </div>
                                                <div onClick={next} className={`mx-2 hover:text-white`}>
                                                    <i className="fa-solid fa-arrow-right fa-sm"></i>
                                                </div>
                                            </div>
                                        )}
                                    </div>                    
                                </div>
                            )}
                        </div>
                    </div>  
                );

            case 'carousel':

                const carouselMedia = [...item.media, ...item.media, ...item.media, ...item.media, ...item.media];

                return (
                    <div
                        key={item.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            left: `${styles.x}px`,
                            top: `${styles.y}px`,
                            width: `${styles.width}px`,
                            height: `${styles.height}px`
                        }}
                    >
                        <div className="w-full h-full overflow-hidden">
                            <div className="overflow-x-auto scrollbar-hide h-full">
                                <div className="flex items-center h-full p-4 gap-2 min-w-max">
                                    {carouselMedia.map((i, index) => (
                                        <div key={index} className="h-full rounded-xl shadow-lg overflow-hidden transform hover:scale-110 transition-transform duration-300">
                                            {i.type === 'image' ? (
                                                <img 
                                                    src={i.url} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : i.type === 'video' ? (
                                                <video 
                                                    src={i.url} 
                                                    className="w-full h-full object-cover" 
                                                    autoPlay 
                                                    muted 
                                                    loop 
                                                    playsInline
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 rounded">
                                                    <i className="fa fa-file text-2xl text-red-400 mb-2"></i>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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

            {/* just for implementation purposes - will remove before testing 

            {/* 
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
            */}

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