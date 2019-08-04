var React = require("react");
var Default = require("./layout/default")

class Create_Group extends React.Component {
  render() {
    let allUsers = this.props.allUsers.map(x=>{
        if(x.name === this.props.user_name){
            console.log("don't need")
        }else{
            return <option>{x.name}</option>
        }

    })

    let randomClass = ["btn btn-primary user-name-button","btn btn-secondary user-name-button","btn btn-success user-name-button","btn btn-danger user-name-button","btn btn-warning user-name-button","btn btn-info user-name-button","btn btn-dark user-name-button"]

    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name}>
          <div className="login-container">
            <h2>Create Group</h2>
            <div class="alert alert-dismissible alert-secondary" id="alert-msg"hidden>
                User already in group!
            </div>
            <form method="POST" action="/blitt/create_group">
            <input value="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-black-round/254000/26-512.png"hidden name="image"/>
              <div class="form-group">
                <label for="group_name">Group Name</label>
                <input type="test" class="form-control" id="group_name" placeholder="Enter Group Name" name="group_name" required/>
              </div>
              <div class="form-group">
                <label for="user_selections">Users</label>
                <select type="text" class="form-control" id="user_selections">
                    <option>Select users to add</option>{allUsers}
                </select>
              </div>
              <div className="add-user-into-group-container">
                    <div className={randomClass[Math.floor(Math.random()*7)]}>{this.props.user_name}</div>
              </div>
              <input name="selected_users" id="user-takein" value={this.props.user_name}readOnly hidden/><br/>
              <button type="submit" class="btn btn-outline-danger">Create</button>
              <a className="btn btn-outline-danger"href="/blitt/">Cancel</a>


            </form>

      </div>
      <script src="/script.js"></script>
      </Default>
    );
  }
}

module.exports = Create_Group;
