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
    [RoutePrefix("api/university")]
    public class UniversityController : ApiController
    {
        private readonly UniversityManager UniversityManager;

        public UniversityController()
        {
            string connectionString = "Server=localhost;Database=Internship;Trusted_Connection=True;";
            UniversityManager = new UniversityManager(connectionString);
        }

        // GET api/university/filterUniversities?name=John
        [HttpGet]
        [Route("filterUniversities")]
        public List<UniversityInfo> GetFilteredUniversities([FromUri] string name)
        {
            // Retrieve and filter University based on the provided name and gender parameters
            List<UniversityInfo> filteredUniversities = UniversityManager.GetFilteredUniversities(name);

            if (filteredUniversities == null || filteredUniversities.Count == 0)
            {
                throw new HttpResponseException(System.Net.HttpStatusCode.NotFound);
            }

            return filteredUniversities;
        }

        // GET api/university/allUniversities
        [HttpGet]
        [Route("allUniversities")]
        public List<UniversityInfo> GetUniversities()
        {
            // Retrieve and filter students based on the provided name and gender parameters
            List<UniversityInfo> allUniversities = UniversityManager.GetUniversities();

            if (allUniversities == null || allUniversities.Count == 0)
            {
                throw new HttpResponseException(System.Net.HttpStatusCode.NotFound);
            }

            return allUniversities;
        }

        // POST api/university/updateUniversity
        [HttpPost]
        [Route("updateUniversity")]
        public void UpdateUniversity([FromBody] UniversityInfo University)
        {
            // Update University logic here
            UniversityManager.UpdateUniversity(University);
        }

        // POST api/university/addUniversity
        [HttpPost]
        [Route("addUniversity")]
        public void AddUniversity([FromBody] UniversityInfo University)
        {
            // Add University logic here
            UniversityManager.AddUniversity(University);
        }

        [HttpDelete]
        [Route("deleteAllUniversities")]
        public void DeleteAllUniversities()
        {
            // Delete all students logic here
            UniversityManager.DeleteAllUniversities();
        }
    }
}
