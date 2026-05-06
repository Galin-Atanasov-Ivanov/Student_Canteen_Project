import { useForm } from "react-hook-form";
import type { CreateOrderDTO, Order } from "../../../types/Order";
import type { FC } from "react";

interface UpdateOrderFormProps {
    order: Order;
    refresh: VoidFunction;
}

export const UpdateOrderForm: FC<UpdateOrderFormProps> = ({ order, refresh }) => {
    const { handleSubmit, register, formState: { errors } } = useForm<CreateOrderDTO>({
        defaultValues: {
            student_id: order.student_id,
            meal_id: order.meal_id,
            order_date: order.order_date
        }
    });

    const updateOrder = async (data: CreateOrderDTO) => {
        await fetch(`http://localhost:3002/orders/${order.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        refresh();
    };

    return (
        <div className="form-card">
            <p className="form-card__title">Edit Order</p>
            <form onSubmit={handleSubmit(updateOrder)}>
                <div className="form-card__fields">
                    <div className="form-card__row">
                        <div className="form-card__field">
                            <label className="form-card__label">Student ID</label>
                            <input className="input" type="number"
                                   {...register("student_id")} />
                            {errors.student_id && <span className="input-error">{errors.student_id.message}</span>}
                        </div>
                        <div className="form-card__field">
                            <label className="form-card__label">Meal ID</label>
                            <input className="input" type="number"
                                   {...register("meal_id")} />
                            {errors.meal_id && <span className="input-error">{errors.meal_id.message}</span>}
                        </div>
                        <div className="form-card__field">
                            <label className="form-card__label">Order Date</label>
                            <input className="input" type="date"
                                   {...register("order_date")} />
                            {errors.order_date && <span className="input-error">{errors.order_date.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="form-card__actions">
                    <button className="btn btn--primary" type="submit">Update Order</button>
                    <button className="btn btn--ghost" type="button" onClick={refresh}>Cancel</button>
                </div>
            </form>
        </div>
    );
};