"use client";

import useLocalStorage from './use-local-storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const addFavorite = (festivalId: string) => {
    if (!favorites.includes(festivalId)) {
      setFavorites([...favorites, festivalId]);
    }
  };

  const removeFavorite = (festivalId: string) => {
    setFavorites(favorites.filter(id => id !== festivalId));
  };

  const isFavorite = (festivalId: string) => {
    return favorites.includes(festivalId);
  };

  const toggleFavorite = (festivalId: string) => {
    if (isFavorite(festivalId)) {
      removeFavorite(festivalId);
    } else {
      addFavorite(festivalId);
    }
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
};
