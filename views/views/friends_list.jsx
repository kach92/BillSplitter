var React = require("react");
var Default = require("./layout/default")
var FriendCard = require("./components/friendcard")

class Friend_List extends React.Component {
  render() {

    let friendList = this.props.result.map(x=>{

        return <FriendCard friend_name={x.friend_name} friend_id={x.friend_id} group_net={x.group_net} user_net={x.user_net}/>
    })

    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable}>
          <div className="card-slot">
                {friendList}
          </div>

      </Default>
    );
  }
}

module.exports = Friend_List;
