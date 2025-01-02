import React from 'react';

interface MaterialIconOutlinedProps {
  iconName: string;
  iconClassName?: string;
  className?: string;
  href?: string;
}

const MaterialIconOutlined: React.FC<MaterialIconOutlinedProps> = ({
  iconName,
  iconClassName,
  className,
  href,
}) => {
  return href ? (
    <a href={href} className={className}>
      <span className={`material-symbols-outlined ${iconClassName}`}>
        {iconName}
      </span>
    </a>
  ) : (
    <span
      className={`material-symbols-outlined ${iconClassName ? iconClassName : ''}`}
    >
      {iconName}
    </span>
  );
};

export default MaterialIconOutlined;
