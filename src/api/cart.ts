import { get, post, put, del } from '../lib/http'
import { type OrderResponse } from './order';
export interface CartResponse {
    cartId: string;
    items: CartItemResponse[];
    totalAmount: number;
}

export interface CartItemResponse {
    id: string;
    productId: string;
    productName: string;
    currentPrice: number;
    quantity: number;
    subtotal: number;
}

export interface AddCartItemRequest {
    productId: string;
    quantity: number;
}

export interface UpdateCartItemRequest {
    quantity: number;
}

export const getCart = () => get<CartResponse>('/api/cart');
export const deleteCart = () => del<void>('/api/cart');
export const addCartItem = (data: AddCartItemRequest) => post<CartResponse>('/api/cart/items', data);
export const updateCartItem = (itemId: string, data: UpdateCartItemRequest) => put<CartResponse>(`/api/cart/items/${itemId}`, data);
export const deleteCartItem = (itemId: string) => del<CartResponse>(`/api/cart/items/${itemId}`);
export const checkoutCart = () => post<OrderResponse>('/api/cart/checkout');