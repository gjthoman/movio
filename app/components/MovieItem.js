var React = require('react');
var ReactDOM = require('react-dom');

var MovieItem = React.createClass({
  handleRemove: function(){
    this.props.onRemove(this.props.value);
  },
  render: function(){
    return (
      <tr
        className="lead bg-info" 
        value={this.props.value}>
        <td>
        <a onClick={this.handleRemove}>
          <span className="glyphicon glyphicon-remove-sign"></span>
          </a>
          {" " +this.props.title}</td>
      </tr>
    )
  }
})

module.exports = MovieItem;
