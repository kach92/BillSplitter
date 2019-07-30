var React = require("react");
var Default = require("./layout/default")

class Login extends React.Component {
  render() {
    return (
      <Default title={this.props.title}>
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
              <button type="submit" class="btn btn-primary">Login</button>
              <a className="btn btn-primary"href="/blitt/register">Register</a>
            </form>

      </div>


      </Default>
    );
  }
}

module.exports = Login;
