var React = require("react");
var Default = require("./layout/default")

class Create_Group extends React.Component {
  render() {
    let allUsers = this.props.allUsers.map(x=>{
        return <option>{x.name}</option>
    })

    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable}>
          <div className="login-container">
            <h2>Create Group</h2>
            <form method="POST" action="/blitt/create_group">
              <div class="form-group">
                <label for="group_name">Group Name</label>
                <input type="test" class="form-control" id="group_name" placeholder="Enter Username" name="group_name" required/>
              </div>
              <div class="form-group">
                <label for="selections">Users</label>
                <select type="password" class="form-control" id="selections">
                    <option>Select users to add</option>{allUsers}
                </select>
              </div>
              <input name="selected_users" id="user-takein"readOnly/><br/>
              <button type="submit" class="btn btn-primary">Create</button>
              <a className="btn btn-primary"href="/blitt/">Cancel</a>


            </form>

      </div>
      <script src="/script.js"></script>
      </Default>
    );
  }
}

module.exports = Create_Group;
