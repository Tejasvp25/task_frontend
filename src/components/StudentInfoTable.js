import React, { useContext, useEffect } from "react";
import { StudentContext } from "../context/StudentContext";
import { getAllStudents, deleteStudent } from "../network/network_service";
import { v4 } from "uuid";
const StudentInfoTable = (props) => {
  const { students, setStudents } = useContext(StudentContext);
  useEffect(() => {
    getAllStudents().then((res) => {
      if (res.status === 200 && res.data && res.data.length > 0) {
        setStudents(res.data);
      }
    });
    return () => {};
  }, []);

  const handleDelete = (e, rollno) => {
    e.preventDefault();
    deleteStudent(rollno).then((res) => {
      if (res.status === 200) {
        setStudents(students.filter((val) => val.rollno !== rollno));
      }
    });
  };

  return students && students.length > 0 ? (
    <table className="glass">
      <tbody>
        <tr>
          <th>Name</th>
          <th>Roll No</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
        {students.map((ele) => {
          return (
            <tr key={v4()}>
              <td>{ele.name}</td>
              <td>{ele.rollno}</td>
              <td>{new Date(ele.created_at).toUTCString()}</td>
              <td>
                <button
                  onClick={(e) => {
                    handleDelete(e, ele.rollno);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <h2 style={{ color: "purple" }}>Student Info Not Found</h2>
  );
};
export default StudentInfoTable;
