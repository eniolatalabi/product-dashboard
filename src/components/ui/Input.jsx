
const Input = ({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required = false,
    className = '',
    ...props
  }) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          type={type}
          id={name}
          name={name}
          className={`w-full rounded-md border ${
            error ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };
  
  export default Input;