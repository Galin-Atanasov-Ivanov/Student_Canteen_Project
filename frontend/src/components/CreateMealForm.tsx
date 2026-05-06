import { useForm } from "react-hook-form";
import type { CreateMealDTO } from "../../../types/Meal";
import type { FC } from "react";

interface CreateMealFormProps {
    refresh: VoidFunction;
}

export const CreateMealForm: FC<CreateMealFormProps> = ({ refresh }) => {
    const { handleSubmit, register, formState: { errors } } = useForm<CreateMealDTO>();

    const createMeal = async (data: CreateMealDTO) => {
        await fetch("http://localhost:3002/meals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        refresh();
    };

    return (
        <div className="form-card">
            <p className="form-card__title">New Meal</p>
            <form onSubmit={handleSubmit(createMeal)}>
                <div className="form-card__fields">
                    <div className="form-card__row">
                        <div className="form-card__field">
                            <label className="form-card__label">Name</label>
                            <input className="input" placeholder="e.g. Grilled Chicken"
                                   {...register("name", { required: "Name is required" })} />
                            {errors.name && <span className="input-error">{errors.name.message}</span>}
                        </div>
                        <div className="form-card__field">
                            <label className="form-card__label">Price (€)</label>
                            <input className="input" placeholder="e.g. 4.50" type="number" step="0.01"
                                   {...register("price", { required: "Price is required" })} />
                            {errors.price && <span className="input-error">{errors.price.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="form-card__actions">
                    <button className="btn btn--primary" type="submit">Create Meal</button>
                    <button className="btn btn--ghost" type="button" onClick={refresh}>Cancel</button>
                </div>
            </form>
        </div>
    );
};