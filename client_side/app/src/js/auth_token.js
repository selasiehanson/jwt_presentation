/*jshint esnext: true */


class AuthToken {
  constructor() {
  }

  setT(value){
    localStorage.setItem("token", value);
  }

  getT() {
    localStorage.getItem("token");
  }
}

AuthToken.$inject = [];
export {AuthToken};
