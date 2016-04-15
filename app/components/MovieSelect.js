var React = require('react');
var ReactDOM = require('react-dom');

var Select = require('react-select');

var MovieSelect = React.createClass({
  getInitialState: function(){
    return { 
      selectValue: ''
    };
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.onAddMovies(this.state.selectValue);
    this.handleChange('');
  },
  handleChange: function(val) {
    this.setState({
      selectValue: val
    });
  },
  render: function(){
    return (
      <form
        className="clearfix"
        onSubmit={this.handleSubmit}
        >
        <div className="col-xs-6">
          <Select
            name="movie-select"
            multi={true}
            options={this.props.selectResults}
            value={this.state.selectValue}
            onChange={this.handleChange}
          />
          </div>
        <input type="submit" className="btn btn-primary" value="Add movie(s) to list" />
      </form>
    )
  }
})

module.exports = MovieSelect;


