import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object | object[];
  /** Adds robots noindex (used for the 404 page and the admin login). */
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://vrmstructures.in/vrm-factory-building.jpg',
  ogType = 'website',
  schema,
  noindex = false
}: SEOProps) {
  // Search results show about 60 characters of a title: append the short brand only when
  // the page title does not already name it and there is room for it.
  const brand = " | VRM Structures";
  const siteTitle = /VRM Structures/i.test(title) || title.length + brand.length > 60 ? title : `${title}${brand}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      {canonicalUrl && !noindex && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="VRM Structures India Private Limited" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
