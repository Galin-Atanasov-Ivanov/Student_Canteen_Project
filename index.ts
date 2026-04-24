import express from "express";
import studentRoutes from "./routes/student.routes";
import 'dotenv/config'
import cors from "cors";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());

app.use(studentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
