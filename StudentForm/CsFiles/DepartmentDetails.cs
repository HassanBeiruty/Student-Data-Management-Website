using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Business
{
    public class DepartmentDetails
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UniversityName { get; set; }

        public DepartmentDetails(int id, string name, string universityName)
        {
            Id = id;
            Name = name;
            UniversityName = universityName;
        }
    }
}
