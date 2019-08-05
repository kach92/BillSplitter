var React = require("react");
var Default = require("./layout/default")

class Login extends React.Component {
  render() {
    let loginAlert = this.props.failLogin? <div class="alert alert-secondary" role="alert">Username or password invalid.</div>:""
    let loginOrLogout = this.props.cookieAvailable?"Log Out":"Login";
    let url = this.props.cookieAvailable? "/blitt/logout":"/blitt/login";
    let register = this.props.register? <div class="alert alert-dismissible alert-success">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  Register Successful!
</div>:""
    return (

    <html>
        <head>
            <title>Blitt Login</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/css/bootstrap.css"></link>
            <link rel="stylesheet" type="text/css" href="/css/style.css"></link>
        </head>

        <body>

            <div className="login-page-container">

                <div class="bd-example">
                  <div id="carouselExampleCaptions" class="carousel slide carousel-slide-modifier" data-ride="carousel">

                    <div class="carousel-inner carousel-inner-modifier">
                      <div class="carousel-item active carousel-item-modifier item-1">


                        <div className="carousel-image-modifier image-1"></div>
                        <h2 className="image-1-welcome">Welcome to <span>Blitt</span></h2>
                        <p>A Bill Splitting app for your friends and family</p>
                      </div>

                    </div>

                  </div>
                </div>
                <div className="login-container login-container-modifier">
                    <h2>Login</h2>
                    {loginAlert}
                    {register}
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

        </div>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>

    </html>


    );
  }
}

module.exports = Login;
