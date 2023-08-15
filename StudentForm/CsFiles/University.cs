using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace WebApplication.Business
{
    public class University
    {
        public int Id { get; set; }
        public string Name { get; set; }
      

        

        public University()
        {
            this.Id = 0;
            this.Name = "John Doe";
          
        }
        public University(int Id, string Name)
        {
            this.Id = Id;
            this.Name = Name;
           
        }


        public University(University other)
        {
            Id = other.Id;
            Name = other.Name;
        }
    }
}
