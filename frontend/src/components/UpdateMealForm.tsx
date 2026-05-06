import { useForm } from "react-hook-form";
import type { CreateMealDTO, Meal } from "../../../types/Meal";
import type { FC } from "react";

interface UpdateMealFormProps {
    meal: Meal;
    refresh: VoidFunction;
}

export const UpdateMealForm: FC<UpdateMealFormProps> = ({ meal, refresh }) => {
    const { handleSubmit, register, formState: { errors } } = useForm<CreateMealDTO>({
        defaultValues: { name: meal.name, price: meal.price }
    });

    const updateMeal = async (data: CreateMealDTO) => {
        await fetch(`http://localhost:3002/meals/${meal.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        refresh();
    };

    return (
        <div className="form-card">
            <p className="form-card__title">Edit Meal</p>
            <form onSubmit={handleSubmit(updateMeal)}>
                <div className="form-card__fields">
                    <div className="form-card__row">
                        <div className="form-card__field">
                            <label className="form-card__label">Name</label>
                            <input className="input"
                                   {...register("name", { required: "Name is required" })} />
                            {errors.name && <span className="input-error">{errors.name.message}</span>}
                        </div>
                        <div className="form-card__field">
                            <label className="form-card__label">Price (€)</label>
                            <input className="input" type="number" step="0.01"
                                   {...register("price", { required: "Price is required" })} />
                            {errors.price && <span className="input-error">{errors.price.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="form-card__actions">
                    <button className="btn btn--primary" type="submit">Update Meal</button>
                    <button className="btn btn--ghost" type="button" onClick={refresh}>Cancel</button>
                </div>
            </form>
        </div>
    );
};