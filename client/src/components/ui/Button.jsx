import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  children,
  to,
  href,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'whatsapp'
  size = 'md', // 'sm', 'md', 'lg'
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const btnClass = `btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''} ${className}`;

  const content = (
    <>
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="btn-icon-left">{icon}</span>}
          <span className="btn-text">{children}</span>
          {icon && iconPosition === 'right' && <span className="btn-icon-right">{icon}</span>}
        </>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={btnClass} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={btnClass} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={btnClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
