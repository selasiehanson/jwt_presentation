/* jshint esnext: true */
class AuthInterceptor {

  constructor(q, injector){
    this.injector = injector; 
    this.q = q;
  }

  request(config) {
    var AuthToken = $injector.get("AuthToken");
    var token = AuthToken.getT();
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config || this.q.when(config);
  }

  responseError() {
      var AuthEvents = this.injector.get('AuthEvents');
      var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/api/auth'));
      if (!matchesAuthenticatePath) {
        this.injector.get('$rootScope').$broadcast({
          401: AuthEvents.notAuthenticated,
          403: AuthEvents.notAuthorized,
          419: AuthEvents.sessionTimeout
        }[response.status], response);
      }
      return this.q.reject(response);
  }
}



AuthInterceptor.$inject = ['$q', '$injector'];

export { AuthInterceptor };
