var React = require("react");
var Default = require("./layout/default")

class Edit_Profile extends React.Component {
  render() {

    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name}>
            <img className="profile-page-img"src={this.props.result.image}/>

            <p className="user-profile-p">Edit Profile</p>

            <div className="login-container edit-profile-container">
                <form method="POST" action="/blitt/user_profile/edit_profile">
                    <div class="form-group">
                        <label for="testInput1">User Name</label>
                        <input type="test" class="form-control" id="testInput1" placeholder="Enter Username" name="name" value={this.props.result.name}required/>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number (+65)</label>
                        <input type="text" class="form-control"  placeholder="Enter Phone Number (8 digit number)" name="mobile" pattern="[0-9]{8}" value={this.props.result.mobile}required/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <a href="/blitt/user_profile" class="btn btn-primary">Back</a>
                </form>

            </div>


      </Default>
    );
  }
}

module.exports = Edit_Profile;
