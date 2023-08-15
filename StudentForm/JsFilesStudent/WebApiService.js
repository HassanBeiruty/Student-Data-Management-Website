
app.service('WebApiService', ['$http', function ($http) {
    // Method for GET requests
    
    this.get = function (url, parameters) {
        console.log("WebServiceAPI")
        return $http.get(url, { params: parameters });
    };

    // Method for POST requests
    this.post = function (url, parameters) {
        
        return $http.post(url, parameters);
    };
}]);
