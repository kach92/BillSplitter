var React = require("react");
var Default = require("./layout/default")

class Group_Profile extends React.Component {
  render() {
    let url = "/blitt/groupList/"+this.props.group_id+"/groupProfilePost"
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name}>
            <h2 style={{textAlign:"center"}}>{this.props.result[0].name}</h2>
            <img className="profile-page-img"src={this.props.result[0].image}/>

            <p className="user-profile-p">Change Profile pic</p>
            <form enctype="multipart/form-data" action={url} method="POST" className="profile-pic-form">
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

module.exports = Group_Profile;
