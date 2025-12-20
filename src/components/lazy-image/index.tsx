import React, { useState, Fragment, useEffect } from 'react';

/**
 * LazyImage component.
 *
 * @param {string} placeholder The placeholder image URL.
 * @param {string} src The image URL.
 * @param {string} alt The alt text for the image.
 * @param {object} rest Additional props for the image element.
 *
 * @returns {ReactElement} The LazyImage component.
 */
const LazyImage: React.FC<{
  placeholder: React.ReactElement;
  src: string;
  alt: string;
  // additional img props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rest?: React.ImgHTMLAttributes<HTMLImageElement>;
}> = ({ placeholder, src, alt, ...rest }): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;

    imageToLoad.onload = () => {
      setLoading(false);
    };
  }, [src]);

  return <Fragment>{loading ? placeholder : <img src={src} alt={alt} {...(rest as any)} />}</Fragment>;
};

export default LazyImage;
