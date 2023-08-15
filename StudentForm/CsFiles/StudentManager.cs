using System.Collections.Generic;
using System.Linq;
using WebApplication.Data;

namespace WebApplication.Business
{
    public class StudentManager
    {
        private readonly StudentDataManager studentDataManager;


        public StudentManager(string connectionString)
        {
            studentDataManager = new StudentDataManager(connectionString);
        }

        public List<StudentDetail> GetStudents()
        {
            List<StudentDetail> allStudents = studentDataManager.GetStudents();
            return allStudents;
        }

        public List<StudentDetail> GetFilteredStudents(string searchName)
        {
            List<StudentDetail> filtered = studentDataManager.GetFilteredStudents(searchName);
         
            return filtered;
        }

        public void AddStudent(Student studentDetail)
        {
            studentDataManager.AddStudent(studentDetail);
        }

        public void UpdateStudent(Student studentDetail)
        {
            studentDataManager.UpdateStudent(studentDetail);
        }

        public void DeleteAllStudents()
        {
            studentDataManager.DeleteAllStudents();
        }

      
    }
}
