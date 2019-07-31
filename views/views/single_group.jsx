var React = require("react");
var Default = require("./layout/default");
var Billcard = require("./components/billcard")

class Single_Group extends React.Component {
  render() {
    let billList = this.props.billList.map(x=>{
        return <Billcard bill_id={x.bill_id} category={x.category} description={x.description} created_at={x.created_at} split_amount={x.split_amount} payer_id={x.payer_id} payer_name={x.payer_name} user_id={x.user_id} amount={x.amount}/>
    })
    let url = "/blitt/groupList/"+this.props.group_id+"/newBill"
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable}>
          <div className="card-slot">
            {billList}
          <div className="add-sign"><a href={url}>+</a></div>
          </div>

      </Default>
    );
  }
}

module.exports = Single_Group;
