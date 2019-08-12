var React = require("react");


class SettleBillUserCard extends React.Component {
  render() {

    let net = parseFloat(this.props.net).toFixed(2);
    let text = net>0? <p className="settle-bill-detail-net" style={{color:"red"}}>You owe S${net}</p> : <p className="settle-bill-detail-net" style={{color:"green"}}>Owes you S${net*-1}</p>

    let modaltext = net>0? <span style={{color:"red"}}>S${net}</span> : <span style={{color:"green"}}>S${net*-1}</span>
    let justAmount = net>0? parseFloat(net).toFixed(2):(parseFloat(net)*-1).toFixed(2);
    let datatarget = "#"+this.props.name.split(" ")[0];
    let submitUrl = "/blitt/groupList/"+this.props.group_id+"/chooseWhoToSettleInGroup/"+this.props.friend_id
    return (
        <div className="settle-bill-container">
            <div className="settle-bill-img">
                <img src={this.props.image}/>
            </div>
            <div className="settle-bill-detail">
                <p className="settle-bill-detail-name">{this.props.name}</p>
                {text}
            </div>
            <div className="testing">
                <div className="settle-bill-selectbutton">
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target={datatarget}>
                      Submit
                    </button>
                    <button type="button" class="btn btn-danger qr-button">
                        QR Code
                    </button>
                </div>
                <div className="qr-container">
                    <input class="qr-phone"value={this.props.mobile} hidden/>
                    {/*<img className="qr-image" hidden/>*/}
                </div>
            </div>



            <div class="modal fade" id={this.props.name.split(" ")[0]} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <input name="amount" type="number" step="0.01"value={justAmount}hidden/>
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
