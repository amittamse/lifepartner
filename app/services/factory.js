/**
 * Main AngularJS Web Application
 */
var app = angular.module('karwarmat');

app.factory('userService', ['$rootScope', function ($rootScope) {

    var service = {};
    service.saveLoggedUser = function(userInfo)
    {
        if(userInfo)
        {
           sessionStorage.userService = angular.toJson(userInfo);
        }
        return;
    }

    service.getLoggedUser = function()
    {
        var currentUserModel = angular.fromJson(sessionStorage.userService);
        return currentUserModel;
    }

    service.clearLoggedUser = function()
    {
        sessionStorage.clear();
        return;
    }
  
    return service;
}]);

app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getCustomers = function(){
        return $http.get(serviceBase + 'customers');
    }
    obj.getCustomer = function(customerID){
        return $http.get(serviceBase + 'customer?id=' + customerID);
    }

    obj.insertCustomer = function (customer) {
      return $http.post(serviceBase + 'insertCustomer', customer).then(function (results) {
          return results;
      });
    };

    obj.getProfiles = function(gender)
    {
         return $http.post(serviceBase + 'getProfiles', gender).then(function (results) {
          return results;
         });
    };

    obj.sessionLogin = function (username,password) {
        console.log("username :: "+ username +"password ::"+ password);
        return $http.post(serviceBase + 'sessionLogin', {id:username, pwd:password}).then(function (status) {
            return status.data;
        });
    };  

    obj.updateCustomer = function (id,customer) {
        return $http.post(serviceBase + 'updateCustomer', {id:id, customer:customer}).then(function (status) {
            return status.data;
        });
    };

    obj.deleteCustomer = function (id) {
        return $http.delete(serviceBase + 'deleteCustomer?id=' + id).then(function (status) {
            return status.data;
        });
    };
    return obj;   
}]);
