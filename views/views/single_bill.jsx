var React = require("react");
var Default = require("./layout/default");
var BillHead = require("./components/billhead");

class Single_Group extends React.Component {
  render() {

    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable}>
          <div className="card-slot">
          <BillHead split_details={this.props.splitDetails} user_id = {this.props.user_id} bill_details={this.props.billDetails}/>

          </div>

      </Default>
    );
  }
}

module.exports = Single_Group;
