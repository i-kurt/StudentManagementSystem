using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Web.Controllers
{
    [Authorize()]
    [ApiController]
    [Route("[controller]/{action}")]
    public class CoursesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetCourses()
        {
            List<CourseMst> lst = new List<CourseMst>();
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    lst = db.CourseMsts.ToList();
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

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult DeleteCourse([FromBody] int CID)
        {
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    var c = db.CourseMsts.Where(cu => cu.Cid == CID).FirstOrDefault();
                    if (c != null)
                    {
                        db.CourseMsts.Remove(c);
                        db.SaveChanges();
                        var ret = new ObjectResult(new { Value = 0, Err = "" });
                        return ret;
                    }
                    else
                    {
                        var ret = new ObjectResult(new { Value = 0, Err = "Course couldnt found!" });
                        return ret;
                    }
                }
            }
            catch (System.Exception ex)
            {
                if (ex.InnerException != null && ex.InnerException.Message.ToLowerInvariant().Contains("reference constraint"))
                {
                    var ret = new ObjectResult(new { Value = 0, Err = "Error! This course is referenced to other records!"});
                    return ret;
                }
                else
                {
                    var ret = new ObjectResult(new { Value = 0, Err = "Error! " + ex.Message });
                    return ret;
                }
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult SaveCourse([FromBody] CourseMst c)
        {
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    db.CourseMsts.Add(c);
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
