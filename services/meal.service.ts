import { MealModel } from '../models/meal.model';
import {CreateMealDTO, Meal} from '../types/Meal';

export class MealService {
    constructor(private mealModel: MealModel) {}

    async getAllMeals(): Promise<Meal[]> {
        return await this.mealModel.findAll();
    }

    async getMealById(id: number): Promise<Meal | undefined> {
        return await this.mealModel.findById(id);
    }

    async createMeal(data: CreateMealDTO): Promise<Meal> {
        return await this.mealModel.create(data);
    }

    async updateMeal(id: number, data: Partial<Meal>): Promise<Meal | undefined> {
        return await this.mealModel.update(id, data);
    }

    async deleteMeal(id: number): Promise<boolean> {
        return await this.mealModel.delete(id);
    }
}
