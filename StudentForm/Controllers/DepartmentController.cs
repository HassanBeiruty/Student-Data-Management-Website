using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Business;

namespace WebApplication.Controllers
{
    // GET api/<controller>
    [RoutePrefix("api/department")]
    public class DepartmentController : ApiController
    {
        private readonly DepartmentManager departmentManager;

        public DepartmentController()
        {
            string connectionString = "Server=localhost;Database=Internship;Trusted_Connection=True;";
            departmentManager = new DepartmentManager(connectionString);
        }

        // GET api/department/filterDepartments?name=Computer Science
        [HttpGet]
        [Route("filterDepartments")]
        public List<DepartmentDetails> GetFilteredDepartments([FromUri] string name)
        {
            // Retrieve and filter departments based on the provided name
            List<DepartmentDetails> filteredDepartments = departmentManager.GetFilteredDepartmentDetails(name);

            if (filteredDepartments == null || filteredDepartments.Count == 0)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return filteredDepartments;
        }

        // GET api/department/filterDepartmentsByUniversity?universityId=1
        [HttpGet]
        [Route("filterDepartmentsByUniversity")]
        public List<DepartmentInfo> GetDepartmentsByUniversity([FromUri] int universityId)
        {
            // Retrieve departments filtered by universityId
            List<DepartmentInfo> allDepartments = departmentManager.GetDepartmentsByUniversity(universityId);

            if (allDepartments == null || allDepartments.Count == 0)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return allDepartments;
        }

        // GET api/department/allDepartments
        [HttpGet]
        [Route("allDepartments")]
        public List<DepartmentDetails> GetDepartments()
        {
            // Retrieve all departments
            List<DepartmentDetails> allDepartments = departmentManager.GetDepartmentDetails();

            if (allDepartments == null || allDepartments.Count == 0)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return allDepartments;
        }

        // DepartmentController.cs

        [HttpPost]
        [Route("updateDepartment")]
        public void UpdateDepartment([FromBody] DepartmentDetails departmentDetails)
        {
            departmentManager.UpdateDepartment(departmentDetails);
        }

        [HttpPost]
        [Route("addDepartment")]
        public void AddDepartment([FromBody] DepartmentDetails departmentDetails)
        {
            departmentManager.AddDepartment(departmentDetails);
        }


        [HttpDelete]
        [Route("deleteAllDepartments")]
        public void DeleteAllDepartments()
        {
            // Delete all departments logic here
            departmentManager.DeleteAllDepartments();
        }
    }
}
