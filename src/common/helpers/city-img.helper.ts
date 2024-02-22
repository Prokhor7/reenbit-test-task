export const getPathToCityImg = (city: string) => {
  return `/assets/cities/images/${city.toLowerCase().replace(/ /g, "_")}.webp`;
};
