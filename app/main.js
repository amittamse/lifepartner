/**
 * Main AngularJS Web Application
 */
var app = angular.module('karwarmat', ['ngRoute']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "app/partials/home.html", controller: "LoginController"})
    // Pages
    .when("/about", {templateUrl: "app/partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "app/partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "app/partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "app/partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "app/partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "app/partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "app/partials/blog_item.html", controller: "BlogCtrl"})
    .when("/stories", {templateUrl: "app/partials/stories.html", controller: "PageCtrl"})
    .when("/profile", {title: 'Profile', templateUrl: "app/partials/profile.html", controller: "profileController"})
    .when("/profiles", {title: 'Profile', templateUrl: "app/partials/profiles.html", controller: "profilesListCtrl"})
    .when('/customers', {title: 'Customers',templateUrl: 'app/partials/customers.html',controller: 'listCtrl'})
    .when('/edit-customer/:customerID', {title: 'Edit Customers', templateUrl: 'app/partials/edit-customer.html', controller: 'editCtrl',
        resolve: {
          customer: function(services, $route){
            var customerID = $route.current.params.customerID;
            return services.getCustomer(customerID);
          }
        }
      })
    // else 404
    .otherwise("/404", {templateUrl: "app/partials/404.html", controller: "PageCtrl"});
    //.when("/profiles", {title: 'Profiles', templateUrl: "app/partials/profiles.html", controller: "matrimonialCtrl"})
}]);


app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
