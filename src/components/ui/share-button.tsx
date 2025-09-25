import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export const ShareButton = ({ 
  url = window.location.href,
  title = document.title,
  description = '',
  variant = 'outline',
  size = 'default'
}: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link kopiert!",
        description: "Der Link wurde in die Zwischenablage kopiert.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Fehler",
        description: "Link konnte nicht kopiert werden.",
        variant: "destructive",
      });
    }
  };

  const openShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Native Web Share API support
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="shamsy-transition">
          <Share2 className="w-4 h-4 mr-2" />
          Teilen
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {navigator.share && (
          <DropdownMenuItem onClick={handleNativeShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Teilen
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => openShare(shareLinks.facebook)}>
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShare(shareLinks.twitter)}>
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openShare(shareLinks.linkedin)}>
          <Linkedin className="w-4 h-4 mr-2" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard}>
          {copied ? (
            <Check className="w-4 h-4 mr-2 text-shamsy-primary" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          Link kopieren
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;