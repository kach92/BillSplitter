var React = require("react");

class GroupCard extends React.Component {
  render() {
    let url = "/blitt/groupList/"+this.props.group_id
    return (
      <div className="group-card">
            <p><a href={url}>{this.props.name}</a></p>
      </div>
    );
  }
}

module.exports = GroupCard;
