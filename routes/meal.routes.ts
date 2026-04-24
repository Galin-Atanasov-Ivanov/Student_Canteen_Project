import { Router } from 'express';
import {MealModel} from "../models/meal.model";
import {MealService} from "../services/meal.service";
import {MealController} from "../controllers/meal.controller";
import pool from "../config/database";


const mealModel = new MealModel(pool);
const mealService = new MealService(mealModel);
const mealController = new MealController(mealService);

const MealRoutes = Router();

MealRoutes.get('/meals', mealController.getAll);
MealRoutes.get('/meals/:id', mealController.getById);
MealRoutes.post('/meals', mealController.create);
MealRoutes.put('/meals/:id', mealController.update);
MealRoutes.delete('/meals/:id', mealController.delete);

export default MealRoutes;
