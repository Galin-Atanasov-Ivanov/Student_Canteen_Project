import type { Meal } from "../../../types/Meal";
import type { FC } from "react";

interface MealListProps {
    meals: Meal[];
    toggleIsCreating: VoidFunction;
    updateMeal: (meal: Meal) => void;
    deleteMeal: (id: number) => void;
}

export const MealList: FC<MealListProps> = ({ meals, toggleIsCreating, updateMeal, deleteMeal }) => {
    return (
        <div>
            <div className="page-header">
                <div>
                    <p className="page-header__eyebrow">Manage</p>
                    <h2 className="page-header__title">Meals</h2>
                </div>
                <div className="page-header__count">{meals.length} meals</div>
            </div>

            <button className="btn btn--primary" onClick={toggleIsCreating}>
                + Add Meal
            </button>

            <ul className="data-list" style={{ marginTop: "var(--space-lg)" }}>
                {meals.length === 0 && (
                    <p className="data-list__empty">No meals yet. Add one to get started.</p>
                )}
                {meals.map((meal) => (
                    <li className="data-list__item" key={meal.id}>
                        <div className="data-list__info">
                            <span className="data-list__name">{meal.name}</span>
                            <span className="data-list__badge">{meal.price} €</span>
                        </div>
                        <div className="data-list__actions">
                            <button className="btn btn--ghost btn--sm" onClick={() => updateMeal(meal)}>
                                Edit
                            </button>
                            <button className="btn btn--danger btn--sm" onClick={() => deleteMeal(meal.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};