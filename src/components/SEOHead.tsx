import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const SEOHead = ({ 
  title = "ShamSy e.V. - Wiederaufbau Syriens durch nachhaltige Projekte",
  description = "ShamSy e.V. unterstützt den nachhaltigen Wiederaufbau Syriens durch Bildung, Gesundheit und Energieprojekte. Helfen Sie uns, Hoffnung zu schaffen.",
  keywords = "Syrien, Wiederaufbau, Hilfsorganisation, Spenden, Bildung, Gesundheit, nachhaltiger Wiederaufbau",
  ogImage = "/images/hero-destruction.jpg",
  canonicalUrl
}: SEOHeadProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // SEO Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', `${window.location.origin}${ogImage}`, true);
    updateMetaTag('og:url', `${window.location.origin}${location.pathname}`, true);
    
    // Twitter
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${window.location.origin}${ogImage}`);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const url = canonicalUrl || `${window.location.origin}${location.pathname}`;
    canonical.setAttribute('href', url);
    
    // Structured Data for Organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ShamSy e.V.",
      "alternateName": "Shams Syria",
      "url": window.location.origin,
      "logo": `${window.location.origin}/flag-syria-clean.jpeg`,
      "description": description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nürnberg",
        "postalCode": "90425",
        "addressCountry": "DE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+49-911-43332926",
        "email": "info.shamsyr@gmail.com",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.facebook.com/shamsy",
        "https://www.instagram.com/shamsy",
        "https://www.linkedin.com/company/shamsy"
      ]
    };

    // Update structured data
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);
    
  }, [title, description, keywords, ogImage, canonicalUrl, location.pathname]);

  return null;
};

export default SEOHead;