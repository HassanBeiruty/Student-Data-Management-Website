angular.module('app').directive('paymentMethodCash', function () {
    return {
        restrict: 'E',
        scope: {
            ngModel: '='
        },
        template: `
            <input type="hidden" ng-model="ngModel['$type']" ng-value="'WebApplication.Business.Cash, StudentForm'">
            <label>Amount:</label>
            <input type="text" ng-model="ngModel['Amount']">
            <br>
            <label>Currency:</label>
            <select ng-model="ngModel['CurrencyId']">
                <option value="LBP">LBP</option>
                <option value="USD">USD</option>
            </select>
        `
    };
});
