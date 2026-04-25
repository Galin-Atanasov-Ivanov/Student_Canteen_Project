import { useForm } from "react-hook-form";
import type { CreateStudentDTO, Student } from "../../../types/Student";
import type { FC } from "react";

interface UpdateStudentFormProps {
    student: Student;
    refresh: VoidFunction;
}

export const UpdateStudentForm: FC<UpdateStudentFormProps> = ({ student, refresh }) => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<CreateStudentDTO>({
        defaultValues: {
            name: student.name,
            faculty_number: student.faculty_number
        }
    });

    const updateStudent = async (data: CreateStudentDTO) => {
        await fetch(`http://localhost:3000/students/${student.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        refresh();
    };

    return (
        <form onSubmit={handleSubmit(updateStudent)}>
            <input {...register("name", { required: "Name is required" })} />
            {errors.name && <span>{errors.name.message}</span>}

            <input {...register("facultyNumber", { required: "FN is required" })} />
            {errors.faculty_number && <span>{errors.faculty_number.message}</span>}

            <button type="submit">Update Student</button>
            <button type="button" onClick={refresh}>Cancel</button>
        </form>
    );
};