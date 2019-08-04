var React = require('react');

class Default extends React.Component {
  render() {
    let loginOrLogout = this.props.cookieAvailable?"Log Out":"Login";
    let url = this.props.cookieAvailable? "/blitt/logout":"/blitt/login";

    return (
      <html>
          <head>
              <title>{this.props.title}</title>

              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>

              <link rel="stylesheet" type="text/css" href="/css/bootstrap.css"></link>
              <link rel="stylesheet" type="text/css" href="/css/style.css"></link>

              <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js"></script>
          </head>
        <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-success nav-bar-modifier">
          <a class="navbar-brand" href="/blitt">Blitt</a>
          {/*<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">

          </div>*/}
          <ul class="navbar-nav">
              <li class="nav-item active ">
                <a class="nav-link" href={url}>{loginOrLogout}<span class="sr-only">(current)</span></a>
              </li>
            </ul>

        </nav>
        <div className="user-banner">Welcome {this.props.user_name}</div>
        <div className="main-container">

            <div className="main-content">{this.props.children}</div>
        </div>


                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


        </body>
      </html>
    );
  }
}

module.exports = Default;