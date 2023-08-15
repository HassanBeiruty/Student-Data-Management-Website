
app.service('UniversityWebApiService', ['WebApiService', function (WebApiService) {
    var apiUrl = 'https://localhost:44354/api/university';

    this.getFilteredUniversities = function (name) {
        var url = apiUrl + '/filterUniversities';
        console.log("UniversityWebApiService")
        return WebApiService.get(url, { name: name })
            .then(function (response) {
                var filteredUniversities = response.data;

                if (filteredUniversities === null || filteredUniversities.length === 0) {
                    throw new Error('No students found.');
                }

                return filteredUniversities;
            });
    };
    this.getUniversities = function () {
        var url = apiUrl + '/allUniversities';
        console.log("UniversityWebApiService")
        return WebApiService.get(url)
            .then(function (response) {
                var filteredUniversities = response.data;

                if (filteredUniversities === null || filteredUniversities.length === 0) {
                    throw new Error('No students found.');
                }

                return filteredUniversities;
            });
    };

    this.addUniversity = function (University) {
        var url = apiUrl + '/addUniversity';

       
        return WebApiService.post(url, University)
            .then(function (response) {
                return response.data;
            });
    };

    this.editUniversity = function (University) {
        var url = apiUrl + '/updateUniversity';

   
        return WebApiService.post(url, University)
            .then(function (response) {
               
                return response.data;
            });
    };

    this.deleteAllUniversities= function () {
        var url = apiUrl + '/deleteAllUniversities';
        return WebApiService.delete(url);
    };
}]);
