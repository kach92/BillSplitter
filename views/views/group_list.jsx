var React = require("react");
var Default = require("./layout/default")
var GroupCard = require("./components/groupcard")

class Group_List extends React.Component {
  render() {

    let groupList = this.props.result.map(x=>{

        return <GroupCard group_name={x.group_name} group_id={x.group_id} members_net={x.members_net} user_net={x.user_net}/>
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
