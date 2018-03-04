import React from "react";
import {Col, Row} from "react-bootstrap"
import MicroEmitter from "micro-emitter";

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
    this.emitter = new MicroEmitter();
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

  onAddBudgetPopupClose() {
    this.hideAddBudgetPopup();
  }

  hideAddBudgetPopup() {
    this.setState({addBudgetHidden: true});
    this.enableScroll();
  }

  onAddBudgetFromPopupButtonClick() {
    this.hideAddBudgetPopup();
  }

  enableScroll() {
    if (document.body.style.overflowY === "hidden") {
      document.body.style.overflowY = "scroll";
    }
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
          onAddBudget: this.onAddBudgetListButtonClick.bind(this),
          addBudgetHidden: this.state.addBudgetHidden,
          login: this.state.user.login,
          emitter: this.emitter
        }));
  }

  render() {
    return (
      <div>
        <Navigation name = {this.state.user.firstName + " " + this.state.user.lastName} />
        <Row>
          <Col xs = {12} sm = {4} md = {4} lg = {4}>
            <Menu />
          </Col>
          <Col xs = {12} sm = {5} smPull = {3} md = {5} mdPull = {3} lg = {5} lgPull = {3}>
            {this.children}
          </Col>
          <Col xs = {12} sm = {3} smPush = {5} md = {3} mdPush = {5} lg = {3} lgPush = {5}>
            <Wallets
              login = {this.state.user.login}
              emitter = {this.emitter} />
          </Col>
        </Row>
        <AddExpense
          login = {this.state.user.login}
          emitter = {this.emitter}/>
        <AddWallet
          login = {this.state.user.login}
          emitter = {this.emitter}/>
        <AddBudget
          hidden = {this.state.addBudgetHidden}
          onClose = {this.onAddBudgetPopupClose.bind(this)}
          login = {this.state.user.login}
          onAdd = {this.onAddBudgetFromPopupButtonClick.bind(this)} />
      </div>
    );
  }
}