using System.Collections.Generic;
using System.Web.Http;
using WebApplication.Business;

namespace WebApplication.Controllers
{
    [RoutePrefix("api/student")]
    public class StudentController : ApiController
    {
        private readonly StudentManager studentManager;

        public StudentController()
        {
            string connectionString = "Server=localhost;Database=Internship;Trusted_Connection=True;";
            studentManager = new StudentManager(connectionString);
        }

        // GET api/student/filter?name=John
        [HttpGet]
        [Route("filter")]
        public List<StudentDetail> GetFilteredStudents([FromUri] string name)
        {
            // Retrieve and filter students based on the provided name and gender parameters
            List<StudentDetail> filteredStudents = studentManager.GetFilteredStudents(name);

            if (filteredStudents == null || filteredStudents.Count == 0)
            {
                throw new HttpResponseException(System.Net.HttpStatusCode.NotFound);
            }

            return filteredStudents;
        }

        // GET api/student/all
        [HttpGet]
        [Route("all")]
        public List<StudentDetail> GetStudents()
        {
            // Retrieve and filter students based on the provided name and gender parameters
            List<StudentDetail> allStudents = studentManager.GetStudents();

            if (allStudents == null || allStudents.Count == 0)
            {
                throw new HttpResponseException(System.Net.HttpStatusCode.NotFound);
            }

            return allStudents;
        }

        // POST api/student/update
        [HttpPost]
        [Route("update")]
        public void UpdateStudent([FromBody] Student studentDetail)
        {
            // Update student logic here
            studentManager.UpdateStudent(studentDetail);
        }


        // POST api/student/add
        [HttpPost]
        [Route("add")]
        public void AddStudent([FromBody] Student studentDetail)
        {
            // Add student logic here
            studentManager.AddStudent(studentDetail);

        }

        [HttpDelete]
        [Route("deleteAll")]
        public void DeleteAllStudents()
        {
            // Delete all students logic here
            studentManager.DeleteAllStudents();
        }
    }
}
