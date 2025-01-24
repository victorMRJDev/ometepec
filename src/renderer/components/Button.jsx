const Button = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantStyles = {
    primary: 'bg-pantone207C text-white hover:bg-pantone207C-20 focus:ring-blue-500',
    secondary: 'bg-pantone465C text-white hover:bg-gray-600 focus:ring-gray-500',
    danger: 'bg-pantone468C text-white hover:bg-red-600 focus:ring-red-500'
  }

  const sizeStyles = {
    sm: 'text-sm px-3 py-1',
    md: 'text-xl px-4 py-2',
    lg: 'text-lg px-6 py-3'
  }

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`

  return (
    <button type={type} onClick={onClick} className={styles} disabled={disabled} {...props}>
      {Icon && (
        <span className="mr-2">
          <Icon />
        </span>
      )}
      {label}
    </button>
  )
}

export default Button
