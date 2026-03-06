import React from 'react';

import { SketchPicker } from 'react-color';

// eyedropper does not work in firefox, safari

class ColourPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showPicker: false, eyedropperSupported: window.EyeDropper !== undefined }; // to only show picker on supported browsers
    } 

    handleChange = (color) => {
        this.props.onChange(color.hex);
    }

    togglePicker = () => {
        this.setState(prev => ({ showPicker: !prev.showPicker }));
    }

    closePicker = () => {
        this.setState({ showPicker: false });
    }

    openEyedropper = async () => {
        try {
            const eyeDropper = new window.EyeDropper();
            const result = await eyeDropper.open();
            this.props.onChange(result.sRGBHex);
        } catch (e) {

        }
    }

    render() {
        const { color, darkMode } = this.props;
        const { showPicker, eyedropperSupported } = this.state;

        return (
            <>
                <div className={`flex flex-row items-center w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium space-x-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
                    <i
                        className="fa fa-square fa-lg cursor-pointer"
                        style={{ color }}
                        onClick={this.togglePicker}
                    />
                    <input
                        className={`resize-none bg-transparent outline-none border-0 focus:outline-none focus:ring-0 focus:shadow-none border-none w-full font-fustat-medium text-base p-0 ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
                        value={color}
                        onChange={(e) => this.props.onChange(e.target.value)}
                        onFocus={() => this.setState({ showPicker: true })}
                    />
                    {eyedropperSupported && (
                        <i
                            className={`fa fa-eye-dropper fa-sm cursor-pointer hover:text-[#B5446E] transition-colors ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
                            onClick={this.openEyedropper}
                        />
                    )}
                </div>

                {showPicker && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={this.closePicker} />
                        <div className={`relative z-20 ${darkMode ? "sketch-picker-dark" : ""}`}>
                            <SketchPicker color={color} onChange={this.handleChange} />
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default ColourPicker;