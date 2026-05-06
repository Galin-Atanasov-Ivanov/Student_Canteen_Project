import { useForm } from "react-hook-form";
import type { CreateStudentDTO } from "../../../types/Student";
import type { FC } from "react";

interface CreateStudentFormProps {
    refresh: VoidFunction;
}

export const CreateStudentForm: FC<CreateStudentFormProps> = ({ refresh }) => {
    const { handleSubmit, register, formState: { errors } } = useForm<CreateStudentDTO>();

    const createStudent = async (data: CreateStudentDTO) => {
        await fetch("http://localhost:3002/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        refresh();
    };

    return (
        <div className="form-card">
            <p className="form-card__title">New Student</p>
            <form onSubmit={handleSubmit(createStudent)}>
                <div className="form-card__fields">
                    <div className="form-card__row">
                        <div className="form-card__field">
                            <label className="form-card__label">Name</label>
                            <input className="input" placeholder="e.g. Ivan Petrov"
                                   {...register("name", { required: "Name is required" })} />
                            {errors.name && <span className="input-error">{errors.name.message}</span>}
                        </div>
                        <div className="form-card__field">
                            <label className="form-card__label">Faculty Number</label>
                            <input className="input" placeholder="e.g. 12345"
                                   {...register("faculty_number", { required: "FN is required" })} />
                            {errors.faculty_number && <span className="input-error">{errors.faculty_number.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="form-card__actions">
                    <button className="btn btn--primary" type="submit">Create Student</button>
                    <button className="btn btn--ghost" type="button" onClick={refresh}>Cancel</button>
                </div>
            </form>
        </div>
    );
};