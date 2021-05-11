import React from "react";
import {
  Link
} from "react-router-dom";
const NO_PICTURE =
  "https://dummyimage.com/200x300/343a40/fff.png&text=no+picture"


const MovieShow = (props) => {
  const poster = props.movieShow.poster === "N/A" ? NO_PICTURE : props.movieShow.poster;
  return (
    <div className="movieShow">
      <h4>{props.movieShow.title}</h4>
      <div>
        <img
          width="200"
          alt={`The ${props.movieShow.type} titled: ${props.movieShow.title}`}
          src={poster}
        />
      </div>
      <p>({props.movieShow.type})</p>
      <p>({props.movieShow.year})</p>
      <Link to={`/${props.movieShow.imdbID}`} onClick={()=> props.setCurrentMovieShows([])}>Show More</Link>
    </div>
  );
};


export default MovieShow;