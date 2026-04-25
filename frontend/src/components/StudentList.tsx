import type { Student } from "../../../types/Student";
import type { FC } from "react";

interface StudentListProps {
    students: Student[];
    toggleIsCreating: VoidFunction;
    updateStudent: (student: Student) => void;
    deleteStudent: (id: number) => void;
}

export const StudentList: FC<StudentListProps> = ({
                                                      students,
                                                      toggleIsCreating,
                                                      updateStudent,
                                                      deleteStudent
                                                  }) => {
    return (
        <div>
            <button onClick={toggleIsCreating}>Add Student</button>

            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.name} - {student.faculty_number}

                        <button onClick={() => updateStudent(student)}>
                            Edit
                        </button>

                        <button onClick={() => deleteStudent(student.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};