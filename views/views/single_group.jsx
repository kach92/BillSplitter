var React = require("react");
var Default = require("./layout/default");
var Billcard = require("./components/billcard");
var GroupHead = require("./components/grouphead")

class Single_Group extends React.Component {
  render() {
    let user_total = 0;
    let billList = this.props.billList.map(x=>{
        if(x.user_id === x.payer_id){
            user_total+=parseFloat(x.amount)-parseFloat(x.split_amount)
        }else{
            user_total-=parseFloat(x.split_amount)
        }

        return <Billcard bill_id={x.bill_id} category={x.category} description={x.description} created_at={x.created_at} split_amount={x.split_amount} payer_id={x.payer_id} payer_name={x.payer_name} user_id={x.user_id} amount={x.amount} group_id = {this.props.group_id}/>
    })
    let url = "/blitt/groupList/"+this.props.group_id+"/newBill"
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable}>
          <div className="card-slot">

          <GroupHead user_total = {user_total} group_name={this.props.group_name}/>

                {billList}

          </div>

      </Default>
    );
  }
}

module.exports = Single_Group;
