var React = require('react');
var ReactDOM = require('react-dom');
var reqwest = require('reqwest');

var Find = React.createClass({
  getInitialState: function(){
    return { title: 'jurassic park'};
  },
  handleTitleChange: function(e){
    this.setState({title: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var title = this.state.title.trim();

    if (!title) { return };
    var url = "http://api.themoviedb.org/3/search/movie?api_key=c1563e12cbfb0e0448772001b74e67b2&query="+title;
    var constructor = this;
    reqwest({
      url: url,
      type: 'json',
      crossOrigin: true,
      error: function (err) { },
      success: function (resp) {
        constructor.props.onFormSuccess(resp);
      }
    });
  },
  render: function(){
    return (
      <form
        onSubmit={this.handleSubmit}
        hidden={this.props.hidden}
        >
        <div className="col-xs-6">
          <input 
            type="text" 
            className="form-control"
            placeholder="Movie Title" 
            value={this.state.title}
            onChange={this.handleTitleChange} 
          />
          </div>
          <input type="submit" className="btn btn-primary" value="Find Movie" />
      </form>
    )
  }
})

module.exports = Find;