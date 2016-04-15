var React = require('react');
var ReactDOM = require('react-dom');

var ActorItem = React.createClass({
  handleClick: function(){
    this.props.onActorClick(this.props.name, this.props.id);
  },
  handleChange: function(){
    console.log(this);
    this.props.onActorChange(this.props.id);
  },
  render: function(){
    return (
      <tr
        className="lead"
        >
        <td>
        <input type="checkbox" value="option1" onChange={this.handleChange}/> <a onClick={this.handleClick}>
          {this.props.name}
          </a></td>
          <td>{this.props.count}</td>
      </tr>
    )
  }
})

module.exports = ActorItem;
