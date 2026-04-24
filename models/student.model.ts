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

    async create(Student: CreateStudentDTO): Promise<Student> {
        const [result] = await this.db.query<ResultSetHeader>(
            "INSERT INTO student(id,name,faculty_number) VALUES (NULL,?,?)",
            [Student.name,Student.facultyNumber]
        );

        return {
            id: result.insertId,
            name: Student.name,
            facultyNumber: Student.facultyNumber
        }
    }

    async update(id: number, data: Partial<Student>): Promise<Student | undefined> {
        const existing = this.findById(id);
        if (!existing) {
            return undefined;
        }

        const updated={...existing,...data};
        await this.db.query<ResultSetHeader>(
            "UPDATE student SET name =?, faculty_number =? WHERE id = ?",
            [updated.name, updated.facultyNumber, id]
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