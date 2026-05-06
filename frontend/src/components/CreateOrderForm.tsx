import { useForm, useWatch } from "react-hook-form";
import type { CreateOrderDTO } from "../../../types/Order";
import type { Student } from "../../../types/Student";
import type { Meal } from "../../../types/Meal";
import type { FC } from "react";

interface CreateOrderFormProps {
    students: Student[];
    meals: Meal[];
    refresh: VoidFunction;
}

export const CreateOrderForm: FC<CreateOrderFormProps> = ({ students, meals, refresh }) => {
    const { handleSubmit, register, control, formState: { errors } } = useForm<CreateOrderDTO>();

    const selectedStudentId = Number(useWatch({ control, name: "student_id" }));
    const selectedMealId = Number(useWatch({ control, name: "meal_id" }));

    const selectedStudent = students.find(s => s.id === selectedStudentId) ?? null;
    const selectedMeal = meals.find(m => m.id === selectedMealId) ?? null;

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

                        {/* Student dropdown */}
                        <div className="form-card__field">
                            <label className="form-card__label">Student</label>
                            <select className="input"
                                    {...register("student_id", { required: "Student is required" })}>
                                <option value="">— Select a student —</option>
                                {students.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            {errors.student_id && <span className="input-error">{errors.student_id.message}</span>}

                            {selectedStudent && (
                                <div className="form-preview">
                                    <span className="form-preview__label">Name</span>
                                    <span className="form-preview__value">{selectedStudent.name}</span>
                                    <span className="form-preview__label">Faculty No.</span>
                                    <span className="form-preview__value">{selectedStudent.faculty_number}</span>
                                </div>
                            )}
                        </div>

                        {/* Meal dropdown */}
                        <div className="form-card__field">
                            <label className="form-card__label">Meal</label>
                            <select className="input"
                                    {...register("meal_id", { required: "Meal is required" })}>
                                <option value="">— Select a meal —</option>
                                {meals.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                            {errors.meal_id && <span className="input-error">{errors.meal_id.message}</span>}

                            {selectedMeal && (
                                <div className="form-preview">
                                    <span className="form-preview__label">Name</span>
                                    <span className="form-preview__value">{selectedMeal.name}</span>
                                    <span className="form-preview__label">Price</span>
                                    <span className="form-preview__value">{selectedMeal.price} €</span>
                                </div>
                            )}
                        </div>

                        {/* Date */}
                        <div className="form-card__field">
                            <label className="form-card__label">Order Date</label>
                            <input className="input" type="date" lang="en-GB"
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