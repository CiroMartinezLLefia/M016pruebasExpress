import { buildUrl } from './api';

const WINE_FALLBACKS = [
  'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=1200&q=80'
];

const BEER_FALLBACKS = [
  'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80'
];

function chooseBySeed(seed, values) {
  if (!seed) return values[0];

  let hash = 0;
  const source = String(seed);

  for (let i = 0; i < source.length; i += 1) {
    hash = (hash << 5) - hash + source.charCodeAt(i);
    hash |= 0;
  }

  return values[Math.abs(hash) % values.length];
}

export function resolveMediaUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return buildUrl(path);
}

export function getProductImage(product, tipo = '') {
  const ownImage = resolveMediaUrl(product?.imagen);
  if (ownImage) return ownImage;

  const fallbackSet = tipo === 'chela' ? BEER_FALLBACKS : WINE_FALLBACKS;
  return chooseBySeed(product?._id || product?.name || product?.nombre, fallbackSet);
}

export function getUserAvatar(user) {
  const ownPhoto = resolveMediaUrl(user?.foto);
  if (ownPhoto) return ownPhoto;

  const seed = encodeURIComponent(user?.email || user?.nombre || 'vinacoteca');
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${seed}&backgroundColor=fde68a,b6e3f4,c0aede`;
}
