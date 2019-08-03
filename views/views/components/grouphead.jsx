var React = require("react");

class GroupHead extends React.Component {
  render() {

    let text = parseFloat(this.props.user_total).toFixed(2) > 0? <p className="group-head-amount">You get back S${this.props.user_total}</p> : (parseFloat(this.props.user_total).toFixed(2) === 0?<p className="group-head-amount">No owings</p>: <p className="group-head-amount">You owe S${parseFloat(this.props.user_total*-1).toFixed(2)}</p>)
    let url = "/blitt/groupList/"+this.props.group_id+"/newBill"
    let settleUrl = "/blitt/groupList/"+this.props.group_id+"/chooseWhoToSettleInGroup";
    let photoUrl = "/blitt/groupList/"+this.props.group_id+"/group_profile";
    return (
      <div className="group-head">
            <div className="group-head-img">
                <a href={photoUrl}><img src={this.props.group_image}/></a>
            </div>
            <div className="group-head-name">
                {this.props.group_name}
            </div>
        {text}
        <div className="group-head-buttons-container">
            <a className="btn btn-danger" href={settleUrl}>Settle Up</a>
            <a className="btn btn-danger delete-button" href={url}>Add Bill</a>
        </div>
        <a href="/blitt/groupList"className="back-to-main-page-button"><img src="https://www.pinclipart.com/picdir/middle/214-2147603_free-returns-return-icon-vector-clipart.png"/></a>
      </div>
    );
  }
}

module.exports = GroupHead;
