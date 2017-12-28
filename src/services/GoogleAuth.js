import React from "react";

export default class GoogleAuth {
  constructor(gapi) {
    this.gapi = gapi;
  }

  getLogin() {
    return this.gapi.auth2
      .getAuthInstance()
      .currentUser
      .get()
      .getBasicProfile()
      .getEmail()
      .split('@')[0];
  }

  showLoginPopup(onSuccess) {
    this.gapi.load("auth2", () => {
      this.init()
        .then(() => {
          this.gapi.auth2.getAuthInstance()
            .signIn(new this.gapi.auth2.SigninOptionsBuilder()
              .setPrompt("select_account"))
            .then(() => onSuccess());
        });
    });
  }

  initAuth2(onSuccess) {
    this.gapi.load("auth2", () => this.init().then(() => onSuccess()));
  }

  init() {
    return this.gapi.auth2
      .init({
        client_id: "434476122553-nsqfrvsmc4g2ca8277epe8edult0omul.apps.googleusercontent.com",
        immediate: false,
        cookie_policy: "single_host_origin"
      })
  }

  isSigned() {
    return (this.isAuthInitialized() &&
    this.gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  isAuthInitialized() {
    return !!this.gapi.auth2;
  }

  getUser() {
    return this.gapi.auth2
      .getAuthInstance()
      .currentUser
      .get()
      .getBasicProfile();
  }

  signOut(onSuccess) {
    this.initAuth2(() => this.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => onSuccess())
    );
  }

  getIdToken() {
    return this.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
  }
}
