using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Business
{
    public class DepartmentInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UniversityId { get; set; }

        public DepartmentInfo(int id, string name, int universityId)
        {
            Id = id;
            Name = name;
            UniversityId = universityId;
        }
    }
}