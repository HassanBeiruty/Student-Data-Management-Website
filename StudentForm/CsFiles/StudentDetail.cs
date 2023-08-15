using System;

namespace WebApplication.Business
{
    public class StudentDetail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public GenderEnum Gender { get; set; }
        public string GenderString { get; set; }
        public string DepartmentName { get; set; }
        public string UniversityName { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public StudentDetail()
        {
            this.Id = 0;
            this.Name = "John Doe";
            this.Gender = GenderEnum.Male;
        }

        public StudentDetail(int id, string name, GenderEnum gender, string departmentName, string universityName, PaymentMethod paymentMethod)
        {
            Id = id;
            Name = name;
            Gender = gender;
            GenderString = gender.ToString();
            DepartmentName = departmentName;
            UniversityName = universityName;
            PaymentMethod = paymentMethod;
        }

    }

}
