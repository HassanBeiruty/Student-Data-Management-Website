using System;

namespace WebApplication.Business
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UniversityId { get; set; }

        public Department()
        {
            Id = 0;
            Name = "Default Department";
            UniversityId = 0;
        }

        public Department(int id, string name, int universityId)
        {
            Id = id;
            Name = name;
            UniversityId = universityId;
        }

        public Department(Department other)
        {
            Id = other.Id;
            Name = other.Name;
            UniversityId = other.UniversityId;
        }
    }
}
