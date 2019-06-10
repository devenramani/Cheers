using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Cheers.DB;
using Cheers.DB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Newtonsoft.Json;

namespace Cheers.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {

        IConfiguration _iconfiguration;
        CheersDbContext _dbContext;
        public AccountController(IConfiguration iconfiguration, CheersDbContext dbContext)
        {
            _iconfiguration = iconfiguration;
            _dbContext = dbContext;

        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("GetUser")]
        public JsonResult UserIdentity()
        {
            var identity = User.Identity as ClaimsIdentity;

            var user = new User
            {
                UserGUID = identity.Claims.FirstOrDefault(c => c.Type.EndsWith("objectidentifier"))?.Value,
                FirstName = identity.Claims.FirstOrDefault(c => c.Type.EndsWith("givenname"))?.Value,
                LastName = identity.Claims.FirstOrDefault(c => c.Type.EndsWith("surname"))?.Value,
                UPN = identity.Claims.FirstOrDefault(c => c.Type.EndsWith("upn"))?.Value,
                FullName = identity.Claims.FirstOrDefault(c => c.Type == "name")?.Value
            };

            var userCount = _dbContext.Users.Where(u => u.UPN == user.UPN).Count();

            if (userCount > 0)
            {
                return Json(new { user.FullName, user.UPN, firstLogin = false });
            }
            else
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();

                return Json(new { user.FullName, user.UPN, firstLogin = true });

            }

        }

        [HttpGet("GetAllUsers")]
        public JsonResult GetAllUsers()
        {

            var allUsers = _dbContext.Users.Select(u => new { u.FullName, u.UPN });

            return Json(new { allUsers });

            

        }
    }
}