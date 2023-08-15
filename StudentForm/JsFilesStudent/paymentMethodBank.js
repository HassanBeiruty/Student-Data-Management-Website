angular.module('app').directive('paymentMethodBank', function () {
    return {
        restrict: 'E',
        scope: {
            ngModel: '='
        },
        template: `
            <input type="hidden" ng-model="ngModel.$type" ng-value="'WebApplication.Business.Bank, StudentForm'">
            <label>Amount:</label>
            <input type="text" ng-model="ngModel.Amount">
            <br>
            <label>Bank Name:</label>
            <input type="text" ng-model="ngModel.BankName">
        `
    };
});
