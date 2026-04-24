import { Router } from 'express';
import {StudentModel} from "../models/student.model";
import {StudentService} from "../services/student.service";
import {StudentController} from "../controllers/student.controller";
import pool from "../config/database";


const studentModel = new StudentModel(pool);
const studentService = new StudentService(studentModel);
const studentController = new StudentController(studentService);

const StudentRoutes = Router();

StudentRoutes.get('/students', studentController.getAll);
StudentRoutes.get('/students/:id', studentController.getById);
StudentRoutes.post('/students', studentController.create);
StudentRoutes.put('/students/:id', studentController.update);
StudentRoutes.delete('/students/:id', studentController.delete);

export default StudentRoutes;
