app.service('DepartmentWebApiService', ['WebApiService', function (WebApiService) {
    var apiUrl = 'https://localhost:44354/api/department'; // Use the correct API endpoint for departments

    this.getFilteredDepartments = function (name) {
        var url = apiUrl + '/filterDepartments'; // Correct the endpoint to match the controller action name
        console.log("DepartmentWebApiService");
        return WebApiService.get(url, { name: name })
            .then(function (response) {
                var filteredDepartments = response.data;

                if (filteredDepartments === null || filteredDepartments.length === 0) {
                    throw new Error('No departments found.');
                }

                return filteredDepartments;
            });
    };

    this.getDepartments = function () {
        var url = apiUrl + '/allDepartments'; // Correct the endpoint to match the controller action name
        console.log("DepartmentWebApiService");
        return WebApiService.get(url)
            .then(function (response) {
                var departments = response.data;

                if (departments === null || departments.length === 0) {
                    throw new Error('No departments found.');
                }

                return departments;
            });
    };
    this.getDepartmentsByUniversity = function (universityId) {
        var url = apiUrl + '/filterDepartmentsByUniversity'; // Correct the endpoint to match the controller action name

        return WebApiService.get(url, { universityId: universityId })
            .then(function (response) {
                var departments = response.data;

                if (departments === null || departments.length === 0) {
                    throw new Error('No departments found for the selected university.');
                }

                return departments;
            });
    };
    this.addDepartment = function (department) {
        var url = apiUrl + '/addDepartment'; // Correct the endpoint to match the controller action name

        return WebApiService.post(url, department)
            .then(function (response) {
                return response.data;
            });
    };

    this.editDepartment = function (department) {
        var url = apiUrl + '/updateDepartment'; // Correct the endpoint to match the controller action name

        return WebApiService.post(url, department)
            .then(function (response) {
                return response.data;
            });
    };

    this.deleteAllDepartments = function () {
        var url = apiUrl + '/deleteAllDepartments'; // Correct the endpoint to match the controller action name
        return WebApiService.delete(url);
    };
}]);
