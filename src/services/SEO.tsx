import React from 'react';
import { Helmet } from 'react-helmet';

function SEO({ title, description, author, keywords, image, url }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="XGirl - Classificados Eróticos, Escort e Acompanhantes de luxo em Portugal" content={description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      {/* Outras meta tags */}
    </Helmet>
  );
}

export default SEO;
