import { useState } from "react";
import { FaAdjust, FaBook, FaEdit, FaMinusCircle } from "react-icons/fa";
import "./App.scss";

function App() {
  const [theme, setTheme] = useState("light");
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  let message;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const courseName = e.target.cName.value;
    const courseDescription = e.target.cDescription.value;
    const courseCode = e.target.cCode.value;

    if (editingCourse) {
      const updatedCourses = courses.map((course) =>
        course.code === editingCourse.code
          ? {
              ...course,
              name: courseName,
              desc: courseDescription,
              code: courseCode,
            }
          : course
      );

      setCourses(updatedCourses);
      setEditingCourse(null); // Reset editing state

      // Clear input fields after adding a course
      e.target.cName.value = "";
      e.target.cDescription.value = "";
      e.target.cCode.value = "";
    } else {
      // Check if the course code already exists
      const courseExists = courses.some((course) => course.code === courseCode);

      if (courseName && courseDescription && courseCode) {
        if (courseExists) {
          message = `Course with code ${courseCode} already exists.`;
          alert(message);
        } else {
          const newCourse = {
            name: courseName,
            desc: courseDescription,
            code: courseCode,
          };

          setCourses([...courses, newCourse]);

          // Clear input fields after adding a course
          e.target.cName.value = "";
          e.target.cDescription.value = "";
          e.target.cCode.value = "";
        }
      } else if (!courseName) {
        message = `Enter Course Name`;
        alert(message);
      } else if (!courseDescription) {
        message = `Enter Course Description`;
        alert(message);
      } else if (!courseCode) {
        message = `Enter Course Code`;
        alert(message);
      }
    }
  };

  const deleteCourse = (courseCode) => {
    const updatedCourses = courses.filter(
      (course) => course.code !== courseCode
    );
    setCourses(updatedCourses);
  };

  const editCourse = (courseCode) => {
    const courseToEdit = courses.find((course) => course.code === courseCode);
    if (courseToEdit) {
      setEditingCourse(courseToEdit);
    }
  };

  const clearAll = () => {
    setCourses([]);
  };

  return (
    <main className={`${theme}-mode`}>
      <header>
        <div className="theme" onClick={toggleTheme}>
          <FaAdjust />
        </div>
        <div className="top">
          <h1 className="flex align-center justify-center">
            <FaBook /> My <span className="green">&nbsp;Courses&nbsp;</span> -
            List App
          </h1>
        </div>
      </header>
      <div className="flex justify-center align-center wrap">
        <form className="input-section" onSubmit={handleAddCourse}>
          <p className="message">{message}</p>
          <div className="input-block">
            <label htmlFor="cName">Enter Course Name</label>
            <input type="text" name="cName" />
          </div>
          <div className="input-block">
            <label htmlFor="cDescription">Enter Course Description</label>
            <input type="text" name="cDescription" />
          </div>
          <div className="input-block">
            <label htmlFor="cCode">Enter Course Code</label>
            <input type="text" name="cCode" />
          </div>
          <button className="button button-primary" type="submit">
            Submit
          </button>
        </form>
        <div className="display-courses">
          <div className="grid g-by5">
            <strong>Course Name</strong>
            <strong>Course Description</strong>
            <strong>Course Code</strong>
            <strong></strong>
            <strong></strong>
          </div>
          <div className="list">
            {courses.map((course, index) => (
              <div className="grid g-by5" key={index}>
                <span>{course.name}</span>
                <span>{course.desc}</span>
                <span>{course.code}</span>
                <button onClick={() => editCourse(course.code)}>
                  <FaEdit />
                </button>
                <button onClick={() => deleteCourse(course.code)}>
                  <FaMinusCircle />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="flex justify-center align-center">
        <button className="button" onClick={clearAll}>
          Clear All
        </button>
        <button className="button">Save as PDF</button>
      </footer>
    </main>
  );
}

export default App;
