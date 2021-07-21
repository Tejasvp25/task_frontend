import React, { useState, useEffect, useContext } from "react";
import { postStudentInfo } from "../network/network_service";
import { BeatLoader } from "react-spinners";
import { StudentContext } from "../context/StudentContext";

const StudentInfoForm = (props) => {
  const { students, setStudents } = useContext(StudentContext);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "Unexpected Error Occured",
    type: "failure  ",
  });
  useEffect(() => {
    if (loading) {
      document.getElementById("stname").readOnly = true;
      document.getElementById("strollno").readOnly = true;
    } else {
      document.getElementById("stname").readOnly = false;
      document.getElementById("strollno").readOnly = false;
    }
    return () => {};
  }, [loading]);
  const handlOnChange = (e) => {
    if (alert.show) setAlert({ ...alert, show: false });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("stname").value;
    const rollNo = document.getElementById("strollno").value;
    const exists = students.find((ele) =>
      ele.rollno === rollNo ? rollNo : undefined
    );
    if (exists !== undefined) {
      setAlert({
        msg: "Student With given Roll No already exists",
        type: "failure",
        show: true,
      });
      return;
    }
    setLoading(true);
    postStudentInfo(name, rollNo)
      .then((res) => {
        if (res.status === 201) {
          setAlert({
            msg: "Student Info Added Successfully",
            show: true,
            type: "success",
          });
          const stdArray = [
            ...students,
            { name, rollno: rollNo, created_at: new Date() },
          ];
          stdArray.sort((a, b) =>
            a.rollno > b.rollno ? 1 : b.rollno > a.rollno ? -1 : 0
          );
          setStudents(stdArray);
        }
      })
      .catch((e) => {
        setAlert({
          msg:
            e.response.status === 409
              ? e.response.data.message
              : "Unexpected Error Occured",
          show: true,
          type: "failure",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="glass" style={{ alignSelf: "center" }}>
      <form className="f-column justify-center" onSubmit={handleOnSubmit}>
        <h2 style={{ margin: "0", paddingBottom: "1rem", color: "purple" }}>
          Student Details
        </h2>
        <input
          type="text"
          id="stname"
          placeholder="Student Name"
          onChange={handlOnChange}
          required
        />
        <input
          type="text"
          id="strollno"
          placeholder="Student Roll No."
          pattern="[0-9]+"
          title="Must contain only numbers"
          onChange={handlOnChange}
          required
        />
        {loading ? (
          <BeatLoader size="20px" />
        ) : (
          <input type="submit" value="Submit" />
        )}
        {alert.show ? (
          <div className={`alert ${alert.type}`}>{alert.msg}</div>
        ) : null}
      </form>
    </div>
  );
};

export default StudentInfoForm;
