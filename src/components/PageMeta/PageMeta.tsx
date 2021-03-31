import React, { FC, memo } from 'react';
import { Helmet } from 'react-helmet';

export type Props = {
  title?: string;
  description?: string;
  image?: string;
};

const cutTags = (text = '') => text.replace(/<\/?.+?>/gi, '');

const prepareData = ({ title, description, image }: Props) => ({
  title: cutTags(title),
  description: cutTags(description).substr(0, 250),
  image
});

const PageMeta: FC<Props> = (props: Props) => {
  const { title, description, image } = prepareData(props);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      {Boolean(description) && (
        <meta name="description" content={description} />
      )}
      {Boolean(description) && (
        <meta property="og:description" content={description} />
      )}
      {Boolean(description) && (
        <meta property="twitter:description" content={description} />
      )}
      {Boolean(image) && <meta property="og:image" content={image} />}
    </Helmet>
  );
};

const WrappedMeta = memo(PageMeta);
export { WrappedMeta as PageMeta };
