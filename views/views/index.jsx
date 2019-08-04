var React = require("react");
var Default = require("./layout/default")

class Home extends React.Component {
  render() {
    let data = {
        test: this.props.result,
        cat: this.props.category_expenses
    };
    let jData = JSON.stringify(data);

    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name} user_name={this.props.user_name}>

        <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
            <li class="nav-item ">
                <a class="nav-link active" id="home-tab"  href="/blitt" role="tab" >Personal</a>
            </li>
            <li class="nav-item ">
                <a class="nav-link" id="profile-tab"  href="/blitt/groupList" role="tab" >Group</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="contact-tab"  href="/blitt/friendList" role="tab" >Friends</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="activity-tab"  href="/blitt/activityList" role="tab" >Activty</a>
              </li>
        </ul>
            <div class="tab-content tab-modifier" id="myTabContent">

                <ul class="nav nav-tabs justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#home">Daily</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#profile">Category</a>
                    </li>

                </ul>
                <div id="anotherTabContent" class="tab-content">
                    <div class="tab-pane fade active show" id="home">
                        <canvas id="myChart" width="400" height="200"></canvas>
                    </div>
                    <div class="tab-pane fade" id="profile">
                        <canvas id="categoryChart" width="400" height="200"></canvas>
                    </div>

                </div>


            </div>
                <div className="profile-cards-container">
                <div class="card border-success mb-3" style={{width: "230px"}}>
                    <div class="card-header">Total Expenses</div>
                    <div class="card-body">
                        <p class="card-text">S$ {this.props.totalExpenses.toFixed(2)}</p>
                    </div>
                </div>
                <div class="card border-secondary mb-3" style={{width: "230px"}}>
                    <div class="card-header">Total Borrowed</div>
                    <div class="card-body">

                        <p class="card-text" style={{color:"#ff7751"}}>S$ {this.props.totalBorrowed.toFixed(2)}</p>
                    </div>
                </div>
                <div class="card border-info mb-3" style={{width: "230px"}}>
                    <div class="card-header">Total Lent</div>
                    <div class="card-body">

                    <p class="card-text" style={{color:"#55cc9d"}}>S$ {this.props.totalLent.toFixed(2)}</p>
                    </div>
                </div>
                </div>
                <p className="small-note">All expenses are calculated based on last 30 days period</p>
            <script dangerouslySetInnerHTML={ {__html:
                    `var expenses = ${jData};`
                  }}/>
            <script src="/chart.js"></script>


      </Default>
    );
  }
}

module.exports = Home;
