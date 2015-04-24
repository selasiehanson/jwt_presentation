/*jshint esnext:true */
import  {EmployeeCtrl} from './employees';
import  {LoginCtrl} from './login';
import {AuthToken } from './auth_token';
import {AuthEvents } from './auth_events';
import {AuthInterceptor } from './auth_interceptor';
import ngRoute from 'angular-route';

import angular from 'angular';

var app = angular.module('app',[
  'ngRoute', 
]).controller('LoginCtrl', LoginCtrl)
  .controller('EmployeeCtrl', EmployeeCtrl)
  .service('AuthToken', AuthToken)
  .constant('AuthEvents', AuthEvents)
  .service('AuthInterceptor', AuthInterceptor);

app.config( ($routeProvider, $httpProvider) => {
  $routeProvider
    .when('/employees', {
      templateUrl: '../../../app/src/views/employees.html',
      controller: 'EmployeesCtrl',
      controllerAs :"Vm"
    })
    .when('/login', {
      templateUrl: '../../../app/src/views/login.html',
      controller: 'LoginCtrl',
      controllerAs : "Vm"
    })
    .otherwise({
      redirectTo: '/login'
    });
//$httpProvider.interceptors.push('RequestInterceptor');
});
