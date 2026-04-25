import { useEffect, useState } from "react";
import type { Meal } from "../../types/Meal";
import { MealList } from "./components/MealList";
import { CreateMealForm } from "./components/CreateMealForm";
import { UpdateMealForm } from "./components/UpdateMealForm";
import type {Student} from "../../types/Student.ts";
import { StudentList } from "./components/StudentList.tsx";
import {CreateStudentForm} from "./components/CreateStudentForm.tsx";
import {UpdateStudentForm} from "./components/UpdateStudentForm.tsx";
import type {Order} from "../../types/Order.ts";
import {OrderList} from "./components/OrderList.tsx";
import {CreateOrderForm} from "./components/CreateOrderForm.tsx";
import {UpdateOrderForm} from "./components/UpdateOrderForm.tsx";

function App() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [isCreatingStudent, setIsCreatingStudent] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const fetchMeals = async () => {
        const res = await fetch("http://localhost:3002/meals");
        const data = await res.json();
        setMeals(data.data);
    };
    const fetchStudents = async () => {
        const res = await fetch("http://localhost:3002/students");
        const data = await res.json();
        console.log(data);
        setStudents(data.data);
    };
    const fetchOrders = async () => {
        const res = await fetch("http://localhost:3002/orders");
        const data = await res.json();
        setOrders(data.data);
    };
    useEffect(() => {
        fetchMeals();
    }, []);

    const refresh = () => {
        fetchMeals();
        setIsCreating(false);
        setSelectedMeal(null);
        fetchStudents();
        fetchOrders();
    };

    const deleteMeal = async (id: number) => {
        await fetch(`http://localhost:3002/meals/${id}`, {
            method: "DELETE"
        });
        refresh();
    };
    const deleteStudent = async (id: number) => {
        await fetch(`http://localhost:3002/students/${id}`, {
            method: "DELETE"
        });
        fetchStudents();
    };
    const deleteOrder = async (id: number) => {
        await fetch(`http://localhost:3002/orders/${id}`, {
            method: "DELETE"
        });
        fetchOrders();
    };
    const toggleIsCreating = () => {
        setIsCreating(!isCreating);
        setSelectedMeal(null);
    };

    const updateMeal = (meal: Meal) => {
        setSelectedMeal(meal);
        setIsCreating(false);
    };

    return (
        <div>
            <h1>Student Canteen</h1>

            {isCreating && <CreateMealForm refresh={refresh} />}

            {selectedMeal && (
                <UpdateMealForm meal={selectedMeal} refresh={refresh} />
            )}

            <MealList
                meals={meals}
                toggleIsCreating={toggleIsCreating}
                updateMeal={updateMeal}
                deleteMeal={deleteMeal}
            />
            <StudentList
                students={students}
                toggleIsCreating={() => setIsCreatingStudent(!isCreatingStudent)}
                updateStudent={setSelectedStudent}
                deleteStudent={deleteStudent}
            />

            {isCreatingStudent && <CreateStudentForm refresh={refresh} />}

            {selectedStudent && (
                <UpdateStudentForm student={selectedStudent} refresh={refresh} />
            )}
            <OrderList
                orders={orders}
                toggleIsCreating={() => setIsCreatingOrder(!isCreatingOrder)}
                updateOrder={setSelectedOrder}
                deleteOrder={deleteOrder}
            />

            {isCreatingOrder && <CreateOrderForm refresh={refresh} />}

            {selectedOrder && (
                <UpdateOrderForm order={selectedOrder} refresh={refresh} />
            )}
        </div>
    );
}

export default App;