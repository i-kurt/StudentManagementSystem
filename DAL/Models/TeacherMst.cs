﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace DAL.Models
{
    public partial class TeacherMst
    {
        public TeacherMst()
        {
            TeacherCourses = new HashSet<TeacherCourse>();
        }

        public int Tid { get; set; }
        public string Tname { get; set; }
        public string Education { get; set; }

        [JsonIgnore]
        public virtual ICollection<TeacherCourse> TeacherCourses { get; set; }
    }
}
