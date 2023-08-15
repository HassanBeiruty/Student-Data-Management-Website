using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using WebApplication.Business;

namespace WebApplication.Data
{
    public class UniversityDataManager : BaseDataManager
    {
        public UniversityDataManager(string connectionString) : base(connectionString)
        {
        }

        public List<University> GetUniversities()
        {
            string storedProcedure = "GetAllUniversities";

            return GetSPItems(storedProcedure, (reader) =>
            {
                string name = reader["Name"].ToString();
                return new University(Convert.ToInt32(reader["Id"]), name);
            });
        }

        public List<University> GetFilteredUniversities(string searchName)
        {
            string storedProcedure = "GetFilteredUniversities";

            return GetSPItems(storedProcedure, (reader) =>
            {
                string name = reader["Name"].ToString();
                if (name.StartsWith(searchName))
                {
                    return new University(Convert.ToInt32(reader["Id"]), name);
                }

                return null;
            },
            new SqlParameter("@searchName", $"{searchName}%"));
        }

        public void AddUniversity(University university)
        {
            ExecuteNonQuery("AddUniversity",
                new SqlParameter("@name", university.Name));
        }

        public void UpdateUniversity(University university)
        {
            ExecuteNonQuery("UpdateUniversity",
                new SqlParameter("@id", university.Id),
                new SqlParameter("@name", university.Name));
        }

        public void DeleteAllUniversities()
        {
            ExecuteNonQuery("DeleteAllUniversities");
        }

        public string GetUniversityNameById(int universityId)
        {
            string storedProcedure = "GetUniversityNameById";

            List<University> universities = GetSPItems(storedProcedure,
                (reader) => new University(0, reader["Name"].ToString()),
                new SqlParameter("@universityId", universityId));

            return universities.FirstOrDefault()?.Name;
        }
        public int GetUniversityIdByName(string universityName)
        {
            string storedProcedure = "GetUniversityIdByName";
            object result = GetScalarValueFromSP<int>(storedProcedure, new SqlParameter("@universityName", universityName));

            // Convert the result to an integer (UniversityId)
            int universityId = Convert.ToInt32(result);

            return universityId;
        }



    }
}
