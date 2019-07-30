var React = require("react");
var Default = require("./layout/default")

class Home extends React.Component {
  render() {
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable}>
          <h3>Hello</h3>
      </Default>
    );
  }
}

module.exports = Home;
