﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Business
{
    public class UniversityInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public UniversityInfo(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}