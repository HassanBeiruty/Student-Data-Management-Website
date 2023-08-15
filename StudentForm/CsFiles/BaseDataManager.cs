
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace WebApplication.Data
{
    public class BaseDataManager : IDisposable
    {
        private string connectionString;
        private SqlConnection connection;

        public BaseDataManager(string connectionString)
        {
            this.connectionString = connectionString;
            connection = new SqlConnection(connectionString);
        }

        public int ExecuteNonQuery(string storedProcedureName, params SqlParameter[] parameters)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(storedProcedureName, connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddRange(parameters);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }




        /// <summary>
        /// /////////////////////////////////////////////////////



        public List<T> GetSPItems<T>(string storedProcedureName, Func<IDataReader, T> mapFunction, params SqlParameter[] parameters)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(storedProcedureName, connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddRange(parameters);

                connection.Open();

                using (IDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    List<T> items = new List<T>();

                    while (reader.Read())
                    {
                        T item = mapFunction(reader);
                        items.Add(item);
                    }

                    return items;
                }
            }
        }
        public T GetScalarValueFromSP<T>(string storedProcedure, params SqlParameter[] parameters)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(storedProcedure, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(parameters);

                    connection.Open();
                    var result = command.ExecuteScalar();

                    if (result != null && result != DBNull.Value)
                    {
                        return (T)Convert.ChangeType(result, typeof(T));
                    }

                    return default(T);
                }
            }
        }





        public void Dispose()
        {
            if (connection != null)
            {
                connection.Dispose();
                connection = null;
            }
        }
    }
}
