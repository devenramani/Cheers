using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;

namespace Cheers.Controllers
{

    [Route("api/[controller]")]
    public class AccountController : Controller
    {

        IConfiguration _iconfiguration;
        public AccountController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }
        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        [HttpGet("GetUser")]
        public JsonResult UserIdentity()
        {
            var identity = User.Identity as ClaimsIdentity;

            string fullName = identity.Claims.FirstOrDefault(c => c.Type == "name")?.Value;
            string UPN = identity.Claims.FirstOrDefault(c => c.Type.EndsWith("upn"))?.Value;
            string firstName = identity.Claims.FirstOrDefault(c => c.Type.EndsWith("givenname"))?.Value;
            string lastName = identity.Claims.FirstOrDefault(c => c.Type.EndsWith("surname"))?.Value;
            string userGUID = identity.Claims.FirstOrDefault(c => c.Type.EndsWith("objectidentifier"))?.Value;

            string connectionstring = _iconfiguration.GetConnectionString("CheersDbConnection");

            using (SqlConnection connection = new SqlConnection(connectionstring))
            {
                connection.Open();

                string getUser = @"SELECT Count(*) FROM DBO.Users where UPN='" + UPN + "'";

                SqlCommand getUserCommand = new SqlCommand(getUser, connection);

                int record = (int)getUserCommand.ExecuteScalar();

                if (record > 0)
                {
                    connection.Close();
                    return Json(new { fullName, firstLogin = false });
                }
                else
                {
                    string insertUserDetails = @"INSERT INTO dbo.Users(UserGUID,UPN,FirstName,LastName,FullName) VALUES('" + userGUID + "','" + UPN + "','" + firstName + "','" + lastName + "','" + fullName + "')";

                    SqlCommand insertUserDetailsCommand = new SqlCommand(insertUserDetails, connection);

                    insertUserDetailsCommand.ExecuteNonQuery();

                    connection.Close();
                    return Json(new { fullName, firstLogin = true });


                }

            }

        }
    }
}