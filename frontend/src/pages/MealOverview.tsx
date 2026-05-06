import { useEffect, useState } from "react";
import type { Meal } from "../../../types/Meal";
import {CreateMealForm, MealList, UpdateMealForm} from "../components";

export const MealOverview = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [creatingMeal, setCreatingMeal] = useState<boolean>(false);
    const [mealToBeUpdated, setMealToBeUpdated] = useState<Meal | null>(null);

    const fetchMeals = async () => {
        const response = await fetch("http://localhost:3002/meals");
        const { data } = await response.json();
        setMeals(data);
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    const refreshMeals = () => {
        fetchMeals();
        setCreatingMeal(false);
        setMealToBeUpdated(null);
    };

    const deleteMeal = async (id: number) => {
        await fetch(`http://localhost:3002/meals/${id}`, { method: "DELETE" });
        fetchMeals();
    };

    return (
        <>

            {creatingMeal && <CreateMealForm refresh={refreshMeals} />}

            {mealToBeUpdated && (
                <UpdateMealForm meal={mealToBeUpdated} refresh={refreshMeals} />
            )}

            {!creatingMeal && !mealToBeUpdated && (
                <MealList
                    meals={meals}
                    toggleIsCreating={() => setCreatingMeal(true)}
                    updateMeal={setMealToBeUpdated}
                    deleteMeal={deleteMeal}
                />
            )}
        </>
    );
};