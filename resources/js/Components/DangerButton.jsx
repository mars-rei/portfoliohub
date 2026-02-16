export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `justify-center flex items-center rounded-full border border-transparent bg-[#872328] px-8 py-2 text-md text-[#EBFFF2] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
