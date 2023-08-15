console.log("baseEditor");
app.controller('baseEditorController', ['$scope', 'GenderEnum', 'ModalService', 'StudentWebApiService', 'UniversityWebApiService', 'DepartmentWebApiService', function ($scope, GenderEnum, ModalService, StudentWebApiService, UniversityWebApiService, DepartmentWebApiService) {

    $scope.studentId = 0;
    $scope.studentName = '';
    $scope.selectedGender = '';
    $scope.selectedDepartment = ''; // Or initialize it to some default value
    $scope.selectedUniversity = '';
    console.log($scope.selectedGender);
    function loadParameters() {
        if ($scope.parameters && $scope.parameters.student) {
            $scope.studentName = $scope.parameters.student.Name;
            $scope.selectedGender = $scope.parameters.student.GenderString;
            UniversityWebApiService.getFilteredUniversities($scope.parameters.student.UniversityName)
                .then(function (response) {
                    if (response.length > 0) {
                        $scope.selectedUniversity = response[0]; // Get the first university object
                        console.log($scope.selectedUniversity);
                    }
                })
                .catch(function (error) {
                    console.error('Error getting university:', error);
                });

            DepartmentWebApiService.getFilteredDepartments($scope.parameters.student.DepartmentName)
                .then(function (response) {
                    if (response.length > 0) {
                        $scope.selectedDepartment = response[0];
                        console.log($scope.selectedDepartment);// Assuming the service returns the department object
                    }
                    })
                .catch(function (error) {
                    console.error('Error getting department:', error);
                });

            // Load payment method data
            if ($scope.parameters.student.PaymentMethod) {
                var paymentMethod = $scope.parameters.student.PaymentMethod;

                if (paymentMethod.hasOwnProperty("$type")) {
                    var paymentType = paymentMethod["$type"].split(',')[0].trim();
                    $scope.selectedMethod = paymentType;

                    if (paymentType === "Cash") {
                      
                        $scope.cashData = {
                            "$type": paymentMethod["$type"],
                            "Amount": paymentMethod["Amount"],
                            "CurrencyId": paymentMethod["CurrencyString"]
                        };
                    } else if (paymentType === "Bank") {
                        
                        $scope.bankData = {
                            "$type": paymentMethod["$type"],
                            "Amount": paymentMethod["Amount"],
                            "BankName": paymentMethod["BankName"]
                        };
                    }
                }
            }
        }
    }


    $scope.close = function () {
        ModalService.closeModal(); // Call the closeModal function from the ModalService to close the modal
    };
    ///////////////////
    $scope.selectedMethod = 'Cash';
    $scope.cashData = { "$type": "WebApplication.Business.Cash, StudentForm", "Amount": 0, "CurrencyId": "USD" };
    $scope.bankData = { "$type": "WebApplication.Business.Bank, StudentForm", "Amount": 0, "BankName": "" };
    $scope.dataToSend = {};

    function loadDataToSend() {
        if ($scope.selectedMethod === 'Cash') {
            $scope.dataToSend = $scope.cashData;
        } else if ($scope.selectedMethod === 'Bank') {
            $scope.dataToSend = $scope.bankData;
        }
    }
    $scope.submit = function () {
        // Here, you can send the selected payment method data to the server
        // using $http or any other suitable method
        var dataToSend;

        if ($scope.selectedMethod === 'Cash') {
            $scope.dataToSend = $scope.cashData;
        } else if ($scope.selectedMethod === 'Bank') {
            $scope.dataToSend = $scope.bankData;
        }

        console.log($scope.dataToSend);
    };
    ////////////////////////////////////

    $scope.handleUniversitySelectionChanged = function (value) {
        // Do something with the selected university value (value)
        console.log("Selected University:", value);
        // value will hold the selected university's Id
        $scope.selectedUniversity = value;
        $scope.selectedDepartment = null;
    };










    $scope.save = function () {

        console.log("inside  Save button");
        // Create a new student object with the updated data
        // Create a new student object with the updated data


        if ($scope.parameters && $scope.parameters.student) {

            var updatedStudent = {
                id: $scope.parameters.student.Id,
                name: $scope.studentName,
                gender: $scope.selectedGender,
                departmentId: $scope.selectedDepartment.Id,
                universityId: $scope.selectedUniversity.Id,
                PaymentMethodJson: JSON.stringify($scope.dataToSend)

            };

            console.log(updatedStudent);
            StudentWebApiService.editStudent(updatedStudent)
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
            var updatedStudent = {
                id: 0,
                name: $scope.studentName,
                gender: $scope.selectedGender,
                departmentId: $scope.selectedDepartment.Id,
                universityId: $scope.selectedUniversity.Id,
                PaymentMethodJson: JSON.stringify($scope.dataToSend)
            };
            console.log(updatedStudent);
            StudentWebApiService.addStudent(updatedStudent)
                .then(function (response) {
                    // Handle success response
                    console.log("added");
                })
                .catch(function (error) {
                    // Handle error response
                    console.error(error);
                });
        }

        ModalService.closeModal();
    }
    loadParameters();
    loadDataToSend();

}]);
