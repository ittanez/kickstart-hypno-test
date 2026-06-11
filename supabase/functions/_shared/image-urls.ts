
import { supabaseUrl } from './config.ts';

export const getImageUrls = () => {
  const cacheBuster = `?v=${Date.now()}`;
  
  return {
    alainZenattiImageUrl: `${supabaseUrl}/storage/v1/object/public/images/zenatti.webp${cacheBuster}`,
    harmoniaImageUrl: `${supabaseUrl}/storage/v1/object/public/images/harmonia.webp${cacheBuster}`,
    hypnoBalladeImageUrl: `${supabaseUrl}/storage/v1/object/public/images/balade.webp${cacheBuster}`
  };
};
