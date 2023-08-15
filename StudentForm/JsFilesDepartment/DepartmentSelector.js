angular.module('app').directive('departmentSelector', ['DepartmentWebApiService', function (DepartmentWebApiService) {
    return {
        restrict: 'E',
        scope: {
            selectedDepartment: '=', // Change this to represent the selected department object
            universityId: '='
        },
        template: `
            <label for="departmentSelect">Select Department:</label>
            <select id="departmentSelect" ng-model="selectedDepartment" ng-options="department as department.Name for department in departments">
                <option value="">-- Select Department --</option>
            </select>
        `,
        link: function (scope, element, attrs) {
            // Load departments based on the universityId from DepartmentWebApiService
            scope.loadDepartments = function () {
                if (scope.universityId) {
                    DepartmentWebApiService.getDepartmentsByUniversity(scope.universityId)
                        .then(function (response) {
                            scope.departments = response;
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            };

            // Watch for changes in the universityId attribute and load departments accordingly
            scope.$watch('universityId', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.loadDepartments();
                }
            });

            // Initial load of departments
            scope.loadDepartments();
        }
    };
}]);
