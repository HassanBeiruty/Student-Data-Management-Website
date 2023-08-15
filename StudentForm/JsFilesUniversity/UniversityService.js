
app.service('UniversityService', ['ModalService', function (ModalService) {


    this.addUniversity = function (onUniversityAdded) {
        var parameters = {};
      
        var templateDirectory = 'PartielViews/UniversityForm.html';
        console.log("UniversityService");
        var modalInstancePromise = ModalService.openModal(templateDirectory, parameters).then(function () {

            if (typeof onUniversityAdded === 'function') {
                onUniversityAdded();
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

    this.editUniversity = function (University, onUniversityUpdated) {
        var parameters = { University: University };

        var templateDirectory = 'PartielViews/UniversityForm.html';
        console.log("UniversityService");
        var modalInstancePromise = ModalService.openModal(templateDirectory, parameters).then(function () {

            if (typeof onUniversityUpdated === 'function') {
                onUniversityUpdated();
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
