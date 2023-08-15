// StudentDataManager.cs
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Remoting.Messaging;
using System.Xml.Linq;
using WebApplication.Business;

namespace WebApplication.Data
{
    public class StudentDataManager : BaseDataManager
    {
        private readonly UniversityDataManager universityDataManager;
        private readonly DepartmentDataManager departmentDataManager;

        public StudentDataManager(string connectionString) : base(connectionString)
        {
            universityDataManager = new UniversityDataManager(connectionString);
            departmentDataManager = new DepartmentDataManager(connectionString);
        }

        public List<StudentDetail> GetStudents()
        {
            string storedProcedure = "GetAllStudents";

            return GetSPItems(storedProcedure, (reader) =>
            {
                int id = Convert.ToInt32(reader["Id"]);
                string name = reader["Name"].ToString();
                string gender = reader["Gender"].ToString();

                // Get the UniversityId by UniversityName using the UniversityDataManager
                int universityId = Convert.ToInt32(reader["UniversityId"]);
                string universityName = universityDataManager.GetUniversityNameById(universityId);

                // Get the DepartmentId by DepartmentName using the DepartmentDataManager
                int departmentId = Convert.ToInt32(reader["DepartmentId"]);
                string departmentName = departmentDataManager.GetDepartmentNameById(departmentId);

                // Deserialize the PaymentMethod JSON string and create the PaymentMethod object
                PaymentMethod paymentMethod = DeserializePaymentMethod(reader["PaymentMethod"].ToString());

                if (gender.Equals("Male"))
                {
                    return new StudentDetail(id, name, GenderEnum.Male, departmentName, universityName, paymentMethod);
                }
                return new StudentDetail(id, name, GenderEnum.Female, departmentName, universityName, paymentMethod);
            });
        }

        public List<StudentDetail> GetFilteredStudents(string searchName)
        {
            string storedProcedure = "GetFilteredStudents";

            return GetSPItems(storedProcedure, (reader) =>
            {
                string name = reader["Name"].ToString();
                if (name.StartsWith(searchName))
                {
                    int id = Convert.ToInt32(reader["Id"]);
                    string gender = reader["Gender"].ToString();

                    // Get the UniversityId by UniversityName using the UniversityDataManager
                    int universityId = Convert.ToInt32(reader["UniversityId"]);
                    string universityName = universityDataManager.GetUniversityNameById(universityId);

                    // Get the DepartmentId by DepartmentName using the DepartmentDataManager
                    int departmentId = Convert.ToInt32(reader["DepartmentId"]);
                    string departmentName = departmentDataManager.GetDepartmentNameById(departmentId);

                    // Deserialize the PaymentMethod JSON string and create the PaymentMethod object
                    PaymentMethod paymentMethod = DeserializePaymentMethod(reader["PaymentMethod"].ToString());

                    if (gender.Equals("Male"))
                    {
                        return new StudentDetail(id, name, GenderEnum.Male, departmentName, universityName, paymentMethod);
                    }
                    return new StudentDetail(id, name, GenderEnum.Female, departmentName, universityName, paymentMethod);
                }

                return null;
            },
            new SqlParameter("@searchName", $"{searchName}%"));
        }


        public void AddStudent(Student studentDetails)
        {

            ExecuteNonQuery("AddStudent",
                new SqlParameter("@name", studentDetails.Name),
                new SqlParameter("@gender", studentDetails.Gender.ToString()),
                new SqlParameter("@universityId", studentDetails.UniversityId),
                new SqlParameter("@departmentId", studentDetails.DepartmentId),
                new SqlParameter("@paymentMethod", SqlDbType.NVarChar) { Value = studentDetails.PaymentMethodJson });

        }

        public void UpdateStudent(Student studentDetails)
        {

            ExecuteNonQuery("UpdateStudent",
                new SqlParameter("@id", studentDetails.Id),
                new SqlParameter("@name", studentDetails.Name),
                new SqlParameter("@gender", studentDetails.Gender.ToString()),
                new SqlParameter("@universityId", studentDetails.UniversityId),
                new SqlParameter("@departmentId", studentDetails.DepartmentId),
                new SqlParameter("@paymentMethod", SqlDbType.NVarChar) { Value = studentDetails.PaymentMethodJson });
           
        }

        public void DeleteAllStudents()
        {
            ExecuteNonQuery("DeleteAllStudents");
        }

        public string SerializePaymentMethod(PaymentMethod paymentMethod)
        {
            return JsonConvert.SerializeObject(paymentMethod, Formatting.None, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Objects
            });
        }
        private PaymentMethod DeserializePaymentMethod(string json)
        {
            if (string.IsNullOrEmpty(json))
            {
                return null;
            }

            var jsonSettings = new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Objects
            };

            // Deserialize the JSON without creating an instance
            var jObject = JsonConvert.DeserializeObject<JObject>(json, jsonSettings);

            // Check the $type property to determine the type of the object
            string objectType = jObject["$type"].ToString();


            if (objectType.Contains("Cash"))
            {
                decimal amount = jObject.Value<decimal>("Amount");
                string currencyId = jObject.Value<string>("CurrencyId");

                // Convert string currencyId to Currency enum
                Currency currency;
                if (!Enum.TryParse(currencyId, out currency))
                {
                    currency = Currency.USD;
                }

                Cash cash = new Cash(amount, currency);
                return cash;
            }
            else if(objectType.Contains("Bank"))
{
                decimal amount = jObject.Value<decimal>("Amount");
                string currencyId = jObject.Value<string>("CurrencyId");
                string bankName = jObject.Value<string>("BankName"); 

              
                Bank bank = new Bank(amount, bankName);
                return bank;
            }
       
        return null;
          
        }



    }
}
