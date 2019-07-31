var React = require("react");
var Default = require("./layout/default")
var Categories = require("./components/categories.json");


class Create_Bill extends React.Component {
  render() {
    console.log(Categories)
    let category_list = Categories.categories.map(x=>{
        return <option>{x}</option>
    })
    let url = "/blitt/groupList/"+this.props.group_id+"/addInBill"
    let cancelUrl = "/blitt/groupList/"+this.props.group_id;
    let split_type = Categories.split.map(x=>{
        return <option>{x}</option>
    })

    let user_to_pay_list = this.props.result.map(x=>{
        return <div><span className="split-user-name">{x.user_name}</span><span>$S </span><input className="user-split-amount"value="0" readOnly/></div>
    })
    return (
      <Default title={this.props.title}>
      <div className="login-container">
            <h2>Add Bill</h2>
            <form method="POST" action={url}>
              <div class="form-group">
                <label for="billDescriptionInput">Description</label>
                <input type="text" class="form-control" id="billDescriptionInput" placeholder="Enter Description" name="bill_description" required/>
              </div>
              <div class="form-group">
                <label for="billAmountInput">Bill Amount</label>
                <input type="number" class="form-control" id="billAmountInput" placeholder="Enter Amount" name="bill_amount" required/>
              </div>
              <div class="form-group">
                <label for="category_selections">Category</label>
                <select type="text"name="bill_category"class="form-control" id="category_selections">
                    {category_list}
                </select>
              </div>
              <div class="form-group">
                <label for="split_type">Split Type</label>
                <select name="bill_category"class="form-control" id="split_type">
                    {split_type}
                </select>
              </div>
              <div className="split-amount-by-user-container">
                {user_to_pay_list}
              </div>

              <input name="group_id" value={this.props.group_id} hidden/>

              <button type="submit" class="btn btn-primary">Add</button>
              <a className="btn btn-primary"href={cancelUrl}>Cancel</a>
            </form>

      </div>

      <script src="/splitterScript.js"></script>
      </Default>
    );
  }
}

module.exports = Create_Bill;
