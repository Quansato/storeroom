using Newtonsoft.Json;
using storeroom.Application.Catalog.Users.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.WebApp.Services
{
    public class UserApiClient : IUserApiClient
    {
        private readonly IHttpClientFactory _httpClientFactory;
        public UserApiClient(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        public async Task<string> Authenticate(LoginRequest request)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri("https://localhost:44390/");
            var response = await client.PostAsync("/api/User/authenticate", httpContent);
            var token = await response.Content.ReadAsStringAsync();
            return token;
        }
        /*public async Task<PagedResult<UserViewModel>> GetUserPaging(GetUserPagingRequest request)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri("https://localhost:44390/");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(request.Token);
            var response = await client.GetAsync($"/api/User/paging?pageIndex=" +
                $"{request.PageIndex}&pageSize={request.PageSize}&keyword={request.keyword}");
            var body = await response.Content.ReadAsStringAsync();
            var users = JsonConvert.DeserializeObject<PagedResult<UserViewModel>>(body);
            return users;
        }*/
    }
}
