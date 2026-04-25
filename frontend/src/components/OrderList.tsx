import type { Order } from "../../../types/Order";
import type { FC } from "react";

interface OrderListProps {
    orders: Order[];
    toggleIsCreating: VoidFunction;
    updateOrder: (order: Order) => void;
    deleteOrder: (id: number) => void;
}

export const OrderList: FC<OrderListProps> = ({
                                                  orders,
                                                  toggleIsCreating,
                                                  updateOrder,
                                                  deleteOrder
                                              }) => {
    return (
        <div>
            <button onClick={toggleIsCreating}>Add Order</button>

            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        Student: {order.student_id} | Meal: {order.meal_id} | Date: {new Date(order.order_date).toLocaleDateString()}

                        <button onClick={() => updateOrder(order)}>
                            Edit
                        </button>

                        <button onClick={() => deleteOrder(order.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};