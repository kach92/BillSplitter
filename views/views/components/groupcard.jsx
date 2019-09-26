var React = require("react");

class GroupCard extends React.Component {
  render() {

    let member_list = this.props.members_net.map(x=>{
        console.log(typeof x.net)
        if(x.net.toFixed(2) == 0){
            return null
        }else{
            return x.net.toFixed(2)>0? <p>You owe {x.name} <span style={{color:"red"}}>S${x.net}</span></p> : <p>{x.name} owes you <span style={{color:"green"}}>S${x.net*-1}</span></p>;
        }

    })

    let url = "/blitt/groupList/"+this.props.group_id

    let user_owing = this.props.user_net>0?<p style={{color:"green"}}>You are owed <span className="group-card-amount-only">S${this.props.user_net.toFixed(2)}</span></p>: (this.props.user_net === 0? <p style={{color:"grey"}}>Settled</p>:<p style={{color:"red"}}>You owe <span className="group-card-amount-only">S${(this.props.user_net*-1).toFixed(2)}</span></p>)


    return (
      <div className="group-card">
            <div className="group-card-img">
                <img src={this.props.group_image}/>
            </div>
            <div className="group-card-main">
                <p className="group-name"><a href={url}>{this.props.group_name}</a></p>
                <div className="member-list">
                    {member_list}

                </div>


            </div>
            <div className="group-card-amount">
                {user_owing}
            </div>



      </div>
    );
  }
}

module.exports = GroupCard;
