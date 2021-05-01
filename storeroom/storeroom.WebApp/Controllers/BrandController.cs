using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Brands;
using storeroom.Application.Catalog.Brands.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }

        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] GetBrandPagingRequest request)
        {
            var brands = await _brandService.GetAllPaging(request);
            return Ok(brands);
        }
        [HttpPost()]
        public async Task<IActionResult> Create(BrandCreateRequest request)
        {
            var result = await _brandService.Create(request);
            return Ok(result);
        }
        [HttpPut()]
        public async Task<IActionResult> Update(BrandUpdateRequest request)
        {
            var result = await _brandService.Update(request);
            return Ok(result);
        }
        [HttpDelete("{ma}")]
        public async Task<IActionResult> Delete(int ma)
        {
            var result = await _brandService.Delete(ma);
            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var brands = await _brandService.GetAll();
            return Ok(brands);
        }
    }
}
