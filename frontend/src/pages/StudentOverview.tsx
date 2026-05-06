import { useEffect, useState } from "react";
import type { Student } from "../../../types/Student";
import { CreateStudentForm, StudentList, UpdateStudentForm } from "../components";

export const StudentOverview = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [creatingStudent, setCreatingStudent] = useState<boolean>(false);
    const [studentToBeUpdated, setStudentToBeUpdated] = useState<Student | null>(null);

    const fetchStudents = async () => {
        const response = await fetch("http://localhost:3002/students");
        const { data } = await response.json();
        setStudents(data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const refreshStudents = () => {
        fetchStudents();
        setCreatingStudent(false);
        setStudentToBeUpdated(null);
    };

    const deleteStudent = async (id: number) => {
        await fetch(`http://localhost:3002/students/${id}`, { method: "DELETE" });
        fetchStudents();
    };

    return (
        <>

            {creatingStudent && <CreateStudentForm refresh={refreshStudents} />}

            {studentToBeUpdated && (
                <UpdateStudentForm student={studentToBeUpdated} refresh={refreshStudents} />
            )}

            {!creatingStudent && !studentToBeUpdated && (
                <StudentList
                    students={students}
                    toggleIsCreating={() => setCreatingStudent(true)}
                    updateStudent={setStudentToBeUpdated}
                    deleteStudent={deleteStudent}
                />
            )}
        </>
    );
};