import { useForm } from "react-hook-form";
import type { CreateMealDTO } from "../../../types/Meal";
import type { FC } from "react";

interface CreateMealFormProps {
    refresh: VoidFunction;
}

export const CreateMealForm: FC<CreateMealFormProps> = ({ refresh }) => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<CreateMealDTO>();

    const createMeal = async (data: CreateMealDTO) => {
        await fetch("http://localhost:3000/meals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        refresh();
    };

    return (
        <form onSubmit={handleSubmit(createMeal)}>
            <input
                placeholder="Meal name"
                {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span>{errors.name.message}</span>}

            <input
                placeholder="Price"
                type="number"
                {...register("price", { required: "Price is required" })}
            />
            {errors.price && <span>{errors.price.message}</span>}

            <button type="submit">Create Meal</button>
        </form>
    );
};