import { useForm } from "react-hook-form";
import type { CreateStudentDTO } from "../../../types/Student";
import type { FC } from "react";

interface CreateStudentFormProps {
    refresh: VoidFunction;
}

export const CreateStudentForm: FC<CreateStudentFormProps> = ({ refresh }) => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<CreateStudentDTO>();

    const createStudent = async (data: CreateStudentDTO) => {
        await fetch("http://localhost:3000/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        refresh();
    };

    return (
        <form onSubmit={handleSubmit(createStudent)}>
            <input
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span>{errors.name.message}</span>}

            <input
                placeholder="Faculty Number"
                {...register("facultyNumber", { required: "FN is required" })}
            />
            {errors.faculty_number && <span>{errors.faculty_number.message}</span>}

            <button type="submit">Create Student</button>
        </form>
    );
};