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
        <nav class="navbar navbar-expand-lg navbar-dark bg-success nav-bar-modifier">
          <a class="navbar-brand" href="/blitt">Blitt</a>


            <ul class="navbar-nav ">
              <li class="nav-item active ">
                <a class="nav-link" href={url}>{loginOrLogout}<span class="sr-only">(current)</span></a>
              </li>
            </ul>


        </nav>
            <div className="login-page-container">

                <div class="bd-example">
                  <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                      <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                      <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src="https://u.realgeeks.media/nwmoderngroup/commercial.jpg" className="d-block w-100" alt="..."/>
                        <div class="carousel-caption d-none d-md-block">
                          <h5>First slide label</h5>
                          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img src="https://d2z1w4aiblvrwu.cloudfront.net/ad/dgkK/jim-beam-black-friends-large-6.jpg" class="d-block w-100" alt="..."/>
                        <div class="carousel-caption d-none d-md-block">
                          <h5>Second slide label</h5>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" className="d-block w-100" alt="..."/>
                        <div class="carousel-caption d-none d-md-block">
                          <h5>Third slide label</h5>
                          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </div>
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
                <div className="login-container login-container-modifier">
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
