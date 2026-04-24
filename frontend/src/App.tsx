import { useEffect, useState } from "react";
import type { Meal } from "../../types/Meal";
import { MealList } from "./components/MealList";
import { CreateMealForm } from "./components/CreateMealForm";
import { UpdateMealForm } from "./components/UpdateMealForm";
import type {Student} from "../../types/Student.ts";
import { StudentList } from "./components/StudentList.tsx";
import {CreateStudentForm} from "./components/CreateStudentForm.tsx";
import {UpdateStudentForm} from "./components/UpdateStudentForm.tsx";

function App() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [isCreatingStudent, setIsCreatingStudent] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const fetchMeals = async () => {
        const res = await fetch("http://localhost:3000/meals");
        const data = await res.json();
        setMeals(data);
    };
    const fetchStudents = async () => {
        const res = await fetch("http://localhost:3000/students");
        const data = await res.json();
        setStudents(data);
    };
    useEffect(() => {
        fetchMeals();
    }, []);

    const refresh = () => {
        fetchMeals();
        setIsCreating(false);
        setSelectedMeal(null);
    };

    const deleteMeal = async (id: number) => {
        await fetch(`http://localhost:3000/meals/${id}`, {
            method: "DELETE"
        });
        refresh();
    };
    const deleteStudent = async (id: number) => {
        await fetch(`http://localhost:3000/students/${id}`, {
            method: "DELETE"
        });
        fetchStudents();
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

            {isCreatingStudent && <CreateStudentForm refresh={fetchStudents} />}

            {selectedStudent && (
                <UpdateStudentForm student={selectedStudent} refresh={fetchStudents} />
            )}
        </div>
    );
}

export default App;