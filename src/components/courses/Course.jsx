import React, { useState, useReducer } from "react";
import classnames from "classnames";
import data from "./data";

const initialState = {
  searchValue: "",
  pageNumber: 1,
  numberPerPage: 10,
  selectedSchool: ""
};

function courseReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_VALUE":
      return { ...state, searchValue: action.payload };
    case "SET_NUMBER_PER_PAGE":
      return { ...state, numberPerPage: action.payload };
    case "SET_PAGE_NUMBER":
      return { ...state, pageNumber: action.payload };
    case "SET_SCHOOL":
      return { ...state, selectedSchool: action.payload };
    default:
      throw new Error();
  }
}

function useCourseReducer() {
  const [state, dispatch] = useReducer(courseReducer, initialState);
  return {
    searchValue: state.searchValue,
    pageNumber: state.pageNumber,
    numberPerPage: state.numberPerPage,
    selectedSchool: state.selectedSchool,
    setSearchValue: payload => dispatch({ type: "SET_SEARCH_VALUE", payload }),
    setPageNumber: payload => dispatch({ type: "SET_PAGE_NUMBER", payload }),
    setNumberPerPage: payload => dispatch({ type: "SET_NUMBER_PER_PAGE", payload }),
    setSchool: payload => dispatch({ type: "SET_SCHOOL", payload })
  };
}

function Course() {
  const { searchValue, pageNumber, numberPerPage, setSearchValue, setPageNumber, setNumberPerPage, selectedSchool, setSchool } = useCourseReducer();

  const list = getFilteredList(data, searchValue, selectedSchool);
  const numberOfPages = list.length > numberPerPage ? (list.length % numberPerPage !== 0 ? Math.floor(list.length / numberPerPage) + 1 : Math.floor(list.length / numberPerPage)) : 1;

  const renderList = list.length > numberPerPage ? list.filter((item, index) => index >= (pageNumber - 1) * numberPerPage && index < pageNumber * numberPerPage) : list;
  return (
    <div style={{ maxWidth: 800, margin: "30px auto", padding: "0 10px" }}>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} setNumberPerPage={setNumberPerPage} setSchool={setSchool} setPageNumber={setPageNumber} />
      <CourseList list={renderList} searchValue={searchValue} />
      <Pagination pageNumber={pageNumber} numberOfPages={numberOfPages} setPageNumber={setPageNumber} />
    </div>
  );
}

export default Course;

let schoolList = [];

for (let i = 0; i < data.length; i++) {
  if (schoolList.indexOf(data[i].division) === -1) schoolList.push(data[i].division);
}

