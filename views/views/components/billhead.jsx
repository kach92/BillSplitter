var React = require("react");
var Categories = require("./categories.json");

class BillHead extends React.Component {
  render() {

    let img_src = Categories.categories_img[this.props.bill_details.category];
    let img_background = {backgroundColor:Categories.categories_color[this.props.bill_details.category]}
    let backUrl = "/blitt/groupList/"+this.props.group_id


    let paidWithTrue = this.props.split_details.filter(x=>{return x.paid===true})
    let canEdit = paidWithTrue.length>0? false:true
    let user_id = parseInt(this.props.user_id);
    let split_details = this.props.split_details.map(x=>{
        let payer_id = x.paid_by_user_id
        let payee_id = x.payee_id

        if(user_id === payee_id){
            if(user_id === payer_id){
                return <div className="bill-head-splitter-line"><img src={x.image}/><p>You paid <span style={{color:"green"}}>S${(parseFloat(x.amount))}</span> </p></div>
                // and owe <span style={{color:"red"}}>S${(parseFloat(x.split_amount))}</span>
            }else{
                if(x.split_amount === 0){
                    return <div className="bill-head-splitter-line"><img src={x.image}/><p>You are not involved</p></div>
                }else if(x.paid){
                    return <div className="bill-head-splitter-line"><img src={x.image}/><p>You owe <span style={{color:"red"}}>S${(parseFloat(x.split_amount))}</span> (paid)</p></div>
                }else{
                    return <div className="bill-head-splitter-line"><img src={x.image}/><p>You owe <span style={{color:"red"}}>S${(parseFloat(x.split_amount))}</span></p></div>
                }

            }

        }else{
            if(payee_id===payer_id){
                return <div className="bill-head-splitter-line"><img src={x.image}/><p>{x.name} paid <span style={{color:"green"}}>S${(parseFloat(x.amount))}</span></p></div>
            }else{
                if(x.split_amount===0){
                    return <div className="bill-head-splitter-line"><img src={x.image}/><p>{x.name} is not involved</p></div>
                }
                else if(x.paid){
                    return <div className="bill-head-splitter-line"><img src={x.image}/><p>{x.name} owe <span style={{color:"red"}}>S${(parseFloat(x.split_amount))}</span> (paid)</p></div>
                }else{
                    return <div className="bill-head-splitter-line"><img src={x.image}/><p>{x.name} owe <span style={{color:"red"}}>S${(parseFloat(x.split_amount))}</span></p></div>
                }

            }
        }

    })
    let group_id = this.props.group_id;
    let bill_id = this.props.bill_id;
    let editUrl = "/blitt/groupList/"+group_id+"/"+bill_id+"/editBill"
    let delteUrl = "/blitt/groupList/"+group_id+"/"+bill_id+"/deleteBill"
    let editDeleteButton = canEdit? <div className="edit-delete-button"><a href={editUrl} className="btn btn-danger">Edit Bill</a><button data-toggle="modal" data-target="#delete-bill" className="btn btn-secondary delete-button">Delete Bill</button></div>:"";




    return (
      <div className="bill-head">
            <div className="bill-head-head-container"style={img_background}>
                <div className="bill-head-img" >

                    <img src={img_src}/>
                </div>
                <div className="bill-head-details">
                    <p className="bill-head-description">{this.props.bill_details.description}</p>
                    <p className="bill-head-amount">S${this.props.bill_details.amount}</p>
                    <p>{this.props.bill_details.created_at}</p>

                </div>
                <a href={backUrl}className="back-to-main-page-button"><img src="https://www.pinclipart.com/picdir/middle/214-2147603_free-returns-return-icon-vector-clipart.png"/></a>
            </div>
            <div className="bill-head-split-container">
                {split_details}
                {editDeleteButton}

            </div>
            <div class="modal fade" id="delete-bill" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Bill</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this bill?
                        </div>
                        <div class="modal-footer">
                            <form action={delteUrl} class="yes-button-modifier"method="POST">
                                <input name="bill_name" value={this.props.bill_details.description} hidden/>
                                <input type ="submit"class="btn btn-primary" value="Yes"/>
                            </form>

                            <button type="button" data-dismiss="modal" class="btn btn-secondary no-button-modifier">No</button>
                        </div>
                    </div>
                </div>
            </div>


      </div>
    );
  }
}

module.exports = BillHead;
