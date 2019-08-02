var React = require("react");
var Default = require("./layout/default")

class Login extends React.Component {
  render() {
    return (
    <html>
        <head>
            <title>Blitt Login</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/css/bootstrap.css"></link>
            <link rel="stylesheet" type="text/css" href="/css/style.css"></link>
        </head>

        <body>

            <div className="login-container">
                <h2>Login</h2>
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
