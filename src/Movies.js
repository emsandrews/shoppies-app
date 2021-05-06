import React from "react";
import axios from "axios";

export default class Movies extends React.Component {
  state = {
    results: [],
  };

  componentDidMount() {
    axios
      .get(`http://www.omdbapi.com/?apikey=bd902656&`, {
        params: { s: "social" },
      })
      .then((res) => {
        const data = res.data.Search;
        console.log(data);
        this.setState({ results: data });
      });
  }

  render() {
    return (
      <ul>
        {this.state.results.map((result) => (
          <div>
            <li>{result.Title}</li>
            <img src={result.Poster} />
          </div>
        ))}
      </ul>
    );
  }
}
