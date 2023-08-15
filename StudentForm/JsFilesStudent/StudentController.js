(function (app) {
    "use strict";

    // Define the studentController as a function and inject necessary services
    studentController.$inject = ['$scope', 'PaginationService', 'StudentService', 'StudentWebApiService'];

    function studentController($scope, PaginationService, StudentService, StudentWebApiService) {
        // Define the scope model
        defineScope();

        // Load function that initializes data
        function load() {
            getStudents(); // Initial data fetch
        }

        function defineScope() {
            $scope.nameFilter = '';
            $scope.pageSize = 3;
            $scope.currentPage = 1;
            $scope.nameStudent = "test";
            $scope.currentPageStudents = [];

            $scope.pages = [];
            $scope.filteredStudents = [];

            $scope.goToStudentForm = function () {
                getStudents();
            };

            $scope.openAddStudentModal = function () {
                StudentService.addStudent(function () {
                    filterAndFetchStudents();
                });
            };

            $scope.showContextMenu = function (student) {
                StudentService.editStudent(student, function () {
                    filterAndFetchStudents();
                });
            };

            $scope.changePage = function (page) {
                $scope.currentPage = PaginationService.setPage(page, $scope.currentPage, $scope.pages.length);
                buildPages();
                updateCurrentPageStudents();
            };

            $scope.filterStudents = function () {
                filterAndFetchStudents();
            };

            $scope.AddStudent = function () {
                addStudent();
            };
        }

        function loadAllControls() {
            // Load dynamic controls here if needed
        }

        function loadStaticData() {
            // Load static data here if needed
        }

        function loadData() {
            // Load data here if needed
        }

        function load() {
            defineScope();
            loadAllControls();
            loadStaticData();
            loadData();
            getStudents(); // Initial data fetch
        }

        function filterAndFetchStudents() {
            if ($scope.nameFilter && $scope.nameFilter.trim() !== '') {
                getFilteredStudents();
            } else {
                getStudents();
            }
        }

        function getFilteredStudents(name) {
            StudentWebApiService.getFilteredStudents($scope.nameFilter).then((filteredStudents) => {
                $scope.filteredStudents = filteredStudents;
                buildPages();
                updateCurrentPageStudents();
            });
        }

        function getStudents() {
            StudentWebApiService.getStudents().then((filteredStudents) => {
                $scope.filteredStudents = filteredStudents;
                buildPages();
                updateCurrentPageStudents();
            });
        }

        function buildPages() {
            $scope.pages = PaginationService.getPages($scope.filteredStudents, $scope.currentPage, $scope.pageSize);
        }

        function updateCurrentPageStudents() {
            var startIndex = ($scope.currentPage - 1) * $scope.pageSize;
            var endIndex = startIndex + $scope.pageSize;
            $scope.currentPageStudents = $scope.filteredStudents.slice(startIndex, endIndex);
            console.log($scope.currentPageStudents);
        }

        load(); // Call the load function to initialize data
    }

    // Register the studentController with the AngularJS app
    app.controller('StudentController', studentController);
})(app);
