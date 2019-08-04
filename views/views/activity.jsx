var React = require("react");
var Default = require("./layout/default");
var GroupCard = require("./components/groupcard");
var TotalCard = require("./components/totalcard");

class Activity extends React.Component {
  render() {
    let activity_list = this.props.result.map(x=>{
        if(x.category === "added"){
            let persona = "";
            let url = "/blitt/groupList/"+x.group_id+"/"+x.bill_id;
            let groupUrl = "/blitt/groupList"+x.group_id;
            if(parseInt(this.props.user_id) === parseInt(x.user_id)){
                persona = "You"
            }else{
                persona = x.user_name
            }
            return <div class="card  mb-3 activity-card-modifier">
              <div class="card-header bg-success activity-card-header-modifier">{x.created_at}<span className="mark">Add Bill</span></div>
              <div class="card-body activity-card-body-modifier">

                <p class="card-text activity-card-text-modifier"><span>{persona}</span> {x.category} "<span className="activity-strong-text"><a href={url}>{x.bill_name}</a></span>" bill into "<span className="activity-strong-text"><a href={groupUrl}>{x.activity}</a></span>" group.</p>
              </div>
            </div>


        }else if(x.category === "created"){
            let persona = "";
            let url = "/blitt/groupList/"+x.group_id
            if(parseInt(this.props.user_id) === parseInt(x.user_id)){
                persona = "You"
            }else{
                persona = x.user_name
            }
            return <div class="card  mb-3 activity-card-modifier">
              <div class="card-header bg primary activity-card-header-modifier">{x.created_at}<span className="mark">Create Group</span></div>
              <div class="card-body activity-card-body-modifier">

                <p class="card-text activity-card-text-modifier"><span>{persona}</span> {x.category} <span className="activity-strong-text">"<a href={url}>{x.activity}</a>"</span> group.</p>
              </div>
            </div>
        }else if(x.category === "settled"){
            if(x.group_id===null){
                let persona = "";
                let secondPersona = "";
                let url = "/blitt/groupList/"+x.group_id
                if(parseInt(this.props.user_id) === parseInt(x.user_id)){
                    persona = "You";
                    secondPersona = x.other_user_name;
                }else if(parseInt(this.props.user_id) === parseInt(x.other_user_id)){
                    persona = x.user_name;
                    secondPersona = "you";
                }else{
                    persona = x.user_name;
                    secondPersona = x.other_user_name;
                }
                return <div class="card  mb-3 activity-card-modifier">
                  <div class="card-header bg-warning activity-card-header-modifier">{x.created_at}<span className="mark">Settle Bill</span></div>
                  <div class="card-body activity-card-body-modifier">

                    <p class="card-text activity-card-text-modifier"><span>{persona}</span> {x.category} owings with {secondPersona} worth S${x.amount}</p>
                  </div>
                </div>
            }else{
                let persona = "";
                let secondPersona = "";
                let url = "/blitt/groupList/"+x.group_id
                if(parseInt(this.props.user_id) === parseInt(x.user_id)){
                    persona = "You";
                    secondPersona = x.other_user_name;
                }else if(parseInt(this.props.user_id) === parseInt(x.other_user_id)){
                    persona = x.user_name;
                    secondPersona = "you";
                }else{
                    persona = x.user_name;
                    secondPersona = x.other_user_name;
                }
                return <div class="card  mb-3 activity-card-modifier">
                  <div class="card-header bg-warning activity-card-header-modifier">{x.created_at}<span className="mark">Settle Bill</span></div>
                  <div class="card-body activity-card-body-modifier">

                    <p class="card-text activity-card-text-modifier"><span>{persona}</span> {x.category} owings with {secondPersona} in <span className="activity-strong-text">"<a href={url}>{x.activity}</a>"</span> group worth S${x.amount}</p>
                  </div>
                </div>
            }
        }else if(x.category === "edited"){
            let persona = "";
            let url = "/blitt/groupList/"+x.group_id
            let billUrl = "/blitt/groupList/"+x.group_id+"/"+x.bill_id
            if(parseInt(this.props.user_id) === parseInt(x.user_id)){
                persona = "You"
            }else{
                persona = x.user_name
            }
            return <div class="card  mb-3 activity-card-modifier">
              <div class="card-header bg-info activity-card-header-modifier">{x.created_at}<span className="mark">Edit Bill</span></div>
              <div class="card-body activity-card-body-modifier">

                <p class="card-text activity-card-text-modifier"><span>{persona}</span> {x.category} <span className="activity-strong-text">"<a href={billUrl}>{x.bill_name}</a>"</span> bill in <span className="activity-strong-text">"<a href={url}>{x.activity}</a>"</span> group.</p>
              </div>
            </div>
        }else if(x.category === "deleted"){
            let persona = "";
            let url = "/blitt/groupList/"+this.props.group_id
            if(parseInt(this.props.user_id) === parseInt(x.user_id)){
                persona = "You"
            }else{
                persona = x.user_name
            }
            return <div class="card  mb-3 activity-card-modifier">
              <div class="card-header bg-secondary activity-card-header-modifier">{x.created_at}<span className="mark">Delete Bill</span></div>
              <div class="card-body activity-card-body-modifier">

                <p class="card-text activity-card-text-modifier"><span>{persona}</span> {x.category} <span className="activity-strong-text">"{x.bill_name}"</span> bill from <span className="activity-strong-text">"<a href={url}>{x.activity}</a>"</span> group.</p>
              </div>
            </div>
        }
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
                <a class="nav-link" id="contact-tab"  href="/blitt/friendList" role="tab" >Friends</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" id="activity-tab"  href="/blitt/activityList" role="tab" >Activty</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">

                <div className="card-slot">
                    {activity_list}
                </div>

            </div>




      </Default>
    );
  }
}

module.exports = Activity;
