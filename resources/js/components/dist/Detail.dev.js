"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NO_PICTURE = "https://dummyimage.com/200x300/343a40/fff.png&text=no+picture"; // const Detail = ({ movieShow }) => {
//   const poster = movieShow.poster === "N/A" ? NO_PICTURE : movieShow.poster;
//   return (
//     <div className="movieShow">
//       <h4>{movieShow.title}</h4>
//       <div>
//         <img
//           width="200"
//           alt={`The ${movieShow.type} titled: ${movieShow.title}`}
//           src={poster}
//         />
//       </div>
//       <p>({movieShow.type})</p>
//       <p>({movieShow.year})</p>
//       <a href={`/search?id=${movieShow.imdbID}`}>Users Page</a>
//     </div>
//   );
// };

var Detail = function Detail() {
  var _useParams = (0, _reactRouterDom.useParams)(),
      id = _useParams.id;

  console.log(id); // const poster = movieShow.poster === "N/A" ? NO_PICTURE : movieShow.poster;
  // return (
  //   <div className="movieShow">
  //     <h4>{movieShow.title}</h4>
  //     <div>
  //       <img
  //         width="200"
  //         alt={`The ${movieShow.type} titled: ${movieShow.title}`}
  //         src={poster}
  //       />
  //     </div>
  //     <p>({movieShow.type})</p>
  //     <p>({movieShow.year})</p>
  //     <a href={`/search?id=${movieShow.imdbID}`}>Users Page</a>
  //   </div>
  // );
};

var _default = Detail;
exports["default"] = _default;