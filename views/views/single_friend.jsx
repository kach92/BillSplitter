var React = require("react");
var Default = require("./layout/default");


class Single_Friend extends React.Component {
  render() {
    let datatarget = "#test"
    let amount = this.props.user_net>0?<span style={{color:"green"}}>{this.props.friend_details.name} owe you S${this.props.user_net}</span> : (this.props.user_net === 0? <span style={{color:"grey"}}>All cleared</span> : <span style={{color:"red"}}>You owe {this.props.friend_details.name} S${this.props.user_net*-1}</span>)

    let group_details = this.props.result.map(x=>{

        let amount = x.net>0?<p style={{color:"red"}}>You borrowed <span className="group-card-amount-only">S${x.net.toFixed(2)}</span></p>: (x.net === 0? <p style={{color:"grey"}}>You owe nothing</p>:<p style={{color:"green"}}>You lent <span className="group-card-amount-only">S${(x.net*-1).toFixed(2)}</span></p>)
        let groupUrl = "/blitt/groupList/"+x.group_id
            return <div className="single-friend-group-container">
                <div className="single-friend-group-img">
                    <img src={x.image}/>
                </div>
                <div className="single-friend-group-name">
                    <a href={groupUrl} className="group-link">{x.group_name}</a>
                </div>
                <div className="single-friend-group-amount">
                    {amount}
                </div>
            </div>

    })

    let modaltext = this.props.user_net>0? <span style={{color:"green"}}>S${this.props.user_net}</span> : <span style={{color:"red"}}>S${this.props.user_net*-1}</span>

    let submitUrl = "/blitt/friendList/"+this.props.friend_id+"/settleByUser"
    return (
      <Default title={this.props.title} cookieAvailable={this.props.cookieAvailable} user_name={this.props.user_name}>
          <div className="card-slot">
                <div className="single-friend-container">

                    <div className="single-friend-card">
                    <a href="/blitt/friendList"className="back-to-main-page-button"><img src="https://www.pinclipart.com/picdir/middle/214-2147603_free-returns-return-icon-vector-clipart.png"/></a>
                        <div className="single-friend-card-img">
                            <img src={this.props.friend_details.image}/>
                        </div>
                        <div className="single-friend-card-main">
                            <p className="single-friend-card-name">{this.props.friend_details.name}</p>
                            <p className="single-friend-card-amount">{amount}</p>

                        </div>
                        <div className="single-user-button">
                           <div className="settle-bill-selectbutton single-user-modifier ">
                                <button type="button" class="btn btn-danger" data-toggle="modal" data-target={datatarget}>
                                  Settle Up
                                </button>
                            </div>



                            <div class="modal fade" id="test" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    Confirm to settle bill with {this.props.friend_details.name} worth {modaltext}?
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <form method="POST" action={submitUrl}>
                                        <input type="submit"class="btn btn-primary" value="Settle"/>
                                    </form>

                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        {group_details}
                    </div>
                </div>


          </div>

      </Default>
    );
  }
}

module.exports = Single_Friend;
