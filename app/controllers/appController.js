/**
 * Main AngularJS Web Application
 */
var app = angular.module('karwarmat');

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});

app.controller('LoginController', function($scope, $location, $http, services, $rootScope, userService)
{
    $scope.defaultUser = {
      'username':'',
      'password':''
    };

    $scope.login = function()
    {
        $scope.errorMessage = '';
        //alert("Data ::" + $scope.user.username + "::" + $scope.user.password);
        services.sessionLogin($scope.user.username, $scope.user.password).then(function(data)
        {
            console.log(data);
            if(data.length>0)
            {
                $rootScope.profile = data;
                userService.saveLoggedUser(data[0]);
                $location.path("/profile");
            }
            else
            {
                $scope.errorMessage = 'Invalid login id or password. Please try again!';
                $scope.user = $scope.defaultUser;
            }            
        });
    };
});

app.controller('profilesListCtrl', function ($scope, services, userService) {

  var sessionUser = userService.getLoggedUser();
  $scope.profile = sessionUser; 

  var gender = '';
  if($scope.profile.prof_gender == "male")
  {
    gender = 'male';
  }
  else
  {
    gender = 'female';
  }
  
  //alert("gender::"+ gender);
  services.getProfiles(gender).then(function(data){
        $scope.profiles = data.data;
        console.log("profiles::" + $scope.profiles);
    });
});

app.controller('profileController', function ($scope, services, $rootScope, userService, $location){


  var sessionUser = userService.getLoggedUser();
  $scope.profile = sessionUser; 

  if($scope.profile == '')
  {
     $location.path('/');
  } 
  $scope.openProfileRecommendations = function()
  {
      $location.path('/profiles');
  };

  $scope.openProfileEditPopUp = function()
  {
      $( "#profileView" ).accordion({
      collapsible: true,
     heightStyle: "content"
    });
  
    $( "#txtDob" ).datepicker({
      changeMonth: true,
        changeYear: true
    });

    $( "#anim" ).change(function() {
      $( "#txtDob" ).datepicker( "option", "showAnim", $( this ).val() );
    });

    $('#myProfileModal').modal('show');
  }

  $scope.closeProfileEditPopUp = function()
  {
      $('#myProfileModal').modal('hide'); 
  }

});

app.controller('editCtrl', function ($scope, $rootScope, $location, $routeParams, services, customer) {
    var customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID) : 0;
    $rootScope.title = (customerID > 0) ? 'Edit Customer' : 'Add Customer';
    $scope.buttonText = (customerID > 0) ? 'Update Customer' : 'Add New Customer';
      var original = customer.data;
      original._id = customerID;
      $scope.customer = angular.copy(original);
      $scope.customer._id = customerID;

      $scope.isClean = function() {
        return angular.equals(original, $scope.customer);
      }

      $scope.deleteCustomer = function(customer) {
        $location.path('/');
        if(confirm("Are you sure to delete customer number: "+$scope.customer._id)==true)
        services.deleteCustomer(customer.customerNumber);
      };

      $scope.saveCustomer = function(customer) {
        $location.path('/');
        if (customerID <= 0) {
            services.insertCustomer(customer);
        }
        else {
            services.updateCustomer(customerID, customer);
        }
    };
});




