var React = require("react");

class FriendCard extends React.Component {
  render() {

    let url = "/blitt/friendList/"+this.props.friend_id
    let oweList = this.props.group_net.map(x=>{
        let text = "";
        if(x.net>0){
            text = "You owe "+this.props.friend_name+" S$"+x.net+" at "+x.group_name;
        }else{
            text = this.props.friend_name+" owes you S$"+parseFloat(x.net)*-1+" at "+x.group_name
        }
        return <p>{text}</p>
    })

    let userStand = this.props.user_net > 0? "You are owed S$"+this.props.user_net : "You owe S$"+parseFloat(this.props.user_net)*-1;
    return (
      <div className="group-card">
            <p><a href={url}>{this.props.friend_name}</a></p>
            <p>{userStand}</p>
            {oweList}
      </div>
    );
  }
}

module.exports = FriendCard;
