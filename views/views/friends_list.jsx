var React = require("react");
var Default = require("./layout/default");
var FriendCard = require("./components/friendcard");
var TotalCard = require("./components/totalcard");

class Friend_List extends React.Component {
  render() {

    let friendList = this.props.result.map(x=>{

        return <FriendCard friend_name={x.friend_name} friend_id={x.friend_id} group_net={x.group_net} user_net={x.user_net} friend_image={x.friend_image}/>
    })

    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name}>
          <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
          <li class="nav-item ">
            <a class="nav-link" id="home-tab"  href="/blitt" role="tab" >Personal</a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" id="profile-tab"  href="/blitt/groupList" role="tab" >Group</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" id="contact-tab"  href="/blitt/friendList" role="tab" >Friends</a>
          </li>
          <li class="nav-item">
                <a class="nav-link" id="activity-tab"  href="/blitt/activityList" role="tab" >Activity</a>
              </li>
        </ul>
        <div class="tab-content" id="myTabContent">
                <div className="card-slot">
                <TotalCard user_total = {this.props.user_total} user_details={this.props.user_details}/>
                    {friendList}
                </div>
        </div>


      </Default>
    );
  }
}

module.exports = Friend_List;
