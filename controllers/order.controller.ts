import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

interface IdParams {
    id: string;
}

export class OrderController {
    constructor(private orderService: OrderService) {}

    getAll = async (req: Request, res: Response): Promise<void> => {
        const orders = await this.orderService.getAllOrders();
        res.json({ message: 'Orders found', data: orders });
    };

    getById = async (req: Request<IdParams>, res: Response): Promise<void> => {
        const id= Number(req.params.id);
        const order = await this.orderService.getOrderById(id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json({ message: 'Order found', data: order });
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const { student_id, meal_id, order_date } = req.body;
        const order = await this.orderService.createOrder({ student_id, meal_id, order_date });
        res.status(201).json({ message: 'Order created', data: order });
    };

    update = async (req: Request<IdParams>, res: Response): Promise<void> => {
        const id= Number(req.params.id);
        const order = await this.orderService.updateOrder(id, req.body);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json({ message: 'Order updated', data: order });
    };

    delete = async (req: Request<IdParams>, res: Response): Promise<void> => {
        const id= Number(req.params.id);
        const deleted = await this.orderService.deleteOrder(id);
        if (!deleted) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json({ message: 'Order deleted' });
    };
}
