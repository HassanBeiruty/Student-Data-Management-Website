
app.service('StudentService', ['ModalService', function (ModalService) {


    this.addStudent = function (onStudentAdded) {
        var parameters = {};
      
        var templateDirectory = 'PartielViews/StudentForm.html';
        console.log("StudentService");
        var modalInstancePromise = ModalService.openModal(templateDirectory, parameters).then(function () {

            if (typeof onStudentAdded === 'function') {
                onStudentAdded();
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

    this.editStudent = function (student, onStudentUpdated) {
        var parameters = { student: student };

        var templateDirectory = 'PartielViews/StudentForm.html';
        console.log("StudentService");
        var modalInstancePromise = ModalService.openModal(templateDirectory, parameters).then(function () {

            if (typeof onStudentUpdated === 'function') {
                onStudentUpdated();
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
