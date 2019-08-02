var React = require("react");
var Categories = require("./categories.json");

class BillHead extends React.Component {
  render() {

    let img_src = Categories.categories_img[this.props.bill_details.category];
    let img_background = {backgroundColor:Categories.categories_color[this.props.bill_details.category]}



    let user_id = parseInt(this.props.user_id);
    let split_details = this.props.split_details.map(x=>{
        let payer_id = x.paid_by_user_id
        let payee_id = x.payee_id
        if(user_id === payee_id){
            if(user_id === payer_id){
                return <div className="bill-head-splitter-line"><img/><p>You paid <span style={{color:"green"}}>S${(parseFloat(x.amount)-parseFloat(x.split_amount))}</span> and owe <span style={{color:"red"}}>S${(parseFloat(x.split_amount))}</span></p></div>
            }else{
                return <div className="bill-head-splitter-line"><img/><p>You owe <span style={{color:"red"}}>S${(parseFloat(x.split_amount))}</span></p></div>
            }

        }else{
            if(payee_id===payer_id){
                return <div className="bill-head-splitter-line"><img/><p>{x.name} paid <span style={{color:"green"}}>S${(parseFloat(x.amount)-parseFloat(x.split_amount))}</span> and owe <span style={{color:"red"}}>S${(parseFloat(x.split_amount))}</span></p></div>
            }else{
                return <div className="bill-head-splitter-line"><img/><p>{x.name} owe <span style={{color:"red"}}>S${(parseFloat(x.split_amount))}</span></p></div>
            }
        }

    })


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

            </div>
            <div className="bill-head-split-container">
                {split_details}
                <a href="#" className="btn btn-danger">Edit Bill</a>
                <a href="#" className="btn btn-danger delete-button">Delete Bill</a>
            </div>





      </div>
    );
  }
}

module.exports = BillHead;
