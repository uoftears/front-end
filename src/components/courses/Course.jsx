import React, { useState } from "react";
import classnames from "classnames";
import data from "./data";

function Course() {
  const [searchValue, setSearchValue] = useState("");

  const list = selectList(data, searchValue);
  return (
    <div style={{ maxWidth: 800, margin: "30px auto", padding: "0 10px" }}>
      <div>
        <input
          className="form-control"
          placeholder="search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      <ul className="p-0 mt-4">
        {list.map(item => (
          <CourseItem
            course={item}
            key={`course-${item.courseCode}`}
            searchValue={searchValue}
          />
        ))}
      </ul>
    </div>
  );
}

export default Course;

function CourseItem({ course, searchValue }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <li className="card mb-2">
      <div className="card-body">
        <label>{course.courseCode}</label>
        <div
          className="course-name"
          data-toggle="collapse"
          data-target={`#${course.courseCode}`}
          aria-expanded="false"
          aria-controls={course.courseCode}
          title="click to view more"
          onClick={() => setExpanded(expanded => !expanded)}
        >
          <span className="pr-2">{course.courseName}</span>
          <i
            className={classnames({
              "fas fa-chevron-down": true,
              expanded
            })}
          />
        </div>

        <div id={course.courseCode} className="collapse">
          <div>{course.breadth}</div>
          <div>{course.department}</div>
          <div>{course.division}</div>
          <div>{course.exclusion}</div>
          <div>{course.level}</div>
          <div>{course.term}</div>
          <div>{course.preReq}</div>
          <div>{course.description}</div>
        </div>
      </div>
    </li>
  );
}

function selectList(list, searchValue) {
  if (!!searchValue || !!searchValue.trim()) {
    return list.filter(item => {
      let courseName = item.courseName.toLowerCase();
      let courseCode = item.courseCode.toLowerCase();
      return (
        courseName.indexOf(searchValue.toLowerCase()) !== -1 ||
        courseCode.indexOf(searchValue.toLowerCase()) !== -1
      );
    });
  } else {
    return list;
  }
}
