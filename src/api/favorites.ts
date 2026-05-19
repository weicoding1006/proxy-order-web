import { get, post, del } from '../lib/http'
export interface FavoriteResponse {
    productId: string;
    productName: string;
    price: number;
    coverImageUrl: string;
    favoritedAt: string;
}

export const getFavorites = () => get<FavoriteResponse[]>('/api/favorites');
export const addFavorite = (productId: string) => post(`/api/favorites/${productId}`);
export const deleteFavorite = (productId: string) => del(`/api/favorites/${productId}`);