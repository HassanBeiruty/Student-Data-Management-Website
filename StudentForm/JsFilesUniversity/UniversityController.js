(function (app) {
    "use strict";

    // Define the UniversityController as a function and inject necessary services
    UniversityController.$inject = ['$scope', 'PaginationService', 'UniversityService', 'UniversityWebApiService'];

    function UniversityController($scope, PaginationService, UniversityService, UniversityWebApiService) {
        // Define the scope model
        defineScope();

        // Load function that initializes data
        function load() {
            getUniversities(); // Initial data fetch
        }

        function defineScope() {
            $scope.nameFilter = '';
            $scope.pageSize = 3;
            $scope.currentPage = 1;
            $scope.expandedUniversityIds = [];
            $scope.currentPageUniversities = [];
            $scope.pages = [];
            $scope.filteredUniversities = [];
            $scope.selectedUniversity = null;
            $scope.selectedDepartment = null;

            $scope.expandUniversity = function (universityId) {
                var index = $scope.expandedUniversityIds.indexOf(universityId);
                if (index === -1) {
                    $scope.expandedUniversityIds.push(universityId);
                } else {
                    $scope.expandedUniversityIds.splice(index, 1);
                }
            };

            $scope.isUniversityExpanded = function (universityId) {
                return $scope.expandedUniversityIds.includes(universityId);
            };

            $scope.handleUniversitySelectionChanged = function (value) {
                $scope.selectedUniversity = value;
                $scope.selectedDepartment = null;
            };

            $scope.openAddUniversityModal = function () {
                UniversityService.addUniversity(function () {
                    filterAndFetchUniversities();
                });
            };

            $scope.showContextMenu = function (university) {
                UniversityService.editUniversity(university, function () {
                    filterAndFetchUniversities();
                });
            };

            $scope.goToStudentForm = function () {
                getUniversities();
            };

            $scope.changePage = function (page) {
                $scope.currentPage = PaginationService.setPage(page, $scope.currentPage, $scope.pages.length);
                buildPages();
                updateCurrentPageUniversities();
            };

            $scope.filterUniversities = function () {
                filterAndFetchUniversities();
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
            getUniversities(); // Initial data fetch
        }

        function filterAndFetchUniversities() {
            if ($scope.nameFilter && $scope.nameFilter.trim() !== '') {
                getFilteredUniversities();
            } else {
                getUniversities();
            }
        }

        function getFilteredUniversities() {
            UniversityWebApiService.getFilteredUniversities($scope.nameFilter).then((filteredUniversities) => {
                $scope.filteredUniversities = filteredUniversities;
                buildPages();
                updateCurrentPageUniversities();
            });
        }

        function getUniversities() {
            UniversityWebApiService.getUniversities().then((filteredUniversities) => {
                $scope.filteredUniversities = filteredUniversities;
                buildPages();
                updateCurrentPageUniversities();
            });
        }

        function buildPages() {
            $scope.pages = PaginationService.getPages($scope.filteredUniversities, $scope.currentPage, $scope.pageSize);
        }

        function updateCurrentPageUniversities() {
            var startIndex = ($scope.currentPage - 1) * $scope.pageSize;
            var endIndex = startIndex + $scope.pageSize;
            $scope.currentPageUniversities = $scope.filteredUniversities.slice(startIndex, endIndex);
        }

        load(); // Call the load function to initialize data
    }

    // Register the UniversityController with the AngularJS app
    app.controller('UniversityController', UniversityController);
})(app);
