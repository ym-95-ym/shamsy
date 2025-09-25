import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Language detection from route
function getLanguageFromPath(pathname: string): 'de' | 'en' | 'ar' {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/ar')) return 'ar';
  return 'de';
}

// Generic content hook
export function useContent<T>(contentFile: string): T | null {
  const [content, setContent] = useState<T | null>(null);
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // In a real implementation, you would fetch from /content/${contentFile}.json
        // For now, we'll use dynamic imports
        const module = await import(`../content/${contentFile}.json`);
        setContent(module.default);
      } catch (error) {
        console.error(`Failed to load content from ${contentFile}:`, error);
        setContent(null);
      }
    };

    loadContent();
  }, [contentFile]);

  return content;
}

// Specific hooks for different content types
export function useHomeContent() {
  const content = useContent<any>('homeContent');
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  if (!content) return null;

  return {
    hero: content.hero?.[language],
    quote: content.quote?.[language],
    overview: content.overview?.[language],
    language
  };
}

export function useHistoryContent() {
  const content = useContent<any>('historyContent');
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  if (!content) return null;

  return {
    ...content[language],
    language
  };
}

export function useGetInvolvedContent() {
  const content = useContent<any>('getInvolvedContent');
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  if (!content) return null;

  return {
    ...content[language],
    language
  };
}

export function useProjectsContent() {
  const content = useContent<any>('projectsContent');
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  if (!content) return null;

  return {
    ...content[language],
    language
  };
}

export function usePastProjectsContent() {
  const content = useContent<any>('pastProjectsContent');
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  if (!content) return null;

  return {
    ...content[language],
    language
  };
}

export function useDonationsContent() {
  const content = useContent<any>('donationsContent');
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  if (!content) return null;

  return {
    ...content[language],
    language
  };
}

export function useContactContent() {
  const content = useContent<any>('contactContent');
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  if (!content) return null;

  return {
    ...content[language],
    language
  };
}