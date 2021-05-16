using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [ApiController]
    [Route("[controller]/{action}")]
    public class StudentController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetStudents()
        {
            List<StudentMst> lst = new List<StudentMst>();
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    lst = db.StudentMsts.ToList();
                }
                var ret = new ObjectResult(new { Value = lst, Err = "" });
                return ret;
            }
            catch (System.Exception ex)
            {
                var ret = new ObjectResult(new { Value = lst, Err = "Bir hata oluştu! " + ex.Message });
                return ret;
            }
        }

        [HttpPost]
        public IActionResult DeleteStudent([FromBody] int SID)
        {
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    var c = db.StudentMsts.Where(su => su.Sid == SID).FirstOrDefault();
                    if (c != null)
                    {
                        var scs = db.StudentCourses.Where(sc => sc.Sid == SID).ToList();
                        if (scs.Count > 0)
                            db.StudentCourses.RemoveRange(scs.ToArray());
                        db.StudentMsts.Remove(c);
                        db.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        var ret = new ObjectResult(new { Value = 0, Err = "Student couldnt found!" });
                        return ret;
                    }
                }
            }
            catch (System.Exception ex)
            {
                var ret = new ObjectResult(new { Value = 0, Err = "Error! " + ex.Message });
                return ret;
            }
        }

        [HttpPost]
        public IActionResult SaveStudent([FromBody] StudentMst s)
        {
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    db.StudentMsts.Add(s);
                    db.SaveChanges();
                }
                var ret = new ObjectResult(new { Value = 0, Err = "" });
                return ret;
            }
            catch (System.Exception ex)
            {
                var ret = new ObjectResult(new { Value = 0, Err = "Error! " + ex.Message });
                return ret;
            }
        }
    }
}
