import React from "react";
import {Col} from "react-bootstrap"

import Navigation from "../sections/Navigation";
import Menu from "../sections/Menu";
import Wallets from "../sections/wallets/Wallets";
import AddExpense from "../sections/expenses/add-expense/AddExpense";
import Server from "../../services/Server";
import {browserHistory} from "react-router";
import AddWallet from "../sections/wallets/AddWallet";
import AddBudget from "../sections/budgets/AddBudget";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addExpenseHidden: true,
      addWalletHidden: true,
      addBudgetHidden: true,
      walletID: 0,
      user: {}
    };
    this.server = new Server();
  }

  componentDidMount() {
    this.server
      .getLoggedInUser()
      .then(response => {
        this.setState({user: response.data})
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 500) {
          browserHistory.replace("/server_error");
        } else if (error.response.status === 401) {
          browserHistory.replace("/unauthenticated");
        }
      });
  }

  onAddExpensePopupClose() {
    this.hideAddExpensePopup();
  }

  onAddWalletPopupClose() {
    this.hideAddWalletPopup();
  }

  onAddBudgetPopupClose() {
    this.hideAddBudgetPopup();
  }

  hideAddBudgetPopup() {
    this.setState({addBudgetHidden: true});
    this.enableScroll();
  }

  onAddExpenseFromPopupButtonClick() {
    this.hideAddExpensePopup();
  }

  onAddWalletFromPopupButtonClick() {
    this.hideAddWalletPopup();
  }

  onAddBudgetFromPopupButtonClick() {
    this.hideAddBudgetPopup();
  }

  hideAddExpensePopup() {
    this.setState({addExpenseHidden: true});
    this.enableScroll();
  }

  hideAddWalletPopup() {
    this.setState({addWalletHidden: true});
    this.enableScroll();
  }

  enableScroll() {
    if (document.body.style.overflowY === "hidden") {
      document.body.style.overflowY = "scroll";
    }
  }

  showAddExpensePopup() {
    this.setState({addExpenseHidden: false});
    this.disableScroll();
  }

  showAddWalletPopup() {
    this.setState({addWalletHidden: false});
    this.disableScroll();
  }

  disableScroll() {
    if (this.isScrollBarPresent()) {
      document.body.style.overflowY = "hidden";
    }
  }

  onAddExpenseFromListButtonClick() {
    this.showAddExpensePopup();
  }

  onAddWalletFromListButtonClick() {
    this.showAddWalletPopup();
  }

  isScrollBarPresent() {
    let root = (document.compatMode === 'BackCompat') ?
      document.body : document.documentElement;
    return root.scrollHeight > root.clientHeight;
  }

  onAddBudgetListButtonClick() {
    this.showAddBudgetPopup();
  }

  showAddBudgetPopup() {
    this.setState({addBudgetHidden: false});
    this.disableScroll();
  }

  get children() {
    return React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          onAddExpense: this.onAddExpenseFromListButtonClick.bind(this),
          onAddBudget: this.onAddBudgetListButtonClick.bind(this),
          walletID: this.state.walletID,
          addExpenseHidden: this.state.addExpenseHidden,
          addWalletHidden: this.state.addWalletHidden,
          addBudgetHidden: this.state.addBudgetHidden,
          login: this.state.user.login
        }));
  }

  onWalletChange(walletID) {
    this.setState({walletID: walletID});
  }

  render() {
    return (
      <div>
        <Navigation name = {this.state.user.firstName + " " + this.state.user.lastName} />
        <Col xs = {12} sm = {4} md = {4} lg = {4}>
          <Menu />
        </Col>
        <Col
          xs = {12} sm = {3} smPush = {5} md = {3} mdPush = {5} lg = {3} lgPush = {5}>
          <Wallets
            onChange = {this.onWalletChange.bind(this)}
            addExpenseHidden = {this.state.addExpenseHidden}
            addWalletHidden = {this.state.addWalletHidden}
            login = {this.state.user.login}
            onAdd = {this.onAddWalletFromListButtonClick.bind(this)} />
        </Col>
        <Col xs = {12} sm = {5} smPull = {3} md = {5} mdPull = {3} lg = {5} lgPull = {3}>
          {this.children}
        </Col>
        <AddExpense
          addExpenseHidden = {this.state.addExpenseHidden}
          onAdd = {this.onAddExpenseFromPopupButtonClick.bind(this)}
          onClose = {this.onAddExpensePopupClose.bind(this)}
          walletID = {this.state.walletID}
          login = {this.state.user.login} />
        <AddWallet
          addWalletHidden = {this.state.addWalletHidden}
          onAdd = {this.onAddWalletFromPopupButtonClick.bind(this)}
          onClose = {this.onAddWalletPopupClose.bind(this)}
          login = {this.state.user.login} />
        <AddBudget
          hidden = {this.state.addBudgetHidden}
          onClose = {this.onAddBudgetPopupClose.bind(this)}
          login = {this.state.user.login}
          onAdd = {this.onAddBudgetFromPopupButtonClick.bind(this)} />
      </div>
    );
  }
}