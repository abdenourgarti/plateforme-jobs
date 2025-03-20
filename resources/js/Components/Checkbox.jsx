export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-red-500 shadow-sm focus:ring-red-500 ' +
                className
            }
        />
    );
}