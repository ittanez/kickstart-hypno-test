
import { supabaseUrl } from './config.ts';

export const getImageUrls = () => {
  const cacheBuster = `?v=${Date.now()}`;
  
  return {
    alainZenattiImageUrl: `${supabaseUrl}/storage/v1/object/public/images/alain-zenatti.jpg${cacheBuster}`,
    harmoniaImageUrl: `${supabaseUrl}/storage/v1/object/public/images/formation-harmonia.jpg${cacheBuster}`,
    hypnoBalladeImageUrl: `${supabaseUrl}/storage/v1/object/public/images/hypno-balade.jpg${cacheBuster}`
  };
};
