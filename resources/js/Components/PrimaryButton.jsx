export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `justify-center flex items-center rounded-full border border-transparent bg-[#B5446E] px-8 py-2 text-md text-[#EBFFF2] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
