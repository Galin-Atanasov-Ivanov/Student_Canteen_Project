export interface Student {
    id: number;
    name: string;
    faculty_number: string;
}

export interface CreateStudentDTO {
    name: string;
    faculty_number: string;
}