import axios from "axios";

export default class Server {
  constructor(login) {
    this.login = login;
    this.server = axios.create({baseURL: "http://localhost:8080/money-manager-api/"});
    this.config = {withCredentials: true}
  }

  getSummaryForWalletAndTimePeriod(id, start, end) {
    return this.server.get(`resources/users/${this.login}/wallets/${id}/summary?start=${start}&end=${end}`, this.config);
  }

  getExpensesForWalletAndTimePeriod(id, start, end) {
    return this.server.get(`resources/users/${this.login}/wallets/${id}/expenses?start=${start}&end=${end}`, this.config);
  }

  addExpenseToWallet(id, expense) {
    return this.server.post(`resources/users/${this.login}/wallets/${id}/expenses`, expense, this.config);
  }

  deleteExpenseFromWallet(walletId, expenseId) {
    return this.server.delete(`resources/users/${this.login}/wallets/${walletId}/expenses/${expenseId}`, this.config);
  }

  getCategories() {
    return this.server.get("resources/categories", this.config);
  }

  getWallets() {
    return this.server.get(`resources/users/${this.login}/wallets`, this.config);
  }

  addWallet(wallet) {
    return this.server.post(`resources/users/${this.login}/wallets`, wallet, this.config);
  }

  getBudgets() {
    return this.server.get(`resources/users/${this.login}/budgets`, this.config);
  }

  logout() {
    return this.server.get("logout", this.config)
  }

  googleLogin(authenticationData) {
    return this.server.post("google_login", authenticationData, this.config);
  }

  passwordLogin(authenticationData) {
    return this.server.post("password_login", authenticationData, this.config);
  }

  isLoggedIn() {
    return this.server.get("logged_in/status", this.config);
  }

  getLoggedInUser() {
    return this.server.get("logged_in/user", this.config);
  }

  registerFromGoogle(user) {
    return this.server.post("google_register", user, this.config);
  }

  registerFromPassword(user) {
    return this.server.post("password_register", user, this.config);
  }

  getUsers() {
    return this.server.get("resources/users", this.config)
  }

  updateAdminStatus(login, admin) {
    return this.server.put(`resources/users/${login}?field=admin`, {admin}, this.config);
  }

  addBudget(budget) {
    return this.server.post(`resources/users/${this.login}/budgets`, budget, this.config)
  }

  getBudgetsForTimePeriod(period) {
    return this.server.get(`resources/users/${this.login}/budgets?start_min=${period.startMin}&start_max=${period.startMax}&end_min=${period.endMin}&end_max=${period.endMax}`,
      this.config);
  }

  getHighestExpenseForWalletAndTimePeriod(walletID, start, end) {
    return this.server.get(`resources/users/${this.login}/wallets/${walletID}/highest_expense?start=${start}&end=${end}`, this.config);
  }

  getCountedCategoriesForWalletAndTimePeriod(walletID, start, end) {
    return this.server.get(`resources/users/${this.login}/wallets/${walletID}/counted_categories?start=${start}&end=${end}`, this.config);
  }
}
