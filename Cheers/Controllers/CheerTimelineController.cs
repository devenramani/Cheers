using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
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
        IConfiguration _iconfiguration;
        public CheerTimelineController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }
        // GET: api/<controller>
        [HttpGet("GetAllCheers")]
        public JsonResult GetAllCheers()
        {
            string connectionstring = _iconfiguration.GetConnectionString("CheersDbConnection");

            using (SqlConnection connection = new SqlConnection(connectionstring))
            {
                connection.Open();

                string getAllCheers = @"SELECT * FROM DBO.CheerTable";

                SqlCommand getAllCheersCommand = new SqlCommand(getAllCheers, connection);

                SqlDataReader reader = getAllCheersCommand.ExecuteReader();

                ArrayList allCheers = new ArrayList();

                while (reader.Read())
                {
                    allCheers.Add(new
                    {
                        CheerID = reader["CheerID"],
                        CheerText = reader["CheerText"],
                        CheerTo = reader["CheerTo"],
                        CheerFrom = reader["CheerFrom"],
                        CheerTime = reader["CheerTime"]
                    });
                }

                return Json(new { allCheers });
            }
        }

        // POST api/<controller>
        [HttpPost("SendCheer")]
        public string Post([FromBody]CheerTable cheer)
        {
            string connectionstring = _iconfiguration.GetConnectionString("CheersDbConnection");
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionstring))
                {
                    connection.Open();

                    string insertCheer = @"INSERT INTO dbo.CheerTable(CheerFrom,CheerTo,CheerText,CheerTime) VALUES('" + cheer.CheerFrom + "','" + cheer.CheerTo + "','" + cheer.CheerText + "','" + cheer.CheerTime + "')";

                    SqlCommand insertCheerCommand = new SqlCommand(insertCheer, connection);

                    insertCheerCommand.ExecuteNonQuery();

                    connection.Close();

                    return "success";
                }
            }
            catch (System.Exception)
            {

                return "fail";
            }

        }

    }
}
