var React = require('react');
var ReactDOM = require('react-dom');

var Display = React.createClass({
  nl2br: function(str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
  },
  createMarkup: function() { 
    return {__html: this.nl2br(this.props.description)}; 
  },
  render: function(){
    var list=[];

    this.props.list.forEach(function(item){
      list.push(
        <tr>
          <td><img className="img-rounded" src={ item.poster_path ? "http://image.tmdb.org/t/p/w92" + item.poster_path : ""} /></td>
          <td>{item.title}</td>
          <td>{item.release_date}</td>
        </tr>
      );
    });
    return (
      <div>
        <h3>{this.props.title}</h3>
        <img className="img-rounded" src={ this.props.image ? "http://image.tmdb.org/t/p/w154" + this.props.image : ""} />
        <p dangerouslySetInnerHTML={this.createMarkup()}></p>
        <table className="table table-striped">
          <tbody>
            <tr><th></th><th>Title</th><th>Year</th></tr>
            {list}
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = Display;
