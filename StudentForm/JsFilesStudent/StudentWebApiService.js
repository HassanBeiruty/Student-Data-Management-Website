
app.service('StudentWebApiService', ['WebApiService', function (WebApiService) {
    var apiUrl = 'https://localhost:44354/api/student';

    this.getFilteredStudents = function (name) {
        var url = apiUrl + '/filter';
        console.log("StudentWebApiService")
        return WebApiService.get(url, { name: name})
            .then(function (response) {
                var filteredStudents = response.data;

                if (filteredStudents === null || filteredStudents.length === 0) {
                    throw new Error('No students found.');
                }

                return filteredStudents;
            });
    };
    this.getStudents = function () {
        var url = apiUrl + '/all';
        console.log("StudentWebApiService")
        return WebApiService.get(url)
            .then(function (response) {
                var filteredStudents = response.data;

                if (filteredStudents === null || filteredStudents.length === 0) {
                    throw new Error('No students found.');
                }

                return filteredStudents;
            });
    };

    this.addStudent = function (student) {
        var url = apiUrl + '/add';

       
        return WebApiService.post(url, student)
            .then(function (response) {
                return response.data;
            });
    };

    this.editStudent = function (student) {
        var url = apiUrl + '/update';

   
        return WebApiService.post(url, student)
            .then(function (response) {
               
                return response.data;
            });
    };

    this.deleteAllStudents = function () {
        var url = apiUrl + '/deleteAll';
        return WebApiService.delete(url);
    };
}]);
