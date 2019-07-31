var React = require("react");
var Default = require("./layout/default")
var GroupCard = require("./components/groupcard")

class Group_List extends React.Component {
  render() {



    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable}>
          <div className="card-slot">

          </div>

      </Default>
    );
  }
}

module.exports = Group_List;
