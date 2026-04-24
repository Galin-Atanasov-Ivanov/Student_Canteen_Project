import type { Meal } from "../../../types/Meal";
import type { FC } from "react";

interface MealListProps {
    meals: Meal[];
    toggleIsCreating: VoidFunction;
    updateMeal: (meal: Meal) => void;
    deleteMeal: (id: number) => void;
}

export const MealList: FC<MealListProps> = ({
                                                meals,
                                                toggleIsCreating,
                                                updateMeal,
                                                deleteMeal
                                            }) => {
    return (
        <div>
            <button onClick={toggleIsCreating}>Add Meal</button>

            <ul>
                {meals.map((meal) => (
                    <li key={meal.id}>
                        {meal.name} - {meal.price} лв.

                        <button onClick={() => updateMeal(meal)}>
                            Edit
                        </button>

                        <button onClick={() => deleteMeal(meal.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};