/*
  Add actor button
  Loading state
*/
var React = require('react');
var ReactDOM = require('react-dom');
var reqwest = require('reqwest');

var Find = require('./components/Find.js');
var MovieSelect = require('./components/MovieSelect.js');
var MovieList = require('./components/MovieList.js');
var ActorList = require('./components/ActorList.js');

require('../node_modules/react-select/dist/react-select.css');

var Movio = React.createClass({
  getInitialState: function() {
    return { 
      find: {
        hidden:false,
        results:null
      },
      buttonDisabled: true,
      selectResults: [],
      movieList: [],
      actorList: []
    };
  },
  handleFormSuccess: function(data) {
    this.setState({
      find:{
        hidden: true, 
        results: data
      }
    });
    this.constructSelect(data.results);
  },
  constructSelect: function(movies) {
    var movieArray = movies.map(function(movie){
      var title = movie.release_date != "" ? movie.title + ", " + movie.release_date.split('-')[0] : movie.title;
      return {value:movie.id, label: title};
    });

    this.setState({
      selectResults: movieArray
    });
  },
  handleSelect: function(val){
    this.setState({
      selectValue: val
    })
  },
  handleAddMovies: function(movies) {
    if(!movies){return};
    var movieList = this.state.movieList;
    
    for(var m in movieList){
      for(var i in movies) {
        if(movieList[m].value==movies[i].value){
          movies.splice(i,1);
          break;
        }
      }
    };

    var newMovieArray = movieList.concat(movies);
  
    this.setState({
      movieList: newMovieArray,
      buttonDisabled: !(newMovieArray.length > 0)
    });
  },
  handleSubmit: function(){
    if (!this.state.movieList.length) { return };
    var constructor = this;
    this.setState({actorList: []});
    
    this.state.movieList.forEach(function(movie){

      var url = this.constructUrl(movie.value);
      
      reqwest({
        url: url,
        type: 'json',
        crossOrigin: true,
        error: function (err) { },
        success: function (resp) {
          constructor.addActors(resp.cast);
        }
      });
    }.bind(this));
  },
  constructUrl: function(movieId){
    return "http://api.themoviedb.org/3/movie/"+movieId+"/credits?api_key=c1563e12cbfb0e0448772001b74e67b2";
  },
  addActors: function(actors){
    actors.forEach(function(actor){
      var storedList = this.state.actorList;

      var existingRecord = storedList.filter(function( obj ) {
        return obj.id == actor.id;
      });
      
      if (existingRecord.length > 0) {
        storedList.forEach(function(person){
          if(person.id == actor.id) {
            person.count ++;
          }
        });
      } else {
        storedList.push({id: actor.id, name: actor.name, count: 1});
      }
      
      this.setState({
        actorList: storedList
      })
    }.bind(this));
  },
  handleRemoveMovie: function(value){
    var movies = this.state.movieList;
    for(var m in movies){
      if(movies[m].value==value){
        movies.splice(m,1);
      }
    }

    this.setState({
      movieList: movies
    })
  },
  render: function(){
    return (
      <div className="jumboTron">
        <h1 className="text-center">Movio</h1>
        <Find 
          onFormSuccess={this.handleFormSuccess}
        />
        <MovieSelect
          selectResults={this.state.selectResults}
          onAddMovies={this.handleAddMovies}
        />
        <MovieList
          movieList={this.state.movieList}
          removeMovie={this.handleRemoveMovie}
        />
        <button
          className="btn btn-success btn-lg"
          disabled={this.state.buttonDisabled}
          onClick={this.handleSubmit}>
          My list is complete!
        </button>
        <ActorList
          actorList={this.state.actorList}
        />
      </div>
    )
  }
})

ReactDOM.render(
  <Movio />,
  document.getElementById('app')
);