import type { Student } from "../../../types/Student";
import type { FC } from "react";

interface StudentListProps {
    students: Student[];
    toggleIsCreating: VoidFunction;
    updateStudent: (student: Student) => void;
    deleteStudent: (id: number) => void;
}

export const StudentList: FC<StudentListProps> = ({ students, toggleIsCreating, updateStudent, deleteStudent }) => {
    return (
        <div>
            <div className="page-header">
                <div>
                    <p className="page-header__eyebrow">Manage</p>
                    <h2 className="page-header__title">Students</h2>
                </div>
                <div className="page-header__count">{students.length} students</div>
            </div>

            <button className="btn btn--primary" onClick={toggleIsCreating}>
                + Add Student
            </button>

            <ul className="data-list" style={{ marginTop: "var(--space-lg)" }}>
                {students.length === 0 && (
                    <p className="data-list__empty">No students yet. Add one to get started.</p>
                )}
                {students.map((student) => (
                    <li className="data-list__item" key={student.id}>
                        <div className="data-list__info">
                            <span className="data-list__name">{student.name}</span>
                            <span className="data-list__meta">{student.faculty_number}</span>
                        </div>
                        <div className="data-list__actions">
                            <button className="btn btn--ghost btn--sm" onClick={() => updateStudent(student)}>
                                Edit
                            </button>
                            <button className="btn btn--danger btn--sm" onClick={() => deleteStudent(student.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};