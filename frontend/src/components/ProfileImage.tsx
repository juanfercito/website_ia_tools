import React from 'react';

interface ProfileImageProps {
  src: string;
  alt?: string;
  containerSize?: 'small' | 'medium' | 'large';
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt = 'Profile',
  containerSize = 'medium',
  className = '',
}) => {
  const DEFAULT_AVATAR = '/default-avatar.webp';
  
  // Definir tamaños de contenedor
  const containerSizes = {
    small: '40px',
    medium: '100px',
    large: '150px'
  };

  // Definir tamaños de imagen según el contenedor
  const imageSizes = {
    small: 40,
    medium: 100,
    large: 150
  };

  // Estilos del contenedor
  const containerStyle: React.CSSProperties = {
    width: containerSizes[containerSize],
    height: containerSizes[containerSize],
    borderRadius: '50%',
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0
  };

  // Estilos de la imagen
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0
  };

  // Calcular el tamaño óptimo para la imagen basado en el contenedor
  const getOptimizedImageUrl = (url: string) => {
    if (!url || url === DEFAULT_AVATAR) return DEFAULT_AVATAR;
    
    try {
      const baseUrl = new URL(url);
      // Añadir parámetros para el tamaño y timestamp
      baseUrl.searchParams.set('size', imageSizes[containerSize].toString());
      baseUrl.searchParams.set('v', Date.now().toString());
      return baseUrl.toString();
    } catch (e) {
      // Si la URL no es válida, devolver la URL original con timestamp
      return `${url}?size=${imageSizes[containerSize]}&v=${Date.now()}`;
    }
  };

  return (
    <div style={containerStyle} className={className}>
      <img
        src={getOptimizedImageUrl(src)}
        alt={alt}
        style={imageStyle}
        width={imageSizes[containerSize]}
        height={imageSizes[containerSize]}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (!target.src.endsWith(DEFAULT_AVATAR)) {
            target.src = DEFAULT_AVATAR;
          }
        }}
      />
    </div>
  );
};

export default ProfileImage; 