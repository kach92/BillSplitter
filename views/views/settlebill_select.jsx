var React = require("react");
var Default = require("./layout/default");
var SettleBillUserCard = require("./components/settlebillusercard");

class Settlebill_Select extends React.Component {
  render() {
    let listOfPeopleToPay = this.props.result.map(x=>{

        return <SettleBillUserCard user_id ={this.props.user_id} group_id = {this.props.group_id} net={x.net} name={x.name} friend_id = {x.friend_id}/>
    })


    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name}>
          <div className="card-slot">
            <h3 className="settle-bill-heading">Who do you want to settle with?</h3>
            {listOfPeopleToPay}

          </div>

      </Default>
    );
  }
}

module.exports = Settlebill_Select;
