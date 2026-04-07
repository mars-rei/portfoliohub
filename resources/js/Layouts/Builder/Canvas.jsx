// draggable and resizable canvas edited from: https://stackblitz.com/edit/react-draggable-canvas-zoom?file=index.tsx

import { useRef, useState, useEffect } from 'react';

const dragInertia = 32 // increased to slow down drag
const zoomBy = 0.01 // lowered to slow down zoom

function Canvas({ canvasColour, activeCursor, onSelect, children }) {

    const containerRef = useRef(null)

    useEffect(() => {
        const { innerHeight, innerWidth } = window
        containerRef.current.scroll(innerWidth * 1.5, innerHeight * 1.5)
    }, [])

    const [scale, setScale] = useState(1);
    const [{ clientX, clientY }, setClient] = useState({ clientX: 0, clientY: 0 });
    const [overflow, setOverflow] = useState('scroll');
    const [{ translateX, translateY }, setTranslate] = useState({ translateX: 0, translateY: 0 });


    // to allow for only the canvas to be zoomed in on and to zoom in where the mouse is rather than at 0,0
    useEffect(() => {
        const el = containerRef.current

        const handleWheel = (e) => {
            e.preventDefault()

            const rect = el.getBoundingClientRect()
            const mouseX = e.clientX - rect.left + el.scrollLeft
            const mouseY = e.clientY - rect.top + el.scrollTop

            const newScale = e.deltaY > 0
                ? Math.max(0.1, scale - zoomBy)
                : scale + zoomBy

            const scaleChange = newScale - scale
            const newTranslateX = translateX - (mouseX * scaleChange) / (scale * newScale)
            const newTranslateY = translateY - (mouseY * scaleChange) / (scale * newScale)

            setScale(newScale)
            setTranslate({ translateX: newTranslateX, translateY: newTranslateY })

            if (newScale <= 1) setOverflow('scroll')
            else setOverflow('hidden')
        }

        el.addEventListener('wheel', handleWheel, { passive: false })
        return () => el.removeEventListener('wheel', handleWheel)
    }, [scale, translateX, translateY])

    return (
        <div
            ref={containerRef}
            className="scrollbar-hide"
            style={{
                overflow,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
            }}
        >
            <div
                style={{
                    backgroundColor: canvasColour,
                    cursor: activeCursor === 'hand' ? 'grab' : 'default',
                    minHeight: '400vh', // to make canvas somewhat infinite
                    minWidth: '400vw', // to make canvas somewhat infinite
                    backgroundSize: `20px 20px`,
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    transform: `scale(${scale}, ${scale}) translate(${translateX}px, ${translateY}px)`,
                    transformOrigin: '0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={() => onSelect(null)} 
                onDragStart={e => {
                    const preview = document.createElement('div')
                    preview.style.display = 'none'
                    e.dataTransfer.setDragImage(preview, 0, 0)
                    setClient({ clientX: e.clientX, clientY: e.clientY })
                }}
                onDrag={e => {
                    if (e.clientX && e.clientY) {
                        const deltaX = (clientX - e.clientX) / dragInertia
                        const deltaY = (clientY - e.clientY) / dragInertia
                        containerRef.current.scrollBy(deltaX, deltaY)
                    }
                }}
                draggable
            >
                {children}
            </div>
        </div>
    );
}

export default Canvas;