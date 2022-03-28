import React, { useEffect, useRef, useState } from "react";
import "./MoviesList.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { isEmpty } from "../Utils";
import { getMovies } from "../../redux.js";
import Pagination from "../Pagination/Pagination";

export default function MoviesList() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const refSelectedCategory = useRef("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);

  useEffect(
    () => {
      dispatch(getMovies());
    },
    [dispatch],
    movies
  );

  const handleSortCategory = () => {
    let categoryArray = [];
    !isEmpty(movies) && movies.map((m) => categoryArray.push(m.category));
    return categoryArray.filter((e, i, a) => a.indexOf(e) === i);
  };
  const listOfCategory = handleSortCategory();

  const handleSelectedCategory = () => {
    setSelectedCategory(refSelectedCategory.current.value);
  };

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  let currentMovies;
  if (!isEmpty(movies)) {
    currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="movies-list-container">
      <div className="input-pagination-container">
        <div className="input-container">
          <select
            name="category"
            id="category-select"
            ref={refSelectedCategory}
            onChange={() => handleSelectedCategory()}
          >
            <option value="all" defaultValue>
              Tous
            </option>
            {!isEmpty(movies) &&
              listOfCategory.map((category, index) => {
                return (
                  <option value={category} key={index}>
                    {category}
                  </option>
                );
              })}
          </select>
        </div>
        <Pagination
          moviesPerPage={moviesPerPage}
          totalMovies={movies.length}
          paginate={paginate}
        />
      </div>
      <div className="line"></div>
      <div className="cards-container">
        {!isEmpty(currentMovies) &&
          currentMovies.map((movie) => {
            if (selectedCategory === "all") {
              return (
                <div key={movie.id}>
                  <Card movie={movie} />
                </div>
              );
            } else if (movie.category === selectedCategory) {
              return (
                <div key={movie.id}>
                  <Card movie={movie} />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
