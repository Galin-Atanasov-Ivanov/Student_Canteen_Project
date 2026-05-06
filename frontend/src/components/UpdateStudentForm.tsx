import { useForm } from "react-hook-form";
import type { CreateStudentDTO, Student } from "../../../types/Student";
import type { FC } from "react";

interface UpdateStudentFormProps {
    student: Student;
    refresh: VoidFunction;
}

export const UpdateStudentForm: FC<UpdateStudentFormProps> = ({ student, refresh }) => {
    const { handleSubmit, register, formState: { errors } } = useForm<CreateStudentDTO>({
        defaultValues: { name: student.name, faculty_number: student.faculty_number }
    });

    const updateStudent = async (data: CreateStudentDTO) => {
        await fetch(`http://localhost:3002/students/${student.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        refresh();
    };

    return (
        <div className="form-card">
            <p className="form-card__title">Edit Student</p>
            <form onSubmit={handleSubmit(updateStudent)}>
                <div className="form-card__fields">
                    <div className="form-card__row">
                        <div className="form-card__field">
                            <label className="form-card__label">Name</label>
                            <input className="input"
                                   {...register("name", { required: "Name is required" })} />
                            {errors.name && <span className="input-error">{errors.name.message}</span>}
                        </div>
                        <div className="form-card__field">
                            <label className="form-card__label">Faculty Number</label>
                            <input className="input"
                                   {...register("faculty_number", { required: "FN is required" })} />
                            {errors.faculty_number && <span className="input-error">{errors.faculty_number.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="form-card__actions">
                    <button className="btn btn--primary" type="submit">Update Student</button>
                    <button className="btn btn--ghost" type="button" onClick={refresh}>Cancel</button>
                </div>
            </form>
        </div>
    );
};