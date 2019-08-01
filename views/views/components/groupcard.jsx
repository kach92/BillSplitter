var React = require("react");

class GroupCard extends React.Component {
  render() {

    let member_list = this.props.members_net.map(x=>{
        let text = x.net>0? "You owe "+x.name+" S$"+x.net : x.name+" owes you S$ "+x.net*-1;
        return <p>{text}</p>
    })

    let url = "/blitt/groupList/"+this.props.group_id

    let user_owing = this.props.user_net>0?<p>You are owed S${this.props.user_net}</p>:<p>You owe S${this.props.user_net*-1}</p>;
    return (
      <div className="group-card">
            <p><a href={url}>{this.props.group_name}</a></p>
            {user_owing}
            {member_list}
      </div>
    );
  }
}

module.exports = GroupCard;
