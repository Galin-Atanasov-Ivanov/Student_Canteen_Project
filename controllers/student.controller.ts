import { Request, Response } from 'express';
import { StudentService } from '../services/student.service';

interface IdParams {
    id: string;
}

export class StudentController {
    constructor(private studentService: StudentService) {}

    getAll = async (req: Request, res: Response): Promise<void> => {
        const Students = await this.studentService.getAllStudents();
        res.json({ message: 'Students found', data: Students });
    };

    getById = async (req: Request<IdParams>, res: Response): Promise<void> => {
        const id=Number(req.params.id);
        const Student = await this.studentService.getStudentById(id);
        if (!Student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.json({ message: 'Student found', data: Student });
    };

    create = async (req: Request, res: Response): Promise<void> => {
        const { name, facultyNumber } = req.body;
        const Student = await this.studentService.createStudent({ name, facultyNumber });
        res.status(201).json({ message: 'Student created', data: Student });
    };

    update = async (req: Request<IdParams>, res: Response): Promise<void> => {
        const id=Number(req.params.id);
        const Student = await this.studentService.updateStudent(id, req.body);
        if (!Student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.json({ message: 'Student updated', data: Student });
    };

    delete = async (req: Request<IdParams>, res: Response): Promise<void> => {
        const id=Number(req.params.id);
        const deleted = await this.studentService.deleteStudent(id);
        if (!deleted) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.json({ message: 'Student deleted' });
    };
}
