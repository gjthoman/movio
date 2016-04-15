var React = require('react');
var ReactDOM = require('react-dom');
var reqwest = require('reqwest');

var ActorItem = require('./ActorItem.js');
var Display = require('./Display.js');

var ActorList = React.createClass({
  getInitialState: function(){
    return { 
      display: {
        title: "",
        description: "",
        image: "",
        list: []
      },
      actorIds: []
    };
  },
  formSubmit: function(e){
    e.preventDefault();
    var constructor = this;
    
    reqwest({
      url: this.constructFindUrl(this.state.actorIds),
      type: 'json',
      crossOrigin: true,
      error: function (err) { },
      success: function (resp) {
        constructor.setState({
          display: {
            title: "Common Movies",
            description: resp.results.length > 0 ? "":"No Common Movies Found",
            list: resp.results,
            image: ""
          }
        });
        //constructor.addActors(resp.cast);
        console.log(resp);
      }
    });

  },
  actorChange: function(actorId){
    var ids = this.state.actorIds;

    if( ids.indexOf(actorId) == -1 ){
      ids.push(actorId);
    } else {
      ids.splice(ids.indexOf(actorId), 1);
    }

    this.setState({
      actorIds: ids
    });
  },
  actorClick: function(name, value){
    var constructor = this;
    console.log(name);
    var url = this.constructActorUrl(value);
    this.setState({
      display: {
        title: name,
        description: "",
        image: "",
        list: []
      }
    });
      
    reqwest({
      url: url,
      type: 'json',
      crossOrigin: true,
      error: function (err) { },
      success: function (resp) {
        constructor.setState({
          display: {
            title: name,
            description: resp.biography,
            image: resp.profile_path,
            list: []
          }
        });
        //constructor.addActors(resp.cast);
        console.log(resp);
      }
    });
  },
  constructActorUrl: function(actorId){
    return "http://api.themoviedb.org/3/person/"+actorId+"?api_key=c1563e12cbfb0e0448772001b74e67b2";
  },
  constructFindUrl: function(ids){
    return "http://api.themoviedb.org/3/discover/movie?with_cast="+ids.join()+"&api_key=c1563e12cbfb0e0448772001b74e67b2";
  },
  render: function(){
    var list = [];

    var sortedArray = this.props.actorList.filter(function(actor){
      return actor.count > 1;
    }).sort(function(a, b){
      return b.count - a.count;
    });

    _this = this;
    if (sortedArray.length > 0){
      sortedArray.forEach(function(actor){
        if ( actor.count > 1) {
          list.push(<ActorItem
              name={actor.name}
              count={actor.count}
              id={actor.id}
              onActorClick={_this.actorClick}
              onActorChange={_this.actorChange}
            />);
        }
      })
    } else {
      list.push(<tr><td>no results</td><td></td></tr>)
    }

    return (
      <div className="clearfix">
        <div className="col-md-6">
          <h2 className="text-center">Results</h2>
          <form
            onSubmit={this.formSubmit}
          >
            <table
              className="table table-striped"
              >
              <tbody>
              <tr><th>Name</th><th>Count</th></tr>
              {list} 
              </tbody>
            </table>
            <input type="submit" className="btn btn-primary" value="Find Common Movies" />
          </form>
        </div>
        <div className="col-md-6">
          <Display
            title={this.state.display.title}
            description={this.state.display.description}
            image={this.state.display.image}
            list={this.state.display.list}
          />
        </div>
      </div>
    )
  }
})

module.exports = ActorList;
