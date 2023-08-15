console.log("baseEditorDepartment");
app.controller('baseEditorControllerDepartment', ['$scope', 'ModalService', 'DepartmentWebApiService', 'UniversityWebApiService', function ($scope, ModalService, DepartmentWebApiService, UniversityWebApiService) {

    $scope.departmentId = 0;
    $scope.departmentName = '';
    $scope.departmentUniversity = '';
    $scope.selectedUniversity = '';
    function loadParameters() {
        console.log($scope.parameters);
        if ($scope.parameters && $scope.parameters.department) {
            $scope.departmentId = $scope.parameters.department.Id;
            $scope.DepartmentName = $scope.parameters.department.Name;
            UniversityWebApiService.getFilteredUniversities($scope.parameters.department.UniversityName)
                .then(function (response) {
                    if (response.length > 0) {
                        $scope.selectedUniversity = response[0]; // Get the first university object
                        console.log($scope.selectedUniversity);
                    }
                })
                .catch(function (error) {
                    console.error('Error getting university:', error);
                });
        }
    }

    $scope.close = function () {
        ModalService.closeModal(); 
    };

    $scope.save = function () {
        console.log("inside Save button");
        console.log($scope.selectedUniversity);

        // Create a new department object with the updated data

        var updatedDepartment = {
            Id: 0,
            Name: $scope.DepartmentName,
            universityName: $scope.selectedUniversity.Name
        };

        if ($scope.parameters && $scope.parameters.department) {
            updatedDepartment.Id = $scope.departmentId;
        }

        console.log(updatedDepartment);

        if (updatedDepartment.Id === 0) {
            // Add a new department
            DepartmentWebApiService.addDepartment(updatedDepartment)
                .then(function (response) {
                    // Handle success response
                    console.log("Department added:", response.data);
                    ModalService.closeModal();
                })
                .catch(function (error) {
                    // Handle error response
                    console.error(error);
                });
        } else {
            // Edit an existing department
            DepartmentWebApiService.editDepartment(updatedDepartment)
                .then(function (response) {
                    // Handle success response
                    console.log("Department edited:", response.data);
                    ModalService.closeModal();
                })
                .catch(function (error) {
                    // Handle error response
                    console.error(error);
                });
        }
    }

    loadParameters();
}]);
