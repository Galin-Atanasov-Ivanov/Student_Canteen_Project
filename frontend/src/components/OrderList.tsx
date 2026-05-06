import type { Order } from "../../../types/Order";
import type { FC } from "react";

interface OrderListProps {
    orders: Order[];
    toggleIsCreating: VoidFunction;
    updateOrder: (order: Order) => void;
    deleteOrder: (id: number) => void;
}

export const OrderList: FC<OrderListProps> = ({ orders, toggleIsCreating, updateOrder, deleteOrder }) => {
    return (
        <div>
            <div className="page-header">
                <div>
                    <p className="page-header__eyebrow">Manage</p>
                    <h2 className="page-header__title">Orders</h2>
                </div>
                <div className="page-header__count">{orders.length} items</div>
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
                            <span className="data-list__meta">Student {order.student_id}</span>
                            <span className="data-list__meta">Meal {order.meal_id}</span>
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