var React = require("react");

class BillCard extends React.Component {
  render() {
    let user_id = parseInt(this.props.user_id);
    console.log(this.props.user_id)
    let payer_id = parseInt(this.props.payer_id);
    console.log(user_id)
    console.log(payer_id)
    let payment = ""
    if(user_id === payer_id){
        payment = "You lent S$ "+(parseInt(this.props.amount)-parseInt(this.props.split_amount))
    }else{
        payment = "You borrowed S$ "+this.props.split_amount
    }

    return (
      <div className="bill-card">
            <p>{this.props.description}</p>
            <p>Category : {this.props.category}</p>
            <p className="payer">{this.props.payer_name} paid S${this.props.amount}</p>
            <p className="amount-to-pay">{payment}</p>
            <p className="time-of-bill">{this.props.created_at}</p>

      </div>
    );
  }
}

module.exports = BillCard;
