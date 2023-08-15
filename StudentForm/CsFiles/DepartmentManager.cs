using System.Collections.Generic;
using System.Linq;
using WebApplication.Data;

namespace WebApplication.Business
{
    public class DepartmentManager
    {
        private readonly DepartmentDataManager departmentDataManager;
        private readonly UniversityDataManager universityDataManager;

        public DepartmentManager(string connectionString)
        {
            departmentDataManager = new DepartmentDataManager(connectionString);
            universityDataManager = new UniversityDataManager(connectionString);
        }

        public List<DepartmentDetails> GetDepartmentDetails()
        {
            List<Department> allDepartments = departmentDataManager.GetDepartments();
            List<DepartmentDetails> departmentDetails = allDepartments.Select(MapToDepartmentDetails).ToList();
            return departmentDetails;
        }

        public List<DepartmentDetails> GetFilteredDepartmentDetails(string searchName)
        {
            List<Department> notFiltered = departmentDataManager.GetFilteredDepartments(searchName);
            List<DepartmentDetails> filtered = notFiltered.Where((x) => x != null).Select(MapToDepartmentDetails).ToList();
            return filtered;
        }


        public List<DepartmentInfo> GetDepartmentsByUniversity(int universityId)
        {
            List<DepartmentInfo> departments = departmentDataManager.GetDepartmentsByUniversity(universityId);
  
            return departments;
        }

        public void AddDepartment(DepartmentDetails departmentDetails)
        {
        

            departmentDataManager.AddDepartment(departmentDetails);
        }

        public void UpdateDepartment(DepartmentDetails departmentDetails)
        {
           

            departmentDataManager.UpdateDepartment(departmentDetails);
        }

        public void DeleteAllDepartments()
        {
            departmentDataManager.DeleteAllDepartments();
        }

        private DepartmentDetails MapToDepartmentDetails(Department department)
        {
            // Assuming UniversityDataManager has a method to get the university name by its Id
            string universityName = universityDataManager.GetUniversityNameById(department.UniversityId);
            return new DepartmentDetails(department.Id, department.Name, universityName);
        }
    }
}
