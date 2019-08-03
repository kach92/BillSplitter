var React = require("react");

class TotalCard extends React.Component {
  render() {
    let total = parseFloat(this.props.user_total)>0? <p style={{color:"green"}}>You are owed S${this.props.user_total}</p>: (parseFloat(this.props.user_total)===0?<p style={{color:"grey"}}>You have no expenses yet</p>:<p style={{color:"red"}}>You owe S${parseFloat(this.props.user_total)*-1}</p>)

    return (
      <div className="total-card">
            <div className="total-card-img">
                <a href="/blitt/user_profile"><img src={this.props.user_details.image}/></a>
            </div>
            <div className="total-card-details">
                <p className="total-card-word">Total Balance</p>
                {total}
            </div>

      </div>
    );
  }
}

module.exports = TotalCard;
