import { useState } from 'react';

export default function TickBox({ text = "Remember me"}) {
    const [showTick, setShowTick] = useState(false);

    const toggleTickBox = () => {
        setShowTick(!showTick);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                type="button"
                onClick={toggleTickBox}
                className="outline-none"
            >
                <i className={`fa-regular ${showTick ? 'fa-square-check' : 'fa-square'} fa-xl`}></i>
            </button>
            <p>{text}</p>
        </div>
    );
}