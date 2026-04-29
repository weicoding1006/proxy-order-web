import { get, post, put, del } from '../lib/http'

interface ProductResponseDto {
  id:string;
  name:string;
  description:string;
  price:number;
  stock:number;
  isActive:boolean;
  createTime:Date;
  updateTime:Date;
  imageUrls?:string[]
}

interface CreateProductDto {
  name:string;
  price:number;
  description?:string;
  stock?:number;
}

interface UpdateProductDto {
  name?:string;
  price?:number;
  description?:string;
  stock?:number; 
  isActive?:boolean;
}

export const fetchProducts = () =>
  get<ProductResponseDto[]>('/api/Product')

export const fetchProductById = (id: string) =>
  get<ProductResponseDto>(`/api/Product/${id}`)

export const createProduct = (data: CreateProductDto) =>
  post<ProductResponseDto>('/api/Product', data)

export const updateProduct = (id: string, data: UpdateProductDto) =>
  put<ProductResponseDto>(`/api/Product/${id}`, data)

export const deleteProduct = (id: string) =>
  del<void>(`/api/Product/${id}`)
