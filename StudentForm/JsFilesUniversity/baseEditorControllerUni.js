console.log("baseEditor");
app.controller('baseEditorControllerUni', ['$scope', 'ModalService', 'UniversityWebApiService', function ($scope, ModalService, UniversityWebApiService) {

    $scope.UniversityId = 0;
    $scope.UniversityName = '';
    

    function loadParameters() {
        console.log($scope.parameters);
        if ($scope.parameters && $scope.parameters.University) {
            $scope.UniversityName = $scope.parameters.University.Name;
        }
    }
    $scope.close = function () {
        ModalService.closeModal(); // Call the closeModal function from the ModalService to close the modal
    };
    $scope.save = function () {

        console.log("inside  Save button");
        // Create a new University object with the updated data
      

        var updatedUniversity = {
            id: 0,
            name: $scope.UniversityName,
           
        };

        if ($scope.parameters && $scope.parameters.University) {

            var updatedUniversity = {
                id: $scope.parameters.University.Id,
                name: $scope.UniversityName,
               
            };
            console.log(updatedUniversity);
            UniversityWebApiService.editUniversity(updatedUniversity)
                .then(function (response) {
                    // Handle success response
                    ModalService.closeModal();
                })
                .catch(function (error) {
                    // Handle error response
                    console.error(error);
                });
        }
            else {
            var updatedUniversity = {
                    id: 0,
                    name: $scope.UniversityName,
                   
            };
            console.log(updatedUniversity);
            UniversityWebApiService.addUniversity(updatedUniversity)
                    .then(function (response) {
                        // Handle success response
                        console.log("added");
                    })
                    .catch(function (error) {
                        // Handle error response
                        console.error(error);
                    });
            }
    }

    loadParameters();
}]);

