var React = require("react");
var Default = require("./layout/default")

class Home extends React.Component {
  render() {
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name} user_name={this.props.user_name}>

          <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
              <li class="nav-item ">
                <a class="nav-link active" id="home-tab"  href="/blitt" role="tab" >Personal</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link" id="profile-tab"  href="/blitt/groupList" role="tab" >Group</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="contact-tab"  href="/blitt/friendList" role="tab" >Friends</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">

            </div>
      </Default>
    );
  }
}

module.exports = Home;
