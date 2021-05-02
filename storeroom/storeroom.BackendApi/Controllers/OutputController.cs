using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Outputs;
using storeroom.Application.Catalog.Outputs.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.BackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OutputController : ControllerBase
    {
        private readonly IOutputService _outputService;
        public OutputController(IOutputService outputService)
        {
            _outputService = outputService;
        }
        [HttpPost()]
        public async Task<IActionResult> Create(OutputCreateRequest request)
        {
            var result = await _outputService.Create(request);
            return Ok(result);
        }
    }
}
