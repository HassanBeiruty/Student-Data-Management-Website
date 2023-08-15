using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Xml.Linq;
using WebApplication.Business;

namespace WebApplication.Data
{
    public class DepartmentDataManager : BaseDataManager
    {
        private readonly UniversityDataManager universityDataManager;
        public DepartmentDataManager(string connectionString) : base(connectionString)
        {
            universityDataManager = new UniversityDataManager(connectionString);
        }

      

        public List<Department> GetFilteredDepartments(string searchName)
        {
            string storedProcedure = "GetFilteredDepartments";

            return GetSPItems(storedProcedure, (reader) =>
            {
                string name = reader["Name"].ToString();
                if (name.StartsWith(searchName))
                {
                    int id = Convert.ToInt32(reader["Id"]);
                    int universityId = Convert.ToInt32(reader["UniversityId"]);
                    return new Department(id, name, universityId);
                }

                return null;
            },
            new SqlParameter("@searchName", $"{searchName}%"));
        }
        public List<Department> GetDepartments()
        {
            string storedProcedure = "GetAllDepartments";

            return GetSPItems(storedProcedure, (reader) =>
            {
                int id = Convert.ToInt32(reader["Id"]);
                string name = reader["Name"].ToString();
                int universityId = Convert.ToInt32(reader["UniversityId"]);
                return new Department(id, name, universityId);
            });
        }
        public List<DepartmentInfo> GetDepartmentsByUniversity(int universityId)
        {
            string storedProcedure = "GetDepartmentsByUniversity";

            return GetSPItems(storedProcedure, (reader) =>
            {
                int id = Convert.ToInt32(reader["Id"]);
                string name = reader["Name"].ToString();
                return new DepartmentInfo(id, name, universityId);
            },
            new SqlParameter("@universityId", universityId));

        }

        public void AddDepartment(DepartmentDetails departmentDetails)
        {
            int universityId = universityDataManager.GetUniversityIdByName(departmentDetails.UniversityName);

            Department department = new Department
            {
                Name = departmentDetails.Name,
                UniversityId = universityId
            };
            ExecuteNonQuery("AddDepartment",
                new SqlParameter("@name", department.Name),
                new SqlParameter("@universityId", department.UniversityId));
        }

        public void UpdateDepartment(DepartmentDetails departmentDetails)
        {
            int universityId = universityDataManager.GetUniversityIdByName(departmentDetails.UniversityName);

            Department department = new Department
            {
                Id = departmentDetails.Id,
                Name = departmentDetails.Name,
                UniversityId = universityId
            };
            ExecuteNonQuery("UpdateDepartment",
                new SqlParameter("@id", department.Id),
                new SqlParameter("@name", department.Name),
                new SqlParameter("@universityId", department.UniversityId));
        }

        public void DeleteAllDepartments()
        {
            ExecuteNonQuery("DeleteAllDepartments");
        }
        public string GetDepartmentNameById(int departmentId)
        {
            string storedProcedure = "GetDepartmentNameById";

            List<Department> departments = GetSPItems(storedProcedure,
                (reader) => new Department(0, reader["Name"].ToString(), 1),
                new SqlParameter("@departmentId", departmentId));

            return departments.FirstOrDefault()?.Name;
        }
        public int GetDepartmentIdByName(string departmentName)
        {
            string storedProcedure = "GetDepartmentIdByName";
            object result = GetScalarValueFromSP<int>(storedProcedure, new SqlParameter("@departmentName", departmentName));

            // Convert the result to an integer (DepartmentId)
            int departmentId = Convert.ToInt32(result);

            return departmentId;
        }

    }
}
