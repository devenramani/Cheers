﻿using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Cheers.DB;
using Cheers.DB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cheers.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CheerTimelineController : Controller
    {
        
        CheersDbContext _dbContext;
        public CheerTimelineController(CheersDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/<controller>
        [HttpGet("GetAllCheers")]
        public JsonResult GetAllCheers()
        {
            var allcheers = _dbContext.CheerTable.Select(c => new { c.CheerID, c.CheerText, c.CheerTo, c.CheerFrom, c.CheerTime }).OrderByDescending(c => c.CheerID);

            return Json(new { allcheers });
        }

        // POST api/<controller>
        [HttpPost("SendCheer")]
        public string SendCheer([FromBody]CheerTable cheer)
        {
            var cheerDetails = new CheerTable
            {
                CheerFrom = cheer.CheerFrom,
                CheerTo = cheer.CheerTo,
                CheerText = cheer.CheerText,
                CheerTime = cheer.CheerTime
            };

            _dbContext.CheerTable.Add(cheerDetails);
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
