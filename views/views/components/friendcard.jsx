var React = require("react");

class FriendCard extends React.Component {
  render() {

    let url = "/blitt/friendList/"+this.props.friend_id
    let oweList = this.props.group_net.map(x=>{

        return x.net>0? <p>You owe {this.props.friend_name} <span style={{color:"red"}}>S${x.net.toFixed(2)}</span> at <span style={{fontWeight:"bold"}}>{x.group_name}</span></p> : <p>{this.props.friend_name} owes you <span style={{color:"green"}}>S${(parseFloat(x.net)*-1).toFixed(2)}</span> at <span style={{fontWeight:"bold"}}>{x.group_name}</span></p>;
    })


    let userStand = this.props.user_net>0?<p style={{color:"green"}}>You are owed <span className="group-card-amount-only">S${this.props.user_net.toFixed(2)}</span></p>:<p style={{color:"red"}}>You owe <span className="group-card-amount-only">S${(this.props.user_net*-1).toFixed(2)}</span></p>;
    return (
      <div className="group-card">
            <div className="group-card-img">
                <img src="http://pcm.um.edu.my/wp-content/uploads/2017/11/empty-avatar-700x480.png"/>
            </div>
            <div className="group-card-main">
                <p className="group-name"><a href={url}>{this.props.friend_name}</a></p>
                <div className="member-list">
                    {oweList}

                </div>


            </div>
            <div className="group-card-amount">
                {userStand}
            </div>

      </div>
    );
  }
}

module.exports = FriendCard;
