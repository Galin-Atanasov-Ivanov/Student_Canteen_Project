import { useEffect, useState } from "react";
import type { Order } from "../../../types/Order";
import { CreateOrderForm, OrderList, UpdateOrderForm } from "../components";

export const OrderOverview = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [creatingOrder, setCreatingOrder] = useState<boolean>(false);
    const [orderToBeUpdated, setOrderToBeUpdated] = useState<Order | null>(null);

    const fetchOrders = async () => {
        const response = await fetch("http://localhost:3002/orders");
        const { data } = await response.json();
        setOrders(data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const refreshOrders = () => {
        fetchOrders();
        setCreatingOrder(false);
        setOrderToBeUpdated(null);
    };

    const deleteOrder = async (id: number) => {
        await fetch(`http://localhost:3002/orders/${id}`, { method: "DELETE" });
        fetchOrders();
    };

    return (
        <>
            <h2>Orders</h2>

            {creatingOrder && <CreateOrderForm refresh={refreshOrders} />}

            {orderToBeUpdated && (
                <UpdateOrderForm order={orderToBeUpdated} refresh={refreshOrders} />
            )}

            {!creatingOrder && !orderToBeUpdated && (
                <OrderList
                    orders={orders}
                    toggleIsCreating={() => setCreatingOrder(true)}
                    updateOrder={setOrderToBeUpdated}
                    deleteOrder={deleteOrder}
                />
            )}
        </>
    );
};