using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Materials;
using storeroom.Application.Catalog.Materials.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialService _materialService;
        public MaterialController(IMaterialService materialService)
        {
            _materialService = materialService;
        }

        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] GetMaterialPagingRequest request)
        {
            var materials = await _materialService.GetAllPaging(request);
            return Ok(materials);
        }
    }
}
