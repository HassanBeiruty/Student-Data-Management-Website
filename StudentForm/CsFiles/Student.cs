using System;

namespace WebApplication.Business
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public GenderEnum Gender { get; set; }
        public string GenderString { get; set; }

        // New properties to relate Student to University and Department
        public int UniversityId { get; set; }
        public int DepartmentId { get; set; }


        public string PaymentMethodJson { get; set; }

        public Student()
        {
            this.Id = 0;
            this.Name = "John Doe";
            this.Gender = GenderEnum.Male;
            this.UniversityId = 0;
            this.DepartmentId = 0;
            PaymentMethodJson = null;
        }


        public Student(int Id, string Name, GenderEnum Gender, int UniversityId, int DepartmentId, string PaymentMethodJson )
        {
            this.Id = Id;
            this.Name = Name;
            this.Gender = Gender;
            this.GenderString = Gender.ToString();
            this.UniversityId = UniversityId;
            this.DepartmentId = DepartmentId;
            this.PaymentMethodJson = PaymentMethodJson;
        }

    }

    public enum GenderEnum
    {
        Unknown,
        Male,
        Female
    }
}
