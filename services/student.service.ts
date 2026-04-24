import { StudentModel } from '../models/student.model';
import {CreateStudentDTO, Student} from '../types/Student';

export class StudentService {
    constructor(private studentModel: StudentModel) {}

    async getAllStudents(): Promise<Student[]> {
        return await this.studentModel.findAll();
    }

    async getStudentById(id: number): Promise<Student | undefined> {
        return await this.studentModel.findById(id);
    }

    async createStudent(data: CreateStudentDTO): Promise<Student> {
        return await this.studentModel.create(data);
    }

    async updateStudent(id: number, data: Partial<Student>): Promise<Student | undefined> {
        return await this.studentModel.update(id, data);
    }

    async deleteStudent(id: number): Promise<boolean> {
        return await this.studentModel.delete(id);
    }
}
