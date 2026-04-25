import { useForm } from "react-hook-form";
import type { CreateOrderDTO, Order } from "../../../types/Order";
import type { FC } from "react";

interface UpdateOrderFormProps {
    order: Order;
    refresh: VoidFunction;
}

export const UpdateOrderForm: FC<UpdateOrderFormProps> = ({ order, refresh }) => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<CreateOrderDTO>({
        defaultValues: {
            student_id: order.student_id,
            meal_id: order.meal_id,
            order_date: order.order_date
        }
    });

    const updateOrder = async (data: CreateOrderDTO) => {
        await fetch(`http://localhost:3002/orders/${order.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        refresh();
    };

    return (
        <form onSubmit={handleSubmit(updateOrder)}>
            <input type="number" {...register("student_id")} />
            {errors.student_id && <span>{errors.student_id.message}</span>}
            <input type="number" {...register("meal_id")} />
            <input type="date" {...register("order_date")} />

            <button type="submit">Update Order</button>
            <button type="button" onClick={refresh}>Cancel</button>
        </form>
    );
};