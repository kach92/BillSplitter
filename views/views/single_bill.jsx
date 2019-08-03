var React = require("react");
var Default = require("./layout/default");
var BillHead = require("./components/billhead");

class Single_Group extends React.Component {
  render() {

    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name}>
          <div className="card-slot">
          <BillHead split_details={this.props.splitDetails} user_id = {this.props.user_id} bill_details={this.props.billDetails} group_id = {this.props.group_id} bill_id = {this.props.bill_id}/>

          </div>

      </Default>
    );
  }
}

module.exports = Single_Group;
