import { get, post, put} from '../lib/http'

// 定義陣列內部的單一商品項目結構
interface OrderItemRequest {
  productId: string;  // 假設商品 ID 是字串 (如果您的系統是數字，請改為 number)
  quantity: number;   // 數量通常是數字
}

// 定義主要的建立訂單請求結構
interface CreateOrderRequest {
  items: OrderItemRequest[]; // 宣告 items 是一個包含 OrderItemRequest 的陣列
}

export interface OrderResponse {
  id: string; // uuid
  userId: string | null;
  totalAmount: number; // double
  status: string | null;
  createdAt: string; // date-time
  items: OrderItemResponse[] | null;
}

interface OrderItemResponse {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  name: string;
}

export const createOrder = (data: CreateOrderRequest) => post('/api/orders', data);
export const fetchOrders = () => get<OrderResponse[]>('/api/orders');
export const fetchOrderById = (id: string) => get<OrderResponse>(`/api/orders/${id}`);
export const getAllOrder = () => get<OrderResponse[]>('/api/orders/all');

export const STATUS_INT: Record<string, number> = {
  Pending: 0,
  Confirmed: 1,
  Shipped: 2,
  Completed: 3,
  Cancelled: 4,
}

export const getStatusEnums = () => get<string[]>('/api/orders/status/enums');
export const updateOrderStatus = (id: string, status: number) => put<OrderResponse>(`/api/orders/${id}/status`, { status });