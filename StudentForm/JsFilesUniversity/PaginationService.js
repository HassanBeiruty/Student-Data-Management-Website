console.log("Pagination");
app.service('PaginationService', function () {

    this.getPages = function (filteredItems, currentPage, pageSize) {
        var totalPages = Math.ceil(filteredItems.length / pageSize);
        var pages = [];

        for (var i = 1; i <= totalPages; i++) {
            var page = {
                title: i,
                isPrevious: i === 1,
                isNext: i === totalPages,
                from: (i - 1) * pageSize + 1,
                to: Math.min(i * pageSize, filteredItems.length)
            };
            pages.push(page);
        }

        return pages;
    };

    //this.setPage = function (page, currentPage, totalPages) {
    //    if (page === 'first') {
    //        return 1;
    //    } else if (page === 'last') {
    //        return totalPages;
    //    } else if (page === 'prev') {
    //        return currentPage - 1 > 0 ? currentPage - 1 : 1;
    //    } else if (page === 'next') {
    //        return currentPage + 1 < totalPages ? currentPage + 1 : totalPages;
    //    } else {
    //        return page;

    //    }
    //};
    this.setPage = function (page, currentPage, totalPages) {
        if (page === 'first') {
            return 1;
        } else if (page === 'last') {
            return totalPages;
        } else if (page === 'prev') {
            return currentPage - 1 > 0 ? currentPage - 1 : 1;
        } else if (page === 'next') {
            return currentPage + 1 < totalPages ? currentPage + 1 : totalPages;
        } else if (!isNaN(page)) {
            return parseInt(page);
        } else {
            return currentPage;
        }
    };


});
  //this.buildPages = function (filteredStudents, currentPage, pageSize) {
    //    var totalPages = Math.ceil(filteredStudents.length / pageSize);
    //    var pages = [];

    //    for (var i = 1; i <= totalPages; i++) {
    //        var page = {
    //            title: i,
    //            from: (i - 1) * pageSize + 1,
    //            to: Math.min(i * pageSize, filteredStudents.length),
    //            isFirst: i === 1,
    //            isLast: i === totalPages,
    //            isPrevious: false,
    //            isNext: false
    //        };
    //        pages.push(page);
    //    }

    //    return pages;
    //};



