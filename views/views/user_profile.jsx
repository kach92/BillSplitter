var React = require("react");
var Default = require("./layout/default")

class User_Profile extends React.Component {
  render() {
    let passwordChange = this.props.password?<div class="alert alert-success" role="alert">
  Password change successful.
</div>:"";
    let editChange = this.props.edit?<div class="alert alert-success" role="alert">
  Edit profile successful.
</div>:"";
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name}>
            <img className="profile-page-img"src={this.props.result.image}/>

            <p className="user-profile-p">Change Profile pic</p>
            <form enctype="multipart/form-data" action="/blitt/user_profile/postProfilePic" method="POST" className="profile-pic-form">
                <div class="form-group">
                    <div class="input-group mb-3">
                        <div class="custom-file">
                            <input type="file" name="myFile"class="custom-file-input" id="inputGroupFile02"/>
                            <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
                        </div>
                        <div class="input-group-append">
                            <input class="input-group-text"type="submit" value="Upload"/>
                        </div>
                    </div>
                </div>
                {passwordChange}
                {editChange}
                <table className="table table-bordered">
                    <tr>
                        <th scope="row">Name</th>
                        <td>{this.props.result.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Phone Number</th>
                        <td>{this.props.result.mobile}</td>
                    </tr>
                </table>
                <div className="user-page-edit-container">
                    <a className="btn btn-danger" href="/blitt/user_profile/edit_profile">Edit Profile</a>
                    <a className="btn btn-danger delete-button" href="/blitt/user_profile/change_password">Change Password</a>
                </div>
            </form>


      </Default>
    );
  }
}

module.exports = User_Profile;
