var React = require("react");
var Categories = require("./categories.json");

class BillCard extends React.Component {
  render() {
    let user_id = parseInt(this.props.user_id);
    let payer_id = parseInt(this.props.payer_id);
    let url = "/blitt/groupList/"+this.props.group_id+"/"+this.props.bill_id
    let payment = ""
    if(user_id === payer_id){
        payment = <p className="amount-to-pay" style={{color:"green"}}>You lent <span>S${(parseFloat(this.props.amount)-parseFloat(this.props.split_amount))}</span></p>
    }else{
        if(parseFloat(this.props.split_amount)===0){
            payment = <p className="amount-to-pay"style={{color:"grey"}}>You are not involved</p>
        }else{
            payment = <p className="amount-to-pay"style={{color:"red"}}>You borrowed <span>S${this.props.split_amount}</span></p>
        }

    }

    let img_src = Categories.categories_img[this.props.category];
    let img_background = {backgroundColor:Categories.categories_color[this.props.category]}
    return (
      <div className="bill-card">
            <div className="bill-card-img" style={img_background}>

                <img src={img_src}/>
            </div>
            <div className="bill-card-details">
                <p className="bill-card-description"><a href={url}>{this.props.description}</a></p>
                <p className="payer">{this.props.payer_name} paid S${this.props.amount}</p>
            </div>
            <div className="bill-card-amount">
                {payment}
            </div>



            <p className="time-of-bill">{this.props.created_at}</p>

      </div>
    );
  }
}

module.exports = BillCard;
