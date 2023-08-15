(function (app) {
    "use strict";

    // Define the DepartmentController as a function and inject necessary services
    departmentController.$inject = ['$scope', 'PaginationService', 'DepartmentService', 'DepartmentWebApiService'];

    function departmentController($scope, PaginationService, DepartmentService, DepartmentWebApiService) {
        // Define the scope model
        defineScope();

        // Load function that initializes data
        function load() {
            getDepartments(); // Initial data fetch
        }

        function defineScope() {
            $scope.nameFilter = '';
            $scope.pageSize = 3;
            $scope.currentPage = 1;
            $scope.currentPageDepartments = [];
            $scope.pages = [];
            $scope.filteredDepartments = [];

            $scope.goToDepartmentForm = function () {
                getDepartments();
            };

            $scope.openAddDepartmentModal = function () {
                DepartmentService.addDepartment(function () {
                    filterAndFetchDepartments();
                });
            };

            $scope.showContextMenu = function (department) {
                DepartmentService.editDepartment(department, function () {
                    filterAndFetchDepartments();
                });
            };

            $scope.changePage = function (page) {
                $scope.currentPage = PaginationService.setPage(page, $scope.currentPage, $scope.pages.length);
                buildPages();
                updateCurrentPageDepartments();
            };

            $scope.filterDepartments = function () {
                filterAndFetchDepartments();
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

        function filterAndFetchDepartments() {
            if ($scope.nameFilter && $scope.nameFilter.trim() !== '') {
                getFilteredDepartments();
            } else {
                getDepartments();
            }
        }

        function getFilteredDepartments() {
            DepartmentWebApiService.getFilteredDepartments($scope.nameFilter).then(function (filteredDepartments) {
                $scope.filteredDepartments = filteredDepartments;
                buildPages();
                updateCurrentPageDepartments();
            }).catch(function (error) {
                console.error('Error getting filtered departments:', error);
            });
        }

        function getDepartments() {
            DepartmentWebApiService.getDepartments().then(function (filteredDepartments) {
                $scope.filteredDepartments = filteredDepartments;
                buildPages();
                updateCurrentPageDepartments();
            }).catch(function (error) {
                console.error('Error getting all departments:', error);
            });
        }

        function buildPages() {
            $scope.pages = PaginationService.getPages($scope.filteredDepartments, $scope.currentPage, $scope.pageSize);
        }

        function updateCurrentPageDepartments() {
            var startIndex = ($scope.currentPage - 1) * $scope.pageSize;
            var endIndex = startIndex + $scope.pageSize;
            $scope.currentPageDepartments = $scope.filteredDepartments.slice(startIndex, endIndex);
        }

        load(); // Call the load function to initialize data
    }

    // Register the DepartmentController with the AngularJS app
    app.controller('DepartmentController', departmentController);
})(app);
