var React = require("react");

class GroupHead extends React.Component {
  render() {
    let text = this.props.user_total > 0? <p className="group-head-amount">You get back S${parseFloat(this.props.user_total)}</p> : <p className="group-head-amount">You owe S${parseFloat(this.props.user_total)*-1}</p>
    let url = "/blitt/groupList/"+this.props.group_id+"/newBill"
    return (
      <div className="group-head">
            <div className="group-head-img">
                <img src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-black-round/254000/26-512.png"/>
            </div>
            <div className="group-head-name">
                {this.props.group_name}
            </div>
        {text}
        <div className="group-head-buttons-container">
            <a className="settle-up-button" href="#">Settle Up</a>
            <a className="settle-up-button" href={url}>Add Bill</a>
        </div>

      </div>
    );
  }
}

module.exports = GroupHead;
