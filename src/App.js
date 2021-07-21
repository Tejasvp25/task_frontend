import "./App.css";
import logo from "./complete_task.svg";
import StudentInfoForm from "./components/StudentInfoForm";
import StudentInfoTable from "./components/StudentInfoTable";
import StudentContextProvider from "./context/StudentContext";
function App() {
  return (
    <div className="App">
      <div>
        <h1 className="p2" style={{ margin: "0" }}>
          Internship Monitoring System
        </h1>
      </div>
      <StudentContextProvider>
        <div>
          <div className="f-row justify-evenly">
            <StudentInfoForm />
            <StudentInfoTable />
          </div>
        </div>
      </StudentContextProvider>
    </div>
  );
}

export default App;
