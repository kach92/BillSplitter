var React = require("react");
var Categories = require("./categories.json");

class BillHead extends React.Component {
  render() {

    let img_src = Categories.categories_img[this.props.bill_details.category];
    let img_background = {backgroundColor:Categories.categories_color[this.props.bill_details.category]}
    let backUrl = "/blitt/groupList/"+this.props.group_id

    let canEdit = true;

    let user_id = parseInt(this.props.user_id);
    let split_details = this.props.split_details.map(x=>{
        let payer_id = x.paid_by_user_id
        let payee_id = x.payee_id
        canEdit = x.paid? false:true;
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
    let editDeleteButton = canEdit? <div className="edit-delete-button"><a href={editUrl} className="btn btn-danger">Edit Bill</a><a href="#" className="btn btn-secondary delete-button">Delete Bill</a></div>:"";


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





      </div>
    );
  }
}

module.exports = BillHead;
