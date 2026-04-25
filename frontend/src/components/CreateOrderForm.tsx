import { useForm } from "react-hook-form";
import type { CreateOrderDTO } from "../../../types/Order";
import type { FC } from "react";

interface CreateOrderFormProps {
    refresh: VoidFunction;
}

export const CreateOrderForm: FC<CreateOrderFormProps> = ({ refresh }) => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<CreateOrderDTO>();

    const createOrder = async (data: CreateOrderDTO) => {
        await fetch("http://localhost:3002/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        refresh();
    };

    return (
        <form onSubmit={handleSubmit(createOrder)}>
            <input
                placeholder="Student ID"
                type="number"
                {...register("student_id", { required: "Student is required" })}
            />
            {errors.student_id && <span>{errors.student_id.message}</span>}

            <input
                placeholder="Meal ID"
                type="number"
                {...register("meal_id", { required: "Meal is required" })}
            />
            {errors.meal_id && <span>{errors.meal_id.message}</span>}

            <input
                type="date"
                {...register("order_date", { required: "Date is required" })}
            />
            {errors.order_date && <span>{errors.order_date.message}</span>}

            <button type="submit">Create Order</button>
        </form>
    );
};