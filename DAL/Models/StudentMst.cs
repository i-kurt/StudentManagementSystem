using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace DAL.Models
{
    public partial class StudentMst
    {
        public StudentMst()
        {
            StudentCourses = new HashSet<StudentCourse>();
        }

        public int Sid { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string ContactNo { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public virtual ICollection<StudentCourse> StudentCourses { get; set; }
    }
}
