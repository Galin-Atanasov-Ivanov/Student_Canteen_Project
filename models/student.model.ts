import {CreateStudentDTO, Student} from '../types/Student';
import {Pool, ResultSetHeader, RowDataPacket} from "mysql2/promise";

export class StudentModel {
    constructor(private db: Pool) {}

    async findAll(): Promise<Student[]> {
        const [rows] = await this.db.query<RowDataPacket[]>
        ("SELECT * FROM student");
        return rows as Student[];
    }

    async findById(id: number): Promise<Student | undefined> {
        const [rows] = await this.db.query<RowDataPacket[]>
        ("SELECT * FROM student WHERE id =?", [id]);
        return rows[0] as Student;
    }

    async create(student: CreateStudentDTO): Promise<Student> {
        const [result] = await this.db.query<ResultSetHeader>(
            "INSERT INTO student(id,name,faculty_number) VALUES (NULL,?,?)",
            [student.name,student.faculty_number]
        );

        return {
            id: result.insertId,
            name: student.name,
            faculty_number: student.faculty_number
        }
    }

    async update(id: number, data: Partial<Student>): Promise<Student | undefined> {
        const existing = await this.findById(id);
        if (!existing) {
            return undefined;
        }

        const updated={...existing,...data};
        await this.db.query<ResultSetHeader>(
            "UPDATE student SET name =?, faculty_number =? WHERE id = ?",
            [updated.name, updated.faculty_number, id]
        )

        return updated;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await this.db.query<ResultSetHeader>(
            "DELETE FROM student WHERE id = ?", [id]
        )
        return result.affectedRows > 0;
    }
}