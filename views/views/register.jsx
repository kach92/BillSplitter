var React = require("react");
var Default = require("./layout/default")

class Register extends React.Component {
  render() {
    return (
      <Default title={this.props.title}>
      <div className="login-container">
            <h2>Register</h2>
            <form method="POST" action="/blitt/register">
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


      </Default>
    );
  }
}

module.exports = Register;
