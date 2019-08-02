var React = require("react");


class SettleBillUserCard extends React.Component {
  render() {
    let net = parseFloat(this.props.net).toFixed(2);
    let text = net>0? <p className="settle-bill-detail-net" style={{color:"red"}}>You owe S${net}</p> : <p className="settle-bill-detail-net" style={{color:"green"}}>Owes you S${net*-1}</p>

    let modaltext = net>0? <span style={{color:"red"}}>S${net}</span> : <span style={{color:"green"}}>S${net*-1}</span>
    let datatarget = "#"+this.props.name
    let submitUrl = "/blitt/groupList/"+this.props.group_id+"/chooseWhoToSettleInGroup/"+this.props.friend_id
    return (
        <div className="settle-bill-container">
            <div className="settle-bill-img">
                <img src="https://kempenfeltplayers.com/wp-content/uploads/2015/07/profile-icon-empty.png"/>
            </div>
            <div className="settle-bill-detail">
                <p className="settle-bill-detail-name">{this.props.name}</p>
                {text}
            </div>
            <div className="settle-bill-selectbutton">
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target={datatarget}>
                  Submit
                </button>
            </div>



            <div class="modal fade" id={this.props.name} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    Confirm to settle bill with {this.props.name} worth {modaltext}?
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
    );
  }
}

module.exports = SettleBillUserCard;
