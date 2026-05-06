import { useEffect, useState } from "react";
import type { Order } from "../../../types/Order";
import type { Student } from "../../../types/Student";
import type { Meal } from "../../../types/Meal";
import { CreateOrderForm, OrderList, UpdateOrderForm } from "../components";

export const OrderOverview = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [creatingOrder, setCreatingOrder] = useState<boolean>(false);
    const [orderToBeUpdated, setOrderToBeUpdated] = useState<Order | null>(null);

    const fetchAll = async () => {
        const [ordersRes, studentsRes, mealsRes] = await Promise.all([
            fetch("http://localhost:3002/orders"),
            fetch("http://localhost:3002/students"),
            fetch("http://localhost:3002/meals"),
        ]);
        const [ordersData, studentsData, mealsData] = await Promise.all([
            ordersRes.json(),
            studentsRes.json(),
            mealsRes.json(),
        ]);
        setOrders(ordersData.data);
        setStudents(studentsData.data);
        setMeals(mealsData.data);
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const refreshOrders = () => {
        fetchAll();
        setCreatingOrder(false);
        setOrderToBeUpdated(null);
    };

    const deleteOrder = async (id: number) => {
        await fetch(`http://localhost:3002/orders/${id}`, { method: "DELETE" });
        fetchAll();
    };

    return (
        <>
            {creatingOrder && (
                <CreateOrderForm
                    students={students}
                    meals={meals}
                    refresh={refreshOrders}
                />
            )}

            {orderToBeUpdated && (
                <UpdateOrderForm
                    order={orderToBeUpdated}
                    students={students}
                    meals={meals}
                    refresh={refreshOrders}
                />
            )}

            {!creatingOrder && !orderToBeUpdated && (
                <OrderList
                    orders={orders}
                    students={students}
                    meals={meals}
                    toggleIsCreating={() => setCreatingOrder(true)}
                    updateOrder={setOrderToBeUpdated}
                    deleteOrder={deleteOrder}
                />
            )}
        </>
    );
};