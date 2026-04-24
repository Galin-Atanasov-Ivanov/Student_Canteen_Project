import { Router } from 'express';
import {StudentModel} from "../models/student.model";
import {StudentService} from "../services/student.service";
import {StudentController} from "../controllers/student.controller";
import pool from "../config/database";


const studentModel = new StudentModel(pool);
const studentService = new StudentService(studentModel);
const studentController = new StudentController(studentService);

const StudentRoutes = Router();

StudentRoutes.get('/Students', studentController.getAll);
StudentRoutes.get('/Students/:id', studentController.getById);
StudentRoutes.post('/Students', studentController.create);
StudentRoutes.put('/Students/:id', studentController.update);
StudentRoutes.delete('/Students/:id', studentController.delete);

export default StudentRoutes;
