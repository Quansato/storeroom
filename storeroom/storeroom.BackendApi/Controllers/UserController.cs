using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Users;
using storeroom.Application.Catalog.Users.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Security.Claims;
using System.Threading.Tasks;

namespace storeroom.BackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private const string CacheKey = "principal";
        public UserController(IUserService userService)
        {
            _userService = userService;
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
        [HttpGet("paging")]
        public async Task<IActionResult> GetAllPaging([FromQuery]GetUserPagingRequest request)
        {
            var users = await _userService.GetUserPaging(request);
            return Ok(users);
        }
        [HttpGet()]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAll();
            return Ok(users);
        }

        [Authorize, HttpGet("getCurrentUserLogged")]
        public async Task<IActionResult> GetUserLogin()
        {
            var userName = User.Identity.Name;
            var user = await _userService.GetUserByName(userName);
            return Ok(user);
        }

        [HttpPut("{userName}/roles")]
        public async Task<IActionResult> RoleAssign(string userName, [FromBody] RoleAssignRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.RoleAssign(userName, request);
            if (!result.IsSuccessed)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("roles/getAll")]
        public async Task<IActionResult> GetAllRole()
        {
            var roles = await _userService.GetAllRole();
            return Ok(roles);
        }
    }
}
