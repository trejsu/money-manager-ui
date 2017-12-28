import axios from "axios";

export default class Server {
  constructor(login) {
    this.login = login;
    this.server = axios.create({baseURL: "http://localhost:8080/money-manager-api/"});
  }

  getSummaryForWalletAndTimePeriod(id, start, end) {
    return this.server.get(
      "resources/users/" + this.login + "/wallets/" + id + "/summary?start=" + start + "&end=" + end
    );
  }

  getExpensesForWalletAndTimePeriod(id, start, end) {
    return this.server.get(
      "resources/users/" + this.login + "/wallets/" + id + "/expenses?start=" + start + "&end=" + end
    );
  }

  addExpenseToWallet(id, expense) {
    return this.server.post(
      "resources/users/" + this.login + "/wallets/" + id + "/expenses",
      expense
    );
  }

  getCategories() {
    return this.server.get("resources/categories");
  }

  getWallets() {
    return this.server.get("resources/users/" + this.login + "/wallets");
  }

  addWallet(wallet) {
    return this.server.post("resources/users/" + this.login + "/wallets", wallet);
  }

  getBudgets() {
    return this.server.get("resources/users/" + this.login + "/budgets");
  }

  logout() {
    return this.server.get("logout")
  }

  googleLogin(authenticationData) {
    return this.server.post("google_login", authenticationData);
  }

  passwordLogin(authenticationData) {
    return this.server.post("password_login", authenticationData);
  }

  isLoggedIn() {
    return this.server.get("logged_in/status");
  }

  getLoggedInUser() {
    return this.server.get("logged_in/user");
  }

  registerFromGoogle(user) {
    return this.server.post("google_register", user);
  }

  registerFromPassword(user) {
    return this.server.post("password_register", user);
  }

  getUsers() {
    return this.server.get("resources/users")
  }

  updateAdminStatus(login, admin) {
    return this.server.put("resources/users/" + login + "?field=admin", {admin: admin});
  }

  addBudget(budget) {
    return this.server.post("resources/users/" + this.login + "/budgets", budget)
  }

  getBudgetsForTimePeriod(period) {
    return this.server.get(
      "resources/users/"
      + this.login
      + "/budgets?start_min="
      + period.startMin
      + "&start_max="
      + period.startMax
      + "&end_min="
      + period.endMin
      + "&end_max="
      + period.endMax
    );
  }

  getHighestExpenseForWalletAndTimePeriod(walletID, start, end) {
    return this.server.get(
      "resources/users/" + this.login + "/wallets/" + walletID + "/highest_expense?start=" + start + "&end=" + end
    );
  }

  getCountedCategoriesForWalletAndTimePeriod(walletID, start, end) {
    return this.server.get(
      "resources/users/" + this.login + "/wallets/" + walletID + "/counted_categories?start=" + start + "&end=" + end
    );
  }
}
