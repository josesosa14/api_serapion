import React, { useState, useEffect } from "react";
import {
  useParams
} from "react-router-dom";

const NO_PICTURE =
  "https://dummyimage.com/200x300/343a40/fff.png&text=no+picture"

const Detail = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentDetail, setCurrentDetail] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    detailFill(id);
  }, [id]);

  const detailFill = (id) => {
    if (id != null) {
      fetch(`/api/detail/${id}`).then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.Error) {
            setErrorMessage(jsonResponse.Error);

          } else {
            setCurrentDetail(jsonResponse);
          }

        });
    }
  }

  const poster = currentDetail.poster === "N/A" ? NO_PICTURE : currentDetail.poster;
  return (
    errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      <div className="movieShowDetail">
        <div>
          <img
            width="200"
            alt={`The ${currentDetail.type} titled: ${currentDetail.title}`}
            src={poster}
          />
        </div>
        <div className="movieShowDetailText">
          <h4>{currentDetail.title}</h4>
          <li>{currentDetail.type}</li>
          <li>{currentDetail.year}</li>
          <li>{currentDetail.rated}</li>
          <li>{currentDetail.runtime}</li>
          <li>{currentDetail.released}</li>
          <li>{currentDetail.genre}</li>
          <li>{currentDetail.director}</li>
          <li>{currentDetail.actors}</li>
          <li>{currentDetail.language}</li>
          {currentDetail.totalSeasons != null && <li>{currentDetail.totalSeasons}</li>}
        </div>
      </div>
    ));
};


export default Detail;