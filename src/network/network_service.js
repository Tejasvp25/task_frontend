import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";
const INSTANCE = axios.create({ baseURL: BASE_URL });

export function postStudentInfo(name, rollno) {
  console.log({ name, rollno });
  return INSTANCE.post("/api/student", { name, rollno });
}

export function getAllStudents() {
  return INSTANCE.get("/api/student");
}

export function deleteStudent(rollno) {
  return INSTANCE.delete("/api/student", { data: { rollno } });
}
