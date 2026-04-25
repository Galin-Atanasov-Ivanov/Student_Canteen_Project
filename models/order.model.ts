import {CreateOrderDTO, Order} from '../types/Order';
import {Pool, ResultSetHeader, RowDataPacket} from "mysql2/promise";

export class OrderModel {
    constructor(private db: Pool) {}

    async findAll(): Promise<Order[]> {
        const [rows] = await this.db.query<RowDataPacket[]>
        ("SELECT * FROM orders");
        return rows as Order[];
    }

    async findById(id: number): Promise<Order | undefined> {
        const [rows] = await this.db.query<RowDataPacket[]>
        ("SELECT * FROM orders WHERE id =?", [id]);
        return rows[0] as Order;
    }

    async create(order: CreateOrderDTO): Promise<Order> {
        const [result] = await this.db.query<ResultSetHeader>(
            "INSERT INTO orders(id,student_id,meal_id,order_date) VALUES (NULL,?,?,?)",
            [order.student_id,order.meal_id,order.order_date]
        );

        return {
            id: result.insertId,
            student_id: order.student_id,
            meal_id: order.meal_id,
            order_date: order.order_date
        }
    }

    async update(id: number, data: Partial<Order>): Promise<Order | undefined> {
        const existing = await this.findById(id);
        if (!existing) {
            return undefined;
        }

        const updated={...existing,...data};
        await this.db.query<ResultSetHeader>(
            "UPDATE orders SET student_id =?, meal_id =?, order_date = ? WHERE id = ?",
            [updated.student_id, updated.meal_id, updated.order_date, id]
        )

        return updated;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>(
            "DELETE FROM orders WHERE id = ?", [id]
        )
        return result.affectedRows > 0;
    }
}