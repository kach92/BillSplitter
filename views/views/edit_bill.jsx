var React = require("react");
var Default = require("./layout/default")
var Categories = require("./components/categories.json");


class Create_Bill extends React.Component {
  render() {

    let category_list = Categories.categories.map(x=>{
        return <option>{x}</option>
    })
    let url = "/blitt/groupList/"+this.props.group_id+"/"+this.props.bill_id+"/editBill"
    let cancelUrl = "/blitt/groupList/"+this.props.group_id+"/"+this.props.bill_id;
    let split_type = Categories.split.map(x=>{
        return <option>{x}</option>
    })
    let count = -1;
    let user_to_pay_list = this.props.split_details.map(x=>{
        count++;
        return <div><input value={count} className="checkBox"type="checkbox" checked/><span className="split-user-name">{x.name}</span><span className="edit-bill-dollar-sign">$S </span><input name="split_amount" className="user-split-amount"value={x.split_amount} readOnly/><input value={x.user_id} name="user_id"hidden/></div>

    })

    let user_who_pay = this.props.split_details.map(x=>{
        return <option value={x.user_id}>{x.name}</option>
    })
    return (
      <Default title={this.props.title} user_name={this.props.user_name} cookieAvailable={this.props.cookieAvailable}>
      <div className="login-container adjust-login-container">
            <h2>Edit bill</h2>
            <form method="POST" action={url}>
              <div class="form-group">
                <label for="billDescriptionInput">Description</label>
                <input type="text" class="form-control" id="billDescriptionInput" placeholder="Enter Description" name="bill_description" value={this.props.singleBill.description}required/>
              </div>
              <div class="form-group">
                <label for="billAmountInput">Bill Amount</label>
                <input type="number" class="form-control" id="billAmountInput" placeholder="Enter Amount" name="bill_amount" value={this.props.singleBill.amount} required/>
              </div>
              <div class="form-group">
                <label for="payer">Payer</label>
                <select name="payer" class="form-control" id="payer" required>
                    <option value={this.props.singleBill.paid_by_user_id}>Select Payer</option>
                    {user_who_pay}
                </select>
              </div>
              <div class="form-group">
                <label for="category_selections">Category</label>
                <select type="text"name="bill_category"class="form-control" id="category_selections" required>
                    <option value={this.props.singleBill.category}>{this.props.singleBill.category}</option>
                    {category_list}
                </select>
              </div>
              <div class="form-group">
                <label for="split_type">Split Type</label>
                <select class="form-control" id="split_type">
                    {split_type}
                </select>
              </div>
              <div className="split-amount-by-user-container">
                {user_to_pay_list}
                <p id="amount-left"></p>
              </div>

              <button type="submit" class="btn btn-outline-success" id="add-bill-button">Edit</button>
              <a className="btn btn-outline-success"href={cancelUrl}>Cancel</a>
            </form>

      </div>

      <script src="/splitterScript.js"></script>
      </Default>
    );
  }
}

module.exports = Create_Bill;
