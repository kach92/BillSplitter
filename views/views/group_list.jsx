var React = require("react");
var Default = require("./layout/default")
var GroupCard = require("./components/groupcard")

class Group_List extends React.Component {
  render() {
    let groupList = this.props.allGroups.map(x=>{
        return <GroupCard name={x.name} group_id={x.id}/>
    })
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable}>
          <div className="card-slot">
                {groupList}
          </div>

      </Default>
    );
  }
}

module.exports = Group_List;
