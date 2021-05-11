import React, { useState } from "react";
import "../../css/App.css";
import Detail from "./Detail";
import Header from "./Header";
import MovieShow from "./MovieShow";
import Search from "./Search";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const App = () => {
    const [loading, setLoading] = useState(false);
    const [currentMovieShows, setCurrentMovieShows] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const search = searchValue => {
        window.history.replaceState({}, document.title, "/");
        setErrorMessage(null);
        setLoading(true);
        fetch(`/api/search/${searchValue}`).then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.Error) {
                    setErrorMessage(jsonResponse.Error);
                    setLoading(false);

                } else {
                    setCurrentMovieShows(jsonResponse);
                    setLoading(false);
                }

            });
    };

    return (
        <div className="App">
            <Header text="SERAPION MOVIES AND SHOWS" />
            <Search search={search} />
            <div className="moviesShows">

                {loading && !errorMessage ? (
                    <span>loading...</span>
                ) : errorMessage ? (
                    <div className="errorMessage">{errorMessage}</div>
                ) : (
                    <Router>
                        {
                            currentMovieShows.map((movieShow, index) => (
                                <MovieShow key={`${index}-${movieShow.title}`} movieShow={movieShow} setCurrentMovieShows={setCurrentMovieShows}/>
                            ))
                        }
                        <Switch>
                            <Route path="/:id" children={<Detail/>} />
                        </Switch>
                    </Router>

                )}
            </div>

        </div>
    );
};

export default App;