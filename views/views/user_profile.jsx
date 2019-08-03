var React = require("react");
var Default = require("./layout/default")

class User_Profile extends React.Component {
  render() {

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
            </form>

      </Default>
    );
  }
}

module.exports = User_Profile;
