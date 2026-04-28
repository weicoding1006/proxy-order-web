import { get, post, put, del } from '../lib/http'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface CreateProductDto {
  name: string
  description: string
  price: number
  stock: number
  imageUrl?: string
}

export interface UpdateProductDto {
  name?: string
  description?: string
  price?: number
  stock?: number
  imageUrl?: string
}

export const fetchProducts = () =>
  get<Product[]>('/api/products')

export const fetchProductById = (id: number) =>
  get<Product>(`/api/products/${id}`)

export const createProduct = (data: CreateProductDto) =>
  post<Product>('/api/products', data)

export const updateProduct = (id: number, data: UpdateProductDto) =>
  put<Product>(`/api/products/${id}`, data)

export const deleteProduct = (id: number) =>
  del<void>(`/api/products/${id}`)
