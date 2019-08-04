var React = require("react");
var Default = require("./layout/default")

class Register extends React.Component {
  render() {
    if(this.props.exists){

    }
    let loginOrLogout = this.props.cookieAvailable?"Log Out":"Login";
    let url = this.props.cookieAvailable? "/blitt/logout":"/blitt/login";
    let existAlert = this.props.exists? <div class="alert alert-secondary" role="alert">User already exist!</div>:""
    let passwordAlert = this.props.password? <div class="alert alert-secondary" role="alert">Password not match!</div>:""

    return (
        <html>
        <head>
            <title>Blitt Login</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/css/bootstrap.css"></link>
            <link rel="stylesheet" type="text/css" href="/css/style.css"></link>
        </head>

        <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-success nav-bar-modifier">
          <a class="navbar-brand" href="/blitt">Blitt</a>

            <ul class="navbar-nav mr-auto ">
              <li class="nav-item active ">
                <a class="nav-link" href={url}>{loginOrLogout}<span class="sr-only">(current)</span></a>
              </li>
            </ul>


        </nav>
        <div className="main-container">
      <div className="login-container">
            <h2>Register</h2>
            {existAlert}
            {passwordAlert}
            <form method="POST" action="/blitt/register">
                <input name="image" value="https://www.startupdelta.org/wp-content/uploads/2018/04/No-profile-LinkedIn.jpg" id="hidden-profile-details" hidden/>
                <div class="form-group">
                    <label for="testInput1">User Name</label>
                    <input type="test" class="form-control" id="testInput1" placeholder="Enter Username" name="name"required/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password" required/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword2">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Confirm Password" name="confirmPassword" required/>
                </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>

      </div>
      </div>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>

    </html>

    );
  }
}

module.exports = Register;
