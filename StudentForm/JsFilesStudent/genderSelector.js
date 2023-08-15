app.directive('genderSelector', function (GenderEnum) {
    return {
        restrict: 'E',
        scope: {
            selectedGender: '='
        },
        template: `
            <label for="genderSelect">Select Gender:</label>
            <select id="genderSelect" ng-model="selectedGender">
                <option ng-repeat="(key, value) in genders" value="{{value.value}}">{{value.description}}</option>
            </select>
        `,
        link: function (scope) {
            scope.genders = GenderEnum;
        }
    };
});
