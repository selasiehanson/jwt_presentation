/* jshint esnext: true */
class EmployeeCtrl {
  constructor(http) {
    this.http = http;
  }
}

EmployeeCtrl.$inject = ['$http'];

export { EmployeeCtrl };
