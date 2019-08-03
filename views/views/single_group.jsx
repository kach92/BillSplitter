var React = require("react");
var Default = require("./layout/default");
var Billcard = require("./components/billcard");
var GroupHead = require("./components/grouphead")

class Single_Group extends React.Component {
  render() {
    let user_total = 0;
    let billList = this.props.billList.length === 0? <p className="no-bills-text">No Bills Available</p>:this.props.billList.map(x=>{
        if(x.user_id === x.payer_id){
            user_total+=parseFloat(x.amount)-parseFloat(x.split_amount)
        }else{
            user_total-=parseFloat(x.split_amount)
        }

        return <Billcard bill_id={x.bill_id} category={x.category} description={x.description} created_at={x.created_at} split_amount={x.split_amount} payer_id={x.payer_id} payer_name={x.payer_name} user_id={x.user_id} amount={x.amount} group_id = {this.props.group_id} settled={x.settled} paid={x.paid}/>
    })
    let url = "/blitt/groupList/"+this.props.group_id+"/newBill"
    for(let i=0;i<this.props.settled_split_amount_as_payer.length;i++){
        user_total -= this.props.settled_split_amount_as_payer[i].split_amount;
    }

    for(let i=0;i<this.props.settled_split_amount_as_payee.length;i++){
        user_total += this.props.settled_split_amount_as_payee[i].split_amount;
    }

    user_total = user_total.toFixed(2);
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name}>
          <div className="card-slot">

          <GroupHead user_total = {user_total} group_name={this.props.group_details.name} group_id={this.props.group_id} group_image={this.props.group_details.image}/>

                {billList}

          </div>

      </Default>
    );
  }
}

module.exports = Single_Group;
