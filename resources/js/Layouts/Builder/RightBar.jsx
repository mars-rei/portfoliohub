import { useState } from 'react';
import ColourPicker from "@/Components/Builder/ColourPicker";

// for downloading portfolio
import htmlTemplate from '@/../templates/template.html?raw'; // template for html files with in-built css and tailwindcss
import JSZip from 'jszip'; // for zipping files

// component files
import circleTemplate from '@/../templates/shapes/ordinary/Circle.txt?raw';
import rectangleTemplate from '@/../templates/shapes/ordinary/Rectangle.txt?raw';
import squareTemplate from '@/../templates/shapes/ordinary/Square.txt?raw';
import triangleTemplate from '@/../templates/shapes/ordinary/Triangle.txt?raw';
import starTemplate from '@/../templates/shapes/ordinary/Star.txt?raw';

import shape1Template from '@/../templates/shapes/svgShapesByMo/Shape1.txt?raw';
import shape2Template from '@/../templates/shapes/svgShapesByMo/Shape2.txt?raw';

import imageTemplate from '@/../templates/Image.txt?raw';
import videoTemplate from '@/../templates/Video.txt?raw';

import textTemplate from '@/../templates/Text.txt?raw';
import linkTemplate from '@/../templates/Link.txt?raw';



function RightBar({ 
    darkMode,
    openEditPanel,
    addToCanvas,
    toggleEditPanel,
    newPageName,
    setNewPageName,
    newPageColour,
    setNewPageColour,
    selectedDimensions,
    setSelectedDimensions,
    addPage,
    selectedId,
    canvasColour,
    setCanvasColour,
    currentPageColour,
    currentPageId,
    currentPageName,
    currentPageItems,
    updatePageColour,
    selectedItem,
    currentItemStyles,
    defaultColour,
    onStyleChange,
    currentPageWidth,
    currentPageHeight,
    pages,
    portfolioId
}) {

    const fonts = {
        'Advercase': { value: 'advercase, serif', custom: true, file: 'advercase.ttf', family: 'advercase' },
        'Angelica': { value: 'angelica, serif', custom: true, file: 'angelica.ttf', family: 'angelica' },
        'Angel Knives': { value: 'angelknives, sans-serif', custom: true, file: 'angelknives.ttf', family: 'angelknives' },
        'Arial': { value: 'Arial, sans-serif', custom: false },
        'Ballet': { value: 'ballet, serif', custom: true, file: 'ballet.ttf', family: 'ballet' },
        'Cavalhatriz': { value: 'cavalhatriz, serif', custom: true, file: 'cavalhatriz.ttf', family: 'cavalhatriz' },
        'Chopin Script': { value: 'chopinscript, serif', custom: true, file: 'chopinScript.otf', family: 'chopinscript' },
        'Courier New': { value: 'Courier New, monospace', custom: false },
        'Crazy Curlz': { value: 'crazycurlz, serif', custom: true, file: 'crazycurlz.ttf', family: 'crazycurlz' },
        'Cross Stitch': { value: 'crossstitch, sans-serif', custom: true, file: 'crossstitch.ttf', family: 'crossstitch' },
        'Curly Shirley': { value: 'curlyshirley, serif', custom: true, file: 'curlyshirley.ttf', family: 'curlyshirley' },
        'Cutie Queues': { value: 'cutiequeues, serif', custom: true, file: 'cutiequeues.ttf', family: 'cutiequeues' },
        'Daydream': { value: 'daydream, sans-serif', custom: true, file: 'daydream.otf', family: 'daydream' },
        'DM Serif Display': { value: 'DM Serif Display, serif', custom: true, file: 'dmserifdisplay.ttf', family: 'dmserifdisplay' },
        'Dreamer TM': { value: 'dreamertm, serif', custom: true, file: 'dreamertm.ttf', family: 'dreamertm' },
        'Floozy': { value: 'floozy, serif', custom: true, file: 'floozy.ttf', family: 'floozy' },
        'From Me 2 You': { value: 'fromme2you, serif', custom: true, file: 'fromme2you.ttf', family: 'fromme2you' },
        'Georgia': { value: 'Georgia, serif', custom: false },
        'Griffiths': { value: 'griffiths, serif', custom: true, file: 'griffiths.otf', family: 'griffiths' },
        'Helvetica': { value: 'Helvetica, sans-serif', custom: false },
        'I Am The Crayon Monster': { value: 'iamthecrayonmonster, sans-serif', custom: true, file: 'iamthecrayonmonster.ttf', family: 'iamthecrayonmonster' },
        'Impact': { value: 'Impact, sans-serif', custom: false },
        'Jheri Curls': { value: 'jhericurls, sans-serif', custom: true, file: 'jhericurls.ttf', family: 'jhericurls' },
        'Kiwi Soda': { value: 'kiwisoda, sans-serif', custom: true, file: 'kiwisoda.ttf', family: 'kiwisoda' },
        'Letter Magic': { value: 'lettermagic, serif', custom: true, file: 'lettermagic.ttf', family: 'lettermagic' },
        'Mansalva': { value: 'mansalva, serif', custom: true, file: 'mansalva.ttf', family: 'mansalva' },
        'Minecraft': { value: 'minecraft, sans-serif', custom: true, file: 'minecraft.ttf', family: 'minecraft' },
        'New Romantics': { value: 'newromantics, sans-serif', custom: true, file: 'newromantics.ttf', family: 'newromantics' },
        'Orange': { value: 'orange, serif', custom: true, file: 'orange.ttf', family: 'orange' },
        'Press Start 2P': { value: 'Press Start 2P, serif', custom: true, file: 'pressstart2p.ttf', family: 'presssart2p' },
        'Pretty On The Inside': { value: 'prettyontheinside, sans-serif', custom: true, file: 'prettyontheinside.ttf', family: 'prettyontheinside' },
        'Rainy Hearts': { value: 'rainyhearts, sans-serif', custom: true, file: 'rainyhearts.ttf', family: 'rainyhearts' },
        'Rascal': { value: 'rascal, sans-serif', custom: true, file: 'rascal.ttf', family: 'rascal' },
        'Starborn': { value: 'starborn, sans-serif', custom: true, file: 'starborn.ttf', family: 'starborn' },
        'Stars': { value: 'stars, sans-serif', custom: true, file: 'stars.ttf', family: 'stars' },
        'Times New Roman': { value: 'Times New Roman, serif', custom: false },
        'Verdana': { value: 'Verdana, sans-serif', custom: false },
        'Words Taken': { value: 'wordstaken, serif', custom: true, file: 'wordstaken.ttf', family: 'wordstaken' }
    };

    // for custom size of page
    const [isCustomMode, setIsCustomMode] = useState(false);
    const [customWidth, setCustomWidth] = useState('');
    const [customHeight, setCustomHeight] = useState('');

    // to render components
    const renderComponent = (item, styles) => {
        // get item styles
        const itemStyles = styles;

        const width = itemStyles.width || 'auto';
        const height = itemStyles.height || 'auto';
        const x = itemStyles.x;
        const y = itemStyles.y;
        const fill = itemStyles.fill || '#545454';
        const componentId = item.id;

        // for media components
        const src = item.src; 
        const showCaption = itemStyles.showCaption || false;
        const caption = item.caption || '';

        // for text components
        const text = itemStyles.text;
        const fontFamily = itemStyles.fontFamily;
        const fontSize = itemStyles.fontSize;

        // for link component
        const url = itemStyles.url;

        switch(item.type) {
            case 'circle':
                return circleTemplate
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, width)
                    .replace(/{{height}}/g, height)
                    .replace(/{{colourFill}}/g, fill);
            case 'rectangle':
                return rectangleTemplate
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, width)
                    .replace(/{{height}}/g, height)
                    .replace(/{{colourFill}}/g, fill);
            case 'square':
                return squareTemplate
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, width)
                    .replace(/{{height}}/g, height)
                    .replace(/{{colourFill}}/g, fill);
            case 'star':
                return starTemplate
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, width)
                    .replace(/{{height}}/g, height)
                    .replace(/{{colourFill}}/g, fill);
            case 'triangle':
                return triangleTemplate
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, width)
                    .replace(/{{height}}/g, height)
                    .replace(/{{colourFill}}/g, fill);

            case 'shape1':
                return shape1Template
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, width)
                    .replace(/{{height}}/g, height)
                    .replace(/{{colourFill}}/g, fill);
            case 'shape2':
                return shape2Template
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, width)
                    .replace(/{{height}}/g, height)
                    .replace(/{{colourFill}}/g, fill);

            case 'image':
                // generate caption html is show caption is not false
        const imageCaptionHtml = showCaption && caption ? `<div className="pt-2">
                    <p class="text-sm text-white">
                        ${caption}
                    </p>
                </div>` : '';

                return imageTemplate
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, width)
                    .replace(/{{height}}/g, height)
                    .replace(/{{src}}/g, src)
                    .replace(/{{caption}}/g, imageCaptionHtml);

            case 'video':
                // generate caption html is show caption is not false
        const videoCaptionHtml = showCaption && caption ? `<div className="pt-2">
                    <p class="text-sm text-white">
                        ${caption}
                    </p>
                </div>` : '';

                return videoTemplate
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, width)
                    .replace(/{{height}}/g, height)
                    .replace(/{{src}}/g, src)
                    .replace(/{{caption}}/g, videoCaptionHtml);

            case 'text':
                // in case height or width is auto
                // problem when width or height is auto - it gets visually squished on download
                const textWidth = width === 'auto' ? 'auto' : `${width}px`;
                const textHeight = height === 'auto' ? 'auto' : `${height}px`;

                return textTemplate
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, textWidth)
                    .replace(/{{height}}/g, textHeight)
                    .replace(/{{colourFill}}/g, fill)
                    .replace(/{{textContent}}/g, text)
                    .replace(/{{fontSize}}/g, fontSize)
                    .replace(/{{fontFamily}}/g, fontFamily);
            case 'link':
                const linkWidth = width === 'auto' ? 'auto' : `${width}px`;
                const linkHeight = height === 'auto' ? 'auto' : `${height}px`;

                return linkTemplate
                    .replace(/{{id}}/g, componentId)
                    .replace(/{{x}}/g, x)
                    .replace(/{{y}}/g, y)
                    .replace(/{{width}}/g, linkWidth)
                    .replace(/{{height}}/g, linkHeight)
                    .replace(/{{colourFill}}/g, fill)
                    .replace(/{{textContent}}/g, text)
                    .replace(/{{fontSize}}/g, fontSize)
                    .replace(/{{fontFamily}}/g, fontFamily)
                    .replace(/{{url}}/g, url);
            
            
            default:
                return `<div class="absolute">
                            <p>Error.</p>
                        </div>`;
        }
    };

    // organising files to zip when user tries downloading portfolio
    const downloadPortfolioData = async () => {
        try {
            // create zip instance
            const zip = new JSZip();

            // json data of portfolio
            const pageData = pages;
            const jsonData = JSON.stringify(pageData, null, 2);
            zip.file('portfolio-data.json', jsonData);


            // control which custom font files need to be downloaded alongside their styling in styles.css
            const customFonts = new Set();
            pages.forEach(page => {
                Object.values(page.itemStyles).forEach(style => {
                    if (style.fontFamily) {
                        // get font family as string to compare
                        const fontFamilyString = style.fontFamily;
                        
                        // find custom fonts used
                        const usedFonts = Object.entries(fonts).find(([_, fontInfo]) => {
                            const fontValue = fontInfo.value.split(',')[0].replace(/'/g, '');
                            const styleFont = fontFamilyString.split(',')[0].replace(/'/g, '');
                            return fontValue === styleFont && fontInfo.custom === true;
                        });
                        
                        if (usedFonts) {
                            customFonts.add(usedFonts[0]); 
                        }
                    }
                });
            });

            for (const font of customFonts) {
                const info = fonts[font];
                if (info && info.file) {
                    const response = await fetch(`/fonts/${info.file}`);
                    const fontBlob = await response.blob();
                    zip.file(info.file, fontBlob);
                }
            }

            // font styling for css file
            let fontCss = '';
            for (const fontName of customFonts) {
                const fontInfo = fonts[fontName];
                if (fontInfo && fontInfo.custom) {
                    const format = fontInfo.file.endsWith('.ttf') ? 'truetype' : 'opentype';
                    fontCss += `@font-face {
                        font-family: '${fontInfo.family}';
                        src: url('${fontInfo.file}') format('${format}');
                        font-weight: normal;
                        font-style: normal;
                    }`;
                }
            }

            const css = fontCss;
            zip.file('styles.css', css);


            
            // html files of portfolio
            pages.forEach((page, index) => {

                let pageContent = '';
                page.items.forEach(item => {
                    const itemStyles = page.itemStyles[item.id] || {};
                    const componentHtml = renderComponent(item, itemStyles);
                    pageContent += componentHtml;
                });

                // keeps file name valid so no errors occur on compilation
                const fileName = `${page.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`; 
                
                // use html template and replace attributes
                let htmlPage = htmlTemplate; 
                
                htmlPage = htmlPage
                    .replace(/{{pageName}}/g, page.name)
                    .replace(/{{pageColour}}/g, page.colour)
                    .replace(/{{pageWidth}}/g, page.dimensions.width)
                    .replace(/{{pageHeight}}/g, page.dimensions.height)

                    .replace(/{{content}}/g, pageContent);
                
                zip.file(fileName, htmlPage);
            });


            // generate zip
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            
            // download zip
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'portfolio.zip';
            a.click();
            URL.revokeObjectURL(url);
            
            return jsonData;
        } catch (error) {
            console.error('Error creating zip file:', error);
        }
    };

    const handlePreviewPortfolio = () => {
        const previewUrl = `/portfolios/${portfolioId}/preview`;
        window.open(previewUrl, '_blank'); // open new page for preview
    };
    
    return (
        <div className={`w-1/6 flex flex-col relative z-10 ${darkMode ? "bg-[#111317]" : "bg-[#EBFFF2]"}`}>
            <div className={`flex flex-row items-center w-full px-4 h-20 justify-between shrink-0 border-b-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
                {/* to preview portfolio */}
                <button 
                    onClick={handlePreviewPortfolio}
                    className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex"
                >
                    Preview Portfolio
                </button>

                {/* to download files */}
                <button 
                    onClick={downloadPortfolioData}
                    className="rounded-full px-4 h-8 border-[#B5446E] border-2 text-[#B5446E] font-fustat-medium items-center justify-center flex"
                >
                    <i className="fa fa-download fa-md"></i>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
            {openEditPanel === 'shapes' ? (
                /* shapes creation menu */
                <div>
                    <div className="space-y-4 p-4">
                        <div className={`space-y-2 text-lg font-fustat-semibold ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                            <p>Shapes</p>
                        </div>
                    </div>
                    <div className={`scrollbar-hide border-[#111317] ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <div className="grid grid-cols-2 gap-2 px-4">
                            <div onClick={() => { addToCanvas('square'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-square fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Square</span>
                            </div>
                            <div onClick={() => { addToCanvas('rectangle'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-square fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Rectangle</span>
                            </div>
                            <div onClick={() => { addToCanvas('triangle');  toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-play fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Triangle</span>
                            </div>
                            <div onClick={() => { addToCanvas('circle'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-circle fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Circle</span>
                            </div>
                            <div onClick={() => { addToCanvas('star'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-star fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Star</span>
                            </div>
                        </div>
                    </div>

                    {/* for shapes by mo */}
                    <div className={`mt-12 scrollbar-hide border-[#111317] ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        <div className="grid grid-cols-2 gap-2 px-4">
                            <div onClick={() => { addToCanvas('shape1'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-shapes fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Shape 1</span>
                            </div>
                            <div onClick={() => { addToCanvas('shape2'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                <i className="fa fa-shapes fa-2x text-[#B5446E]"></i>
                                <span className="text-sm">Shape 2</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : openEditPanel === 'pages' ? (
                /* pages creation menu */
                <div>
                    <div className="space-y-4 p-4">
                        <div className={`space-y-2 text-lg font-fustat-semibold ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                            <p>Add new page</p>
                        </div>
                    </div>

                    <div className={`scrollbar-hide space-y-4 text-md font-fustat-semibold border-[#111317] ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                        {/* page name input */}
                        <div className="px-4">
                            <p className="text-md font-fustat-semibold mb-1">Page Name</p>
                            <input 
                                type="text"
                                value={newPageName}
                                onChange={(e) => setNewPageName(e.target.value)}
                                className={`focus:outline-none focus:ring-0 bg-transparent flex flex-row items-center w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium space-x-2 ${darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"}`}                                            
                                placeholder="Enter page name..."
                            />
                        </div>

                        {/* page colour picker */}
                        <div className="px-4">
                            <p className="text-md font-fustat-semibold mb-1">Page Colour</p>
                            <ColourPicker 
                                color={newPageColour}
                                onChange={setNewPageColour}
                                darkMode={darkMode}
                            />
                        </div>

                        {/* screen size input */}
                        <div className="px-4">
                            <p className="text-md font-fustat-semibold mb-1">Dimensions</p>
                            {!isCustomMode ? (
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex gap-2">
                                        <select 
                                            value={selectedDimensions} 
                                            onChange={(e) => setSelectedDimensions(e.target.value)}
                                            className={`focus:outline-none focus:ring-0 bg-transparent flex-1 px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"}`}      
                                        >
                                            <option value="1280x720">1280 x 720</option>
                                            <option value="1920x1080">1920 x 1080</option>
                                            <option value="2400x1600">2400 x 1600</option>
                                            <option value="2480x3508">A4 - 2480 x 3508</option>
                                        </select>
                                        <button
                                            onClick={() => setIsCustomMode(true)}
                                            className="rounded-full px-4 h-8 text-md border-2 border-[#B5446E] text-[#B5446E] font-fustat-medium items-center justify-center flex"
                                        >
                                            Custom
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            const [width, height] = selectedDimensions.split('x').map(Number);
                                            addPage({ 
                                                name: newPageName, 
                                                colour: newPageColour, 
                                                dimensions: { width, height } 
                                            });
                                            toggleEditPanel('pages');

                                            setNewPageName('Untitled Page');
                                            setNewPageColour('#B5446E');
                                            setSelectedDimensions('720x480');
                                        }}
                                        className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex"
                                    >
                                        Create Page
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-y-2">
                                    <div className="flex gap-2 mb-2">
                                        <div className="flex gap-2 flex-1">
                                            <input
                                                type="number"
                                                placeholder="Width"
                                                value={customWidth}
                                                onChange={(e) => setCustomWidth(e.target.value)}
                                                className={`focus:outline-none focus:ring-0 bg-transparent w-1/2 px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"}`}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Height"
                                                value={customHeight}
                                                onChange={(e) => setCustomHeight(e.target.value)}
                                                className={`focus:outline-none focus:ring-0 bg-transparent w-1/2 px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"}`}
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsCustomMode(false);
                                                setSelectedDimensions('1920x1080'); 
                                            }}
                                            className="rounded-full px-4 h-8 text-md border-2 border-[#B5446E] text-[#B5446E] font-fustat-medium items-center justify-center flex"
                                        >
                                            ←
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const width = parseInt(customWidth) || 1920;
                                            const height = parseInt(customHeight) || 1080;
                                            const dimensions = `${width}x${height}`;
                                            setSelectedDimensions(dimensions);
                                            
                                            addPage({ 
                                                name: newPageName, 
                                                colour: newPageColour, 
                                                dimensions: { width, height } 
                                            });
                                            toggleEditPanel('pages');
                                            
                                            setNewPageName('Untitled Page');
                                            setNewPageColour('#B5446E');
                                            setSelectedDimensions('1920x1080');
                                            setCustomWidth('');
                                            setCustomHeight('');
                                            setIsCustomMode(false);
                                        }}
                                        className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex"
                                    >
                                        Create Page
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                /* styling menus */
                <div className={`flex-1 p-4 ${darkMode ? " text-[#EBFFF2]" : " text-[#111317]"}`}>
                    {selectedId === null ? (
                        <>
                            {/* default styling menu is for colouring canvas */}
                            <p className="text-lg font-fustat-semibold mb-1">Canvas</p>
                            <ColourPicker color={canvasColour} onChange={setCanvasColour} darkMode={darkMode} />
                        </>
                    ) : selectedId === 'page' ? (
                        <>
                            {/* styling menu for colouring page */}
                            <p className="text-lg font-fustat-semibold mb-1">Page</p>
                            <ColourPicker 
                                color={currentPageColour} 
                                onChange={(val) => updatePageColour(currentPageId, val)} 
                                darkMode={darkMode} 
                            />

                            {/* page details */}
                            <div className="pt-6 space-y-2">
                                <p className="text-md font-fustat-bold">Page Details</p>
                                <p className="text-sm font-fustat-semibold">Page ID: {currentPageId}</p>
                                <p className="text-sm font-fustat-semibold">Page Name: {currentPageName}</p>

                                <p className="text-sm font-fustat-semibold">Page Colour: {currentPageColour}</p>

                                <p className="text-sm font-fustat-semibold">Page Dimensions:</p>
                                <p className="text-sm font-fustat-semibold px-2">Page Width: {currentPageWidth}</p>
                                <p className="text-sm font-fustat-semibold px-2">Page Height: {currentPageHeight}</p>

                                {/* page items details */}
                                <p className="text-sm font-fustat-semibold pt-4">Page Items: ({currentPageItems.length})</p>
                                <ul className="text-sm font-fustat-semibold px-2">
                                    {currentPageItems.map((item) => (
                                        <li key={item.id}>
                                            {item.type}-{item.id}
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-sm font-fustat-semibold pt-4">Page Item Styles: </p>
                                {currentPageItems.map((item) => {
                                    // making sure to include default styling
                                    const customStyles = currentItemStyles[item.id] || {};
                                    const defaultFill = defaultColour[item.type] || '#545454';
                                    const currentFill = customStyles.fill || defaultFill;

                                    // only show fill for specific components
                                    const shouldShowFill = !['image', 'slides', 'carousel'].includes(item.type);

                                    return (
                                        <ul className="text-sm font-fustat-semibold px-2">
                                            <li key={item.id}>
                                                <div>
                                                    {item.type}-{item.id}
                                                </div>

                                                <div className="text-sm font-fustat-semibold px-2">
                                                    {shouldShowFill && (
                                                        <>fill: {currentFill}</>
                                                    )}

                                                    {Object.entries(customStyles).filter(([key]) => key !== 'fill').map(([styleKey, styleValue]) => (
                                                        <div key={styleKey}>
                                                            {styleKey}: {JSON.stringify(styleValue)}
                                                        </div>
                                                    ))}
                                                </div>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* styling menu for components such as shapes and text */}
                            <p className="text-lg font-fustat-semibold mb-1 capitalize">{selectedItem?.type}</p>
                            {selectedItem?.type !== 'image' && selectedItem?.type !== 'slides' && selectedItem?.type !== 'carousel' && (
                                <ColourPicker
                                    color={currentItemStyles[selectedItem?.id]?.fill ?? defaultColour[selectedItem?.type]}
                                    onChange={val => onStyleChange(selectedItem?.id, 'fill', val)}
                                    darkMode={darkMode}
                                />
                            )}

                            <div className="mt-4">
                                {selectedItem?.type === 'circle' || selectedItem?.type === 'square'
                                    || selectedItem?.type === 'star' || selectedItem?.type === 'triangle' 
                                    || selectedItem?.type === 'shape1' || selectedItem?.type === 'shape2' ? (
                                    <>
                                        <div>
                                            <label className="text-sm font-fustat-semibold block mb-1">Size</label>
                                            <input
                                                type="number"
                                                value={currentItemStyles[selectedItem?.id]?.width || ''}
                                                onChange={(e) => {
                                                    const size = e.target.value === '' ? undefined : parseInt(e.target.value);
                                                    onStyleChange(selectedItem?.id, 'width', size);
                                                    onStyleChange(selectedItem?.id, 'height', size);
                                                }}
                                                onKeyDown={(e) => e.stopPropagation()} 
                                                className={`focus:outline-none focus:ring-0 bg-transparent w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${
                                                    darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"
                                                }`}
                                                placeholder="Size"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-row gap-x-2">
                                            <div className="w-1/2">
                                                <label className="text-sm font-fustat-semibold block mb-1">Width</label>
                                                <input
                                                    type="number"
                                                    value={currentItemStyles[selectedItem?.id]?.width || ''}
                                                    onChange={(e) => {
                                                        const width = e.target.value === '' ? undefined : parseInt(e.target.value);
                                                        onStyleChange(selectedItem?.id, 'width', width);
                                                    }}
                                                    onKeyDown={(e) => e.stopPropagation()} 
                                                    className={`focus:outline-none focus:ring-0 bg-transparent w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${
                                                        darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"
                                                    }`}
                                                    placeholder="Width"
                                                />
                                            </div>
                                            
                                            <div className="w-1/2">
                                                <label className="text-sm font-fustat-semibold block mb-1">Height</label>
                                                <input
                                                    type="number"
                                                    value={currentItemStyles[selectedItem?.id]?.height || ''}
                                                    onChange={(e) => {
                                                        const height = e.target.value === '' ? undefined : parseInt(e.target.value);
                                                        onStyleChange(selectedItem?.id, 'height', height);
                                                    }}
                                                    onKeyDown={(e) => e.stopPropagation()} 
                                                    className={`focus:outline-none focus:ring-0 bg-transparent w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${
                                                        darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"
                                                    }`}
                                                    placeholder="Height"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* font sizing for text and font changes */}
                            <div className="mt-4">
                                {selectedItem?.type === 'text' || selectedItem?.type === 'link' && (
                                    <>
                                        <div>
                                            {/* font size */}
                                            <label className="text-sm font-fustat-semibold block mb-1">Font Size</label>
                                            <input
                                                type="number"
                                                value={currentItemStyles[selectedItem?.id]?.fontSize || ''}
                                                onChange={(e) => {
                                                    const fontSize = e.target.value === '' ? undefined : parseInt(e.target.value);
                                                    onStyleChange(selectedItem?.id, 'fontSize', fontSize);
                                                }}
                                                onKeyDown={(e) => e.stopPropagation()} 
                                                className={`focus:outline-none focus:ring-0 bg-transparent w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${
                                                    darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"
                                                }`}
                                                placeholder="Font size"
                                            />

                                            {/* fonts menu */}
                                            <label className="text-sm font-fustat-semibold block mb-1 pt-4">Font</label>
                                            <select
                                                value={currentItemStyles[selectedItem?.id]?.fontFamily || 'Arial, sans-serif'}
                                                onChange={(e) => onStyleChange(selectedItem?.id, 'fontFamily', e.target.value)}
                                                className={`focus:outline-none focus:ring-0 bg-transparent w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${
                                                    darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"
                                                }`}
                                                style={{ 
                                                    fontFamily: currentItemStyles[selectedItem?.id]?.fontFamily || 'Arial, sans-serif' 
                                                }}
                                            >
                                                {Object.entries(fonts).map(([fontName, fontInfo]) => (
                                                    <option 
                                                        key={fontName} 
                                                        value={fontInfo.value}
                                                        style={{ fontFamily: fontInfo.value }}
                                                    >
                                                        {fontName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* add link to text of link component */}
                            {selectedItem?.type === 'link' && (
                                <div className="mt-4">
                                    <label className="text-sm font-fustat-semibold block mb-1">URL</label>
                                    <input
                                        type="text"
                                        value={currentItemStyles[selectedItem?.id]?.url || ''}
                                        onChange={(e) => onStyleChange(selectedItem?.id, 'url', e.target.value)}
                                        onKeyDown={(e) => e.stopPropagation()} 
                                        className={`focus:outline-none focus:ring-0 bg-transparent w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium ${
                                            darkMode ? "border-[#EBFFF2] focus:border-[#EBFFF2]" : "border-[#111317] focus:border-[#111317]"
                                        }`}
                                        placeholder="Enter URL..."
                                    />
                                </div>
                            )}

                            {/* captions for media */}
                            <div className="mt-4">
                                {(selectedItem?.type === 'image' || selectedItem?.type === 'video') && (
                                    <div className="flex flex-col justify-between">
                                        <label className="text-sm font-fustat-semibold block">Caption</label>
                                        <label className="flex items-center cursor-pointer gap-2 pt-2">
                                            <input
                                                type="checkbox"
                                                checked={currentItemStyles[selectedItem?.id]?.showCaption || false}
                                                onChange={(e) => onStyleChange(selectedItem?.id, 'showCaption', e.target.checked)}
                                                className="rounded border-2 border-[#B5446E] bg-transparent focus:outline-none focus:ring-0 focus:border-[#B5446E] focus:ring-offset-0 checked:bg-[#B5446E] text-[#B5446E]"
                                            />
                                            <span className="text-sm font-fustat-medium">
                                                {currentItemStyles[selectedItem?.id]?.showCaption ? 'Hide' : 'Show'}
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 space-y-2">
                                <p className="text-md font-fustat-bold capitalize">{selectedItem?.type} Details</p>
                                <p className="text-sm font-fustat-semibold capitalize">{selectedItem?.type} ID: {selectedItem?.id || 'No ID'}</p>
                            </div>

                            <p className="text-sm font-fustat-semibold pt-4 capitalize">{selectedItem?.type} Styles: </p>
                            {(() => {
                                const customStyles = currentItemStyles[selectedItem?.id] || {};
                                const defaultFill = defaultColour[selectedItem?.type] || '#545454';
                                const allStyles = {
                                    fill: customStyles.fill || defaultFill,
                                    ...customStyles
                                };

                                const shouldShowFill = !['image', 'slides', 'carousel'].includes(selectedItem?.type);
                                const stylesToShow = shouldShowFill 
                                    ? allStyles 
                                    : Object.fromEntries(Object.entries(allStyles).filter(([key]) => key !== 'fill'));
                                
                                return (
                                    <div className="text-sm font-fustat-semibold px-2">
                                        {Object.entries(stylesToShow).map(([key, value]) => (
                                            <div key={key}>
                                                <span>{key}: {typeof value === 'boolean' ? value.toString() : (typeof value === 'object' ? JSON.stringify(value) : value)}</span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()}
                        </>
                    )}
                </div>
            )}
            </div>
        </div>
    );
}

export default RightBar;