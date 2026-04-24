import { Request, Response } from 'express';
import { MealService } from '../services/meal.service';

interface IdParams {
    id: string;
}

export class MealController {
    constructor(private mealService: MealService) {}

    getAll = async (req: Request, res: Response): Promise<void> => {
        const meals = await this.mealService.getAllMeals();
        res.json({ message: 'Meals found', data: meals });
    };

    getById = async (req: Request<IdParams>, res: Response): Promise<void> => {
        const id=Number(req.params.id);
        const meal = await this.mealService.getMealById(id);
        if (!meal) {
            res.status(404).json({ message: 'Meal not found' });
            return;
        }
        res.json({ message: 'Meal found', data: meal });
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const { name, price } = req.body;
        const meal = await this.mealService.createMeal({ name, price });
        res.status(201).json({ message: 'Meal created', data: meal });
    };

    update = async (req: Request<IdParams>, res: Response): Promise<void> => {
        const id=Number(req.params.id);
        const meal = await this.mealService.updateMeal(id, req.body);
        if (!meal) {
            res.status(404).json({ message: 'Meal not found' });
            return;
        }
        res.json({ message: 'Meal updated', data: meal });
    };

    delete = async (req: Request<IdParams>, res: Response): Promise<void> => {
        const id=Number(req.params.id);
        const deleted = await this.mealService.deleteMeal(id);
        if (!deleted) {
            res.status(404).json({ message: 'Meal not found' });
            return;
        }
        res.json({ message: 'Meal deleted' });
    };
}
