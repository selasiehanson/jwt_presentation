/* jshint esnext: true */

let _AuthToken;
let _AuthEvents;
let _rootScope;
class LoginCtrl {
  constructor(http, rootScope, AuthToken, AuthEvents) {
    this.http = http;
    _rootScope = rootScope;
    _AuthToken = AuthToken;
    _AuthEvents = AuthEvents;
    console.log(AuthEvents);
  }

  login(data){
    this.http.post('/api/auth',data).then((response) => {
     console.log(response); 
        if(response.status === 200 ) {
          _AuthToken.setT(response.data.auth_token);
          _rootScope.$broadcast(_AuthEvents.loginSuccess);
        } else if(response.status === 401) {
          _rootScope.$broadcast(AuthEvents.notAuthorized);
        }else {
          _rootScope.$broadcast(AuthEvents.loginFailed);
        }
    });
  }
}

LoginCtrl.$inject = ['$http', '$rootScope', 'AuthToken', 'AuthEvents'];

export { LoginCtrl };
