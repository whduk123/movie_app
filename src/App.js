import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie';


class App extends Component {
// Render : componentWillMount() -> render() -> componentDidMount()
// Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render -> ..?
  
state ={}
componentDidMount() {
    this._getMovies()
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      return <Movie 
      title={movie.title_english} 
      poster={movie.medium_cover_image}
      key={movie.id}
      genres={movie.genres}
      synopsis={movie.synopsis}
      />
  })
  return movies
  }
 _getMovies =  async () => {
    const movies = await this._callApi() // await, async (비동기를 동기적으로 수행 => Promise 방식을 따라 리턴)
    this.setState({
      movies 
    })
  }

  _callApi = () => {
    return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=rating')
    .then(potato => potato.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }
  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading"}
      </div>
    );
}
}
export default App;
