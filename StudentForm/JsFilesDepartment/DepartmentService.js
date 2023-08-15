app.service('DepartmentService', ['ModalService', function (ModalService) {

    this.addDepartment = function (onDepartmentAdded) {
        var parameters = {};

        var templateDirectory = 'PartielViews/DepartmentForm.html'; // Use the correct template for the department form
        console.log("DepartmentService");
        var modalInstancePromise = ModalService.openModal(templateDirectory, parameters).then(function () {

            if (typeof onDepartmentAdded === 'function') {
                onDepartmentAdded();
            }
        });
        console.log(modalInstancePromise);
        modalInstancePromise.then(function (result) {
            // Modal closed successfully, handle the result if needed
            console.log('Modal result:', result);
        }).catch(function (reason) {
            // Modal dismissed (closed without selecting any result or due to an error)
            console.log('Modal dismissed:', reason);
        });
    };

    this.editDepartment = function (department, onDepartmentUpdated) {
        var parameters = { department: department };

        var templateDirectory = 'PartielViews/DepartmentForm.html'; // Use the correct template for the department form
        console.log("DepartmentService");
        var modalInstancePromise = ModalService.openModal(templateDirectory, parameters).then(function () {

            if (typeof onDepartmentUpdated === 'function') {
                onDepartmentUpdated();
            }
        });
        console.log(modalInstancePromise);

        modalInstancePromise.then(function (result) {
            // Modal closed successfully, handle the result if needed
            console.log('Modal result:', result);
        }).catch(function (reason) {
            // Modal dismissed (closed without selecting any result or due to an error)
            console.log('Modal dismissed:', reason);
        });
    };
}]);
