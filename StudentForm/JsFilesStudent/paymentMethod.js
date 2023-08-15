angular.module('app').directive('paymentMethod', function () {
    return {
        restrict: 'E',
        scope: {
            ngModel: '='
        },
        template: `
            <label>Select Payment Method:</label>
            <select ng-model="ngModel" ng-options="method for method in ['Cash', 'Bank']"></select>
        `
    };
});
