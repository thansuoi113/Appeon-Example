using Appeon.DataStoreDemo.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Appeon.SnapObjectsDemo.API.Controllers
{
    
    [ApiController]
    [Route("api/")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService LoginService;
        public LoginController(ILoginService loginService)
        {
            LoginService = loginService;
        }
        
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginUser lgUser)
        {
            var loggedIn = LoginService.Login(lgUser.Username, lgUser.Password);
            if (loggedIn)
                return Ok();
            return Unauthorized();
        }
    }
    
    public class LoginUser 
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
