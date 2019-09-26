var React = require("react");

class FriendCard extends React.Component {
  render() {

    let url = "/blitt/friendList/"+this.props.friend_id
    let oweList = this.props.group_net.map(x=>{
        let groupUrl = "/blitt/groupList/"+x.group_id
        return x.net.toFixed(2)>0? <p>You owe {this.props.friend_name} <span style={{color:"red"}}>S${x.net.toFixed(2)}</span> at <span style={{fontWeight:"bold"}}><a href={groupUrl}className="group-link">{x.group_name}</a></span></p> : x.net.toFixed(2) < 0 ? <p>{this.props.friend_name} owes you <span style={{color:"green"}}>S${(parseFloat(x.net)*-1).toFixed(2)}</span> at <span style={{fontWeight:"bold"}}><a href={groupUrl}className="group-link">{x.group_name}</a></span></p> : null
    })


    let userStand = this.props.user_net>0?<p style={{color:"green"}}>You are owed <span className="group-card-amount-only">S${this.props.user_net.toFixed(2)}</span></p>:(this.props.user_net === 0?<p style={{color:"grey"}}>Settled</p> : <p style={{color:"red"}}>You owe <span className="group-card-amount-only">S${(this.props.user_net*-1).toFixed(2)}</span></p>);
    return (
      <div className="group-card">
            <div className="group-card-img">
                <img src={this.props.friend_image}/>
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
