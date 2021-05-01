using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Countries;
using storeroom.Application.Catalog.Countries.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.BackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _countryService;
        public CountryController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] GetCountryPagingRequest request)
        {
            var countries = await _countryService.GetAllPaging(request);
            return Ok(countries);
        }
        [HttpPost()]
        public async Task<IActionResult> Create(CountryCreateRequest request)
        {
            var result = await _countryService.Create(request);
            return Ok(result);
        }
        [HttpPut()]
        public async Task<IActionResult> Update(CountryUpdateRequest request)
        {
            var result = await _countryService.Update(request);
            return Ok(result);
        }
        [HttpDelete("{ma}")]
        public async Task<IActionResult> Delete(int ma)
        {
            var result = await _countryService.Delete(ma);
            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var brands = await _countryService.GetAll();
            return Ok(brands);
        }
    }
}
