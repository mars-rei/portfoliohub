export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-2 border-[#ebfff2] bg-transparent focus:outline-none focus:ring-0 focus:border-[#EBFFF2] focus:ring-offset-0 checked:bg-[#B5446E] text-[#B5446E]' +
                className
            }
        />
    );
}
