var React = require("react");
var Default = require("./layout/default");
var GroupCard = require("./components/groupcard");
var TotalCard = require("./components/totalcard");

class Group_List extends React.Component {
  render() {

    let groupList = this.props.result.map(x=>{
        return <GroupCard group_name={x.group_name} group_id={x.group_id} members_net={x.members_net} user_net={x.user_net} group_image = {x.group_image}/>
    })
    let url = "/blitt/create_group"
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name}>
            <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
              <li class="nav-item ">
                <a class="nav-link" id="home-tab"  href="/blitt" role="tab" >Personal</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link  active" id="profile-tab"  href="/blitt/groupList" role="tab" >Group</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="contact-tab"  href="/blitt/friendList" role="tab" >Friends</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="activity-tab"  href="/blitt/activityList" role="tab" >Activity</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">

                <div className="card-slot">
                <TotalCard user_total = {this.props.user_total} user_details={this.props.user_details}/>
                <a href={url}className="btn btn-outline-danger create-new-group-button">Create New Group</a>
                    {groupList}
                </div>
            </div>




      </Default>
    );
  }
}

module.exports = Group_List;
