import { useForm } from "react-hook-form";
import type { CreateMealDTO, Meal } from "../../../types/Meal";
import type { FC } from "react";

interface UpdateMealFormProps {
    meal: Meal;
    refresh: VoidFunction;
}

export const UpdateMealForm: FC<UpdateMealFormProps> = ({ meal, refresh }) => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<CreateMealDTO>({
        defaultValues: {
            name: meal.name,
            price: meal.price
        }
    });

    const updateMeal = async (data: CreateMealDTO) => {
        await fetch(`http://localhost:3002/meals/${meal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        refresh();
    };

    return (
        <form onSubmit={handleSubmit(updateMeal)}>
            <input
                {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span>{errors.name.message}</span>}

            <input
                type="number"
                {...register("price", { required: "Price is required" })}
            />
            {errors.price && <span>{errors.price.message}</span>}

            <button type="submit">Update Meal</button>
            <button type="button" onClick={refresh}>Cancel</button>
        </form>
    );
};