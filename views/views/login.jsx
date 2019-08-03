var React = require("react");
var Default = require("./layout/default")

class Login extends React.Component {
  render() {
    let loginAlert = this.props.failLogin? <div class="alert alert-secondary" role="alert">Username or password invalid.</div>:""
    let loginOrLogout = this.props.cookieAvailable?"Log Out":"Login";
    let url = this.props.cookieAvailable? "/blitt/logout":"/blitt/login";
    return (

    <html>
        <head>
            <title>Blitt Login</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/css/bootstrap.css"></link>
            <link rel="stylesheet" type="text/css" href="/css/style.css"></link>
        </head>

        <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-success">
          <a class="navbar-brand" href="/blitt">Blitt</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto ">
              <li class="nav-item active ">
                <a class="nav-link" href={url}>{loginOrLogout}<span class="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>

        </nav>
        <div className="main-container">

            <div className="main-content">{this.props.children}</div>
        </div>

            <div className="login-container">
                <h2>Login</h2>
                {loginAlert}
                <form method="POST" action="/blitt/login">
                  <div class="form-group">
                    <label for="testInput1">User Name</label>
                    <input type="test" class="form-control" id="testInput1" placeholder="Enter Username" name="name" required/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password" required/>
                  </div>
                  <button type="submit" class="btn btn-outline-success">Login</button>
                  <a className="btn btn-outline-success"href="/blitt/register">Register</a>
                </form>

            </div>

        </body>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </html>


    );
  }
}

module.exports = Login;
