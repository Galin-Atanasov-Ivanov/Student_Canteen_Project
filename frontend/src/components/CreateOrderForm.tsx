import { useForm } from "react-hook-form";
import type { CreateOrderDTO } from "../../../types/Order";
import type { FC } from "react";

interface CreateOrderFormProps {
    refresh: VoidFunction;
}

export const CreateOrderForm: FC<CreateOrderFormProps> = ({ refresh }) => {
    const { handleSubmit, register, formState: { errors } } = useForm<CreateOrderDTO>();

    const createOrder = async (data: CreateOrderDTO) => {
        await fetch("http://localhost:3002/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        refresh();
    };

    return (
        <div className="form-card">
            <p className="form-card__title">New Order</p>
            <form onSubmit={handleSubmit(createOrder)}>
                <div className="form-card__fields">
                    <div className="form-card__row">
                        <div className="form-card__field">
                            <label className="form-card__label">Student ID</label>
                            <input className="input" type="number" placeholder="e.g. 1"
                                   {...register("student_id", { required: "Student is required" })} />
                            {errors.student_id && <span className="input-error">{errors.student_id.message}</span>}
                        </div>
                        <div className="form-card__field">
                            <label className="form-card__label">Meal ID</label>
                            <input className="input" type="number" placeholder="e.g. 1"
                                   {...register("meal_id", { required: "Meal is required" })} />
                            {errors.meal_id && <span className="input-error">{errors.meal_id.message}</span>}
                        </div>
                        <div className="form-card__field">
                            <label className="form-card__label">Order Date</label>
                            <input className="input" type="date"
                                   {...register("order_date", { required: "Date is required" })} />
                            {errors.order_date && <span className="input-error">{errors.order_date.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="form-card__actions">
                    <button className="btn btn--primary" type="submit">Create Order</button>
                    <button className="btn btn--ghost" type="button" onClick={refresh}>Cancel</button>
                </div>
            </form>
        </div>
    );
};