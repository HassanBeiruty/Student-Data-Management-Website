app.service('ModalService', ['$rootScope', '$uibModal', function ($rootScope, $uibModal) {
    var modalService = {};
    var modalInstance; // Store the modal instance here

    modalService.openModal = function (htmlUrl, parameters) {
        console.log('Opening modal with HTML URL:', htmlUrl);
        var modalScope = $rootScope.$new();
        modalScope.parameters = parameters;

        modalInstance = $uibModal.open({
            templateUrl: htmlUrl,
            scope: modalScope,
            backdrop: 'static'
        });

        console.log('Opened modal with HTML URL:', htmlUrl);
        return modalInstance.result;
    };

    modalService.closeModal = function () {
        if (modalInstance) {
            modalInstance.close(); // Close the modal
        }
    };

    return modalService;
}]);
