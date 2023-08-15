var app = angular.module("app", ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/StudentForm', {
        templateUrl: 'PartielViews/StudentForm.html', // Change the template URL based on your folder structure
        controller: 'StudentFormController' // If you have a separate controller for the StudentForm page
    });

    // Other routes if you have more pages in your application
    // ...

    //// If no route matches, redirect to a default page (optional)
    //$routeProvider.otherwise({
    //    redirectTo: '/'
    //});
}]);
