import type { Order } from "../../../types/Order";
import type { Student } from "../../../types/Student";
import type { Meal } from "../../../types/Meal";
import type { FC } from "react";

interface OrderListProps {
    orders: Order[];
    students: Student[];
    meals: Meal[];
    toggleIsCreating: VoidFunction;
    updateOrder: (order: Order) => void;
    deleteOrder: (id: number) => void;
}

export const OrderList: FC<OrderListProps> = ({
                                                  orders, students, meals, toggleIsCreating, updateOrder, deleteOrder
                                              }) => {
    const getStudentName = (id: number) =>
        students.find(s => s.id === id)?.name ?? `Student ${id}`;

    const getMealName = (id: number) =>
        meals.find(m => m.id === id)?.name ?? `Meal ${id}`;

    return (
        <div>
            <div className="page-header">
                <div>
                    <p className="page-header__eyebrow">Manage</p>
                    <h2 className="page-header__title">Orders</h2>
                </div>
                <div className="page-header__count">{orders.length} orders</div>
            </div>

            <button className="btn btn--primary" onClick={toggleIsCreating}>
                + Add Order
            </button>

            <ul className="data-list" style={{ marginTop: "var(--space-lg)" }}>
                {orders.length === 0 && (
                    <p className="data-list__empty">No orders yet. Add one to get started.</p>
                )}
                {orders.map((order) => (
                    <li className="data-list__item" key={order.id}>
                        <div className="data-list__info">
                            <span className="data-list__name">Order #{order.id}</span>
                            <span className="data-list__meta">{getStudentName(order.student_id)}</span>
                            <span className="data-list__meta">{getMealName(order.meal_id)}</span>
                            <span className="data-list__badge">
                                {new Date(order.order_date).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="data-list__actions">
                            <button className="btn btn--ghost btn--sm" onClick={() => updateOrder(order)}>
                                Edit
                            </button>
                            <button className="btn btn--danger btn--sm" onClick={() => deleteOrder(order.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};