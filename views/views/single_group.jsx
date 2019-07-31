var React = require("react");
var Default = require("./layout/default");

class Single_Group extends React.Component {
  render() {
    let url = "/blitt/groupList/"+this.props.group_id+"/newBill"
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable}>
          <div className="card-slot">

          <div className="add-sign"><a href={url}>+</a></div>
          </div>

      </Default>
    );
  }
}

module.exports = Single_Group;
