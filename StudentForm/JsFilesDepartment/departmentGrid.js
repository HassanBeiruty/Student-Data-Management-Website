angular.module('app').directive('departmentGrid', ['DepartmentWebApiService', function (DepartmentWebApiService) {
    return {
        restrict: 'E',
        scope: {
            universityid: '='
  
        },
        template: `
            <table style="width: 100%; height: 200px; margin-bottom: 20px; border-collapse: collapse; border: 1px solid #ddd;">
                <tr ng-repeat="department in departments" style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 12px;">{{ department.Id }}</td>
                    <td style="padding: 12px;">{{ department.Name }}</td>
                   <td style="padding: 12px;">
                    <button class="btn btn-primary" ng-click="showContextMenu(department)">
                        Edit
                    </button>
                </td>
                </tr>
            </table>
        `,
        controller: function ($scope) {
            $scope.departments = []; // Initialize departments array

            // Load departments based on the universityId
            $scope.loadDepartments = function () {
                if ($scope.universityid !== null) {
                    DepartmentWebApiService.getDepartmentsByUniversity($scope.universityid)
                        .then(function (response) {
                            $scope.departments = response;
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                } else {
                    // If universityid is null, fetch all departments
                    DepartmentWebApiService.getDepartments()
                        .then(function (response) {
                            $scope.departments = response;
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            };

            // Watch for changes in the universityid attribute and load departments accordingly
            $scope.$watch('universityid', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.loadDepartments();
                }
            });

            // Initial load of departments
            $scope.loadDepartments();
        }
    };
}]);
