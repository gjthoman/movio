var React = require('react');
var ReactDOM = require('react-dom');

var MovieItem = require('./MovieItem.js');

var MovieList = React.createClass({
  handleOnRemove: function(item){
    this.props.removeMovie(item);
  },
  render: function(){
    var list = [];
    this.props.movieList.sort(function(a, b){return a.label > b.label}).forEach(function(movie){
      list.push(<MovieItem 
                  title={movie.label} 
                  value={movie.value}
                  onRemove={this.handleOnRemove}
                   />);
    }.bind(this));

    return (
      <table
        className="table table-striped jumboTron"
        >
        <tbody>

        {list} 
        </tbody>
      </table>
    )
  }
})

module.exports = MovieList;
