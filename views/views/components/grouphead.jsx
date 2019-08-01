var React = require("react");

class GroupHead extends React.Component {
  render() {
    let text = this.props.user_total > 0? <p className="group-head-amount"style={{color:"green"}}>You get back {parseFloat(this.props.user_total)}</p> : <p className="group-head-amount"style={{color:"red"}}>You owe {parseFloat(this.props.user_total)*-1}</p>

    return (
      <div className="group-head">
            <div className="group-head-img">
                <img src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-black-round/254000/26-512.png"/>
            </div>
            <div className="group-head-name">
                {this.props.group_name}
            </div>
        {text}
        <a className="settle-up-button" href="#">Settle Up</a>
      </div>
    );
  }
}

module.exports = GroupHead;
