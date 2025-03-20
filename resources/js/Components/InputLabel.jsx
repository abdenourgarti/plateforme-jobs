import { forwardRef } from 'react';

export default forwardRef(function InputLabel({ value, className = '', children, ...props }, ref) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 mb-1 ` + className} ref={ref}>
            {value ? value : children}
        </label>
    );
});