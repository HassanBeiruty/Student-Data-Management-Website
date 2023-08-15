angular.module('app').directive('universitySelector', ['UniversityWebApiService', function (UniversityWebApiService) {
    return {
        restrict: 'E',
        scope: {
            selectedUniversity: '=',
            onSelectionChanged: '&' // Add the callback attribute
        },
        template: `
            <label for="universitySelect">Select University:</label>
            <select id="universitySelect" ng-model="selectedUniversity" ng-change="onSelectionChanged({ value: selectedUniversity })" ng-options="university as university.Name for university in universities track by university.Id">
                <option value="">-- Select University --</option>
            </select>
        `,
        link: function (scope, element, attrs) {
            // Load universities from UniversityWebApiService
            UniversityWebApiService.getUniversities()
                .then(function (response) {
                    scope.universities = response;
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    };
}]);
