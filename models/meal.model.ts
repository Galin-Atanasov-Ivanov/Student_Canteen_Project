import {CreateMealDTO, Meal} from '../types/Meal';
import {Pool, ResultSetHeader, RowDataPacket} from "mysql2/promise";

export class MealModel {
    constructor(private db: Pool) {}

    async findAll(): Promise<Meal[]> {
        const [rows] = await this.db.query<RowDataPacket[]>
        ("SELECT * FROM meal");
        return rows as Meal[];
    }

    async findById(id: number): Promise<Meal | undefined> {
        const [rows] = await this.db.query<RowDataPacket[]>
        ("SELECT * FROM meal WHERE id =?", [id]);
        return rows[0] as Meal;
    }

    async create(meal: CreateMealDTO): Promise<Meal> {
        const [result] = await this.db.query<ResultSetHeader>(
            "INSERT INTO meal(id,name,price) VALUES (NULL,?,?)",
            [meal.name,meal.price]
        );

        return {
            id: result.insertId,
            name: meal.name,
            price: meal.price
        }
    }

    async update(id: number, data: Partial<Meal>): Promise<Meal | undefined> {
        const existing = await this.findById(id);
        if (!existing) {
            return undefined;
        }

        const updated={...existing,...data};
        await this.db.query<ResultSetHeader>(
            "UPDATE meal SET name =?, price =? WHERE id = ?",
            [updated.name, updated.price, id]
        )

        return updated;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>(
            "DELETE FROM meal WHERE id = ?", [id]
        )
        return result.affectedRows > 0;
    }
}