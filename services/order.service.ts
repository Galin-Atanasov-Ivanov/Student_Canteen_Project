import { OrderModel } from '../models/order.model';
import {CreateOrderDTO, Order} from '../types/Order';

export class OrderService {
    constructor(private orderModel: OrderModel) {}

    async getAllOrders(): Promise<Order[]> {
        return await this.orderModel.findAll();
    }

    async getOrderById(id: number): Promise<Order | undefined> {
        return await this.orderModel.findById(id);
    }

    async createOrder(data: CreateOrderDTO): Promise<Order> {
        return await this.orderModel.create(data);
    }

    async updateOrder(id: number, data: Partial<Order>): Promise<Order | undefined> {
        return await this.orderModel.update(id, data);
    }

    async deleteOrder(id: number): Promise<boolean> {
        return await this.orderModel.delete(id);
    }
}