function SearchBar({ searchValue, setSearchValue, setNumberPerPage, setSchool, setPageNumber }) {
  return (
    <div>
      <input className='form-control' placeholder='search' value={searchValue} onChange={e => setSearchValue(e.target.value)} />
      <div className='d-flex mt-3'>
        <select
          className='form-control form-control-sm'
          style={{ marginRight: 10 }}
          onChange={e => {
            setSchool(e.target.value);
            setPageNumber(1);
          }}
        >
          <option value=''>All Universities</option>
          {schoolList.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <select className='form-control form-control-sm' style={{ width: 80 }} onChange={e => setNumberPerPage(e.target.value)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
}

function CourseList({ list, searchValue }) {
  return (
    <ul className='p-0 mt-4'>
      {list.map(item => (
        <CourseItem course={item} key={`course-${item.courseCode}`} searchValue={searchValue} />
      ))}
    </ul>
  );
}

function CourseItem({ course, searchValue }) {
  const [expanded, setExpanded] = useState(false);

  let courseCode = getHighlightedText(course.courseCode, searchValue);
  let courseName = getHighlightedText(course.courseName, searchValue);

  return (
    <li className='card mb-2'>
      <div className='card-body'>
        <label>{courseCode}</label>
        <div
          className='course-name'
          data-toggle='collapse'
          data-target={`#${course.courseCode}`}
          aria-expanded='false'
          aria-controls={course.courseCode}
          title='click to view more'
          onClick={() => setExpanded(expanded => !expanded)}
        >
          <span className='pr-2'>{courseName}</span>
          <i
            className={classnames({
              "fas fa-chevron-down": true,
              expanded
            })}
          />
        </div>

        <div id={course.courseCode} className='collapse'>
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

function Pagination({ pageNumber, numberOfPages, setPageNumber }) {
  const paginationLength = 9; // only show 9 numbers
  let numberList = [];

  if (paginationLength >= numberOfPages) {
    for (let i = 1; i <= numberOfPages; i++) {
      numberList.push(
        <li className={classnames({ "page-item": true, active: pageNumber === i })} key={`page-${i}`}>
          <button
            className='page-link'
            type='button'
            onClick={() => {
              setPageNumber(i);
              window.scrollTo({ top: 0 });
            }}
          >
            {i}
          </button>
        </li>
      );
    }
  } else {
    let half = Math.floor(paginationLength / 2);
    for (let i = 2; i < paginationLength; i++) {
      if (i < half + 1) {
        let pageNum = 0;

        if (pageNumber < half) {
          pageNum = i;
        } else if (pageNumber >= half && pageNumber <= numberOfPages - paginationLength + 2) {
          pageNum = i + pageNumber - (half - 1);
        } else {
          pageNum = numberOfPages - paginationLength + i;
        }

        numberList.push(
          <li className={classnames({ "page-item": true, active: pageNumber === pageNum })} key={`page-${pageNum}`}>
            <button
              className='page-link'
              type='button'
              onClick={() => {
                setPageNumber(pageNum);
                window.scrollTo({ top: 0 });
              }}
            >
              {pageNum}
            </button>
          </li>
        );
      } else if (i === half + 1) {
        if (pageNumber <= numberOfPages - paginationLength + 2) {
          numberList.push(<li className='page-link d-flex justify-content-center'>...</li>);
        } else {
          let pageNum = numberOfPages - half;
          numberList.push(
            <li className={classnames({ "page-item": true, active: pageNumber === pageNum })} key={`page-${pageNum}`}>
              <button
                className='page-link'
                type='button'
                onClick={() => {
                  setPageNumber(pageNum);
                  window.scrollTo({ top: 0 });
                }}
              >
                {pageNum}
              </button>
            </li>
          );
        }
      } else {
        let pageNum = numberOfPages - paginationLength + i;
        numberList.push(
          <li className={classnames({ "page-item": true, active: pageNumber === pageNum })} key={`page-${pageNum}`}>
            <button
              className='page-link'
              type='button'
              onClick={() => {
                setPageNumber(pageNum);
                window.scrollTo({ top: 0 });
              }}
            >
              {pageNum}
            </button>
          </li>
        );
      }
    }
    numberList = [
      <li className={classnames({ "page-item": true, active: pageNumber === 1 })} key={`page-${1}`}>
        <button
          className='page-link'
          type='button'
          onClick={() => {
            setPageNumber(1);
            window.scrollTo({ top: 0 });
          }}
        >
          1
        </button>
      </li>,
      ...numberList,
      <li className={classnames({ "page-item": true, active: pageNumber === numberOfPages })} key={`page-${numberOfPages}`}>
        <button
          className='page-link'
          type='button'
          onClick={() => {
            setPageNumber(numberOfPages);
            window.scrollTo({ top: 0 });
          }}
        >
          {numberOfPages}
        </button>
      </li>
    ];
  }

  return (
    <nav>
      <ul className='pagination flex-wrap'>
        <li className='page-item'>
          <button
            className='page-link'
            type='button'
            onClick={() => {
              setPageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 1);
              if (pageNumber - 1 > 0) window.scrollTo({ top: 0 });
            }}
          >
            &laquo;
          </button>
        </li>
        {numberList}
        <li
          className='page-item'
          onClick={() => {
            setPageNumber(pageNumber + 1 <= numberOfPages ? pageNumber + 1 : pageNumber);
            if (pageNumber + 1 <= numberOfPages) window.scrollTo({ top: 0 });
          }}
        >
          <button className='page-link' type='button'>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}

function getFilteredList(list, searchValue, selectedSchool) {
  let newList = list;

  if (!!selectedSchool) newList = list.filter(item => item.division === selectedSchool);

  if (!!searchValue || !!searchValue.trim()) {
    newList = newList.filter(item => {
      let courseName = item.courseName.toLowerCase();
      let courseCode = item.courseCode.toLowerCase();
      return courseName.indexOf(searchValue.toLowerCase()) !== -1 || courseCode.indexOf(searchValue.toLowerCase()) !== -1;
    });
  }

  return newList;
}

function getHighlightedText(text, higlight) {
  // Split on higlight term and include term into parts, ignore case
  let parts = text.split(new RegExp(`(${higlight})`, "gi"));
  return (
    <>
      {parts.map((part, i) => (
        <span key={i} className={classnames({ "text-primary font-weight-bold": part.toLowerCase() === higlight.toLowerCase() })}>
          {part}
        </span>
      ))}
    </>
  );
}
