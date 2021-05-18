using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Users;
using storeroom.Application.Catalog.Users.Dtos;
using storeroom.WebApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IUserApiClient _userApiClient;
        public UserController(IUserService userService, IUserApiClient userApiClient)
        {
            _userService = userService;
            _userApiClient = userApiClient;
        }
        [HttpPost("authenticate")]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var resultToken = await _userService.Authencate(request);
            if (string.IsNullOrEmpty(resultToken))
            {
                return BadRequest("UserName or password is incorrect");
            }
            else
            {
                HttpContext.Session.SetString("Token", resultToken);
            }

            return Ok(resultToken);
        }
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _userService.Register(request);
            if (result == false)
            {
                return BadRequest("Register is unsuccesful");
            }
            return Ok();
        }
       /* [Authorize, HttpGet("getCurrentUserLogged")]
        public async Task<IActionResult> GetUserLogin()
        {
            var userName = User.Identity.Name;
            var user = await _userService.GetUserByName(userName);
            return Ok(user);
        }*/
    }
}
