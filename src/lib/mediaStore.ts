import { useState, useEffect } from 'react';

const defaultImages: Record<string, string> = {
  mfg_metal_roof: "https://images.unsplash.com/photo-1620038650151-e1e19488a0e3?auto=format&fit=crop&q=80&w=800",
  mfg_rcc_roof: "/rcc_roof_real.jpg",
  mfg_ground_mount: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
  mfg_custom_structure: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
  mfg_carport: "https://images.unsplash.com/photo-1594818379496-da1e345b0cd5?auto=format&fit=crop&q=80&w=800",
  about_steel_coils: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
  about_steel_profiles: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  about_manufacturing: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
  shared_hero_banner: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
  about_laser_cnc: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
  about_hardware: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&q=80&w=800",
  about_quality: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
};

export function useMediaImage(key: string): string {
  const [imageUrl, setImageUrl] = useState<string>(() => {
    const stored = localStorage.getItem(`media_url_${key}`);
    return stored || defaultImages[key] || "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem(`media_url_${key}`);
      if (stored) {
        setImageUrl(stored);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('media_library_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('media_library_updated', handleStorageChange);
    };
  }, [key]);

  return imageUrl;
}
