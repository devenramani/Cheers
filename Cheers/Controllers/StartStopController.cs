using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cheers.DB;
using Cheers.DB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cheers.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class StartStopController : Controller
    {
        CheersDbContext _dbContext;

        public StartStopController(CheersDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET: /<controller>/
        [HttpGet("GetAllStartStops")]
        public JsonResult GetAllStartStops()
        {
            var allStartStops = _dbContext.StartStop.Select(s => new { s.Title, s.Subject, s.Id, s.Text, s.TimeStamp, s.From }).OrderByDescending(s => s.Id);

            return Json(new { allStartStops });
        }

        [HttpPost("SendStartStop")]
        public string SendStartStop([FromBody]DB.Models.StartStop ss)
        {
            var infoStartStop = new DB.Models.StartStop
            {
                Title = ss.Title,
                Subject = ss.Subject,
                Text = ss.Text,
                TimeStamp = ss.TimeStamp,
                From = ss.From
            };

            _dbContext.StartStop.Add(infoStartStop);

            var flag = _dbContext.SaveChanges();

            if (flag == 1)
            {
                return "success";
            }
            else
            {
                return "fail";
            }
        }
    }
}
