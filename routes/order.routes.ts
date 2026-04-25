import { Router } from 'express';
import {OrderModel} from "../models/order.model";
import {OrderService} from "../services/order.service";
import {OrderController} from "../controllers/order.controller";
import pool from "../config/database";


const orderModel = new OrderModel(pool);
const orderService = new OrderService(orderModel);
const orderController = new OrderController(orderService);

const OrderRoutes = Router();

OrderRoutes.get('/orders', orderController.getAll);
OrderRoutes.get('/orders/:id', orderController.getById);
OrderRoutes.post('/orders', orderController.create);
OrderRoutes.put('/orders/:id', orderController.update);
OrderRoutes.delete('/orders/:id', orderController.delete);

export default OrderRoutes;
