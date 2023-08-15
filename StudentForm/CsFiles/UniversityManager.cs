using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using WebApplication.Data;

namespace WebApplication.Business
{
    public class UniversityManager
    {
        private readonly UniversityDataManager UniversityDataManager;

        public UniversityManager(string connectionString)
        {
            UniversityDataManager = new UniversityDataManager(connectionString);
        }

        public List<UniversityInfo> GetUniversities()
        {
            List<University> allUniversities = UniversityDataManager.GetUniversities();
            List<UniversityInfo> universitiesInfo = allUniversities.Select(u => new UniversityInfo(u.Id, u.Name)).ToList();
            return universitiesInfo;
        }

        public List<UniversityInfo> GetFilteredUniversities(string searchName)
        {
            List<University> notFiltered = UniversityDataManager.GetFilteredUniversities(searchName);
            List<University> filtered = notFiltered.Where(x => x != null).ToList();
            List<UniversityInfo> filteredUniversitiesInfo = filtered.Select(u => new UniversityInfo(u.Id, u.Name)).ToList();
            return filteredUniversitiesInfo;
        }

        public void AddUniversity(UniversityInfo universityInfo)
        {
            University university = new University
            {
                Id = universityInfo.Id,
                Name = universityInfo.Name
            };
            UniversityDataManager.AddUniversity(university);
        }

        public void UpdateUniversity(UniversityInfo universityInfo)
        {
            University university = new University
            {
                Id = universityInfo.Id,
                Name = universityInfo.Name
            };
            UniversityDataManager.UpdateUniversity(university);
        }

        public void DeleteAllUniversities()
        {
            UniversityDataManager.DeleteAllUniversities();
        }
   

    }
}
