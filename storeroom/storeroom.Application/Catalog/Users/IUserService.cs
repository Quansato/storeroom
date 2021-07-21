using storeroom.Application.Catalog.Users.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Users
{
    public interface IUserService
    {
        Task<string> Authencate(LoginRequest request);
        Task<bool> Register(RegisterRequest request);
        Task<PagedResult<UserViewModel>> GetUserPaging(GetUserPagingRequest request);
        Task<List<UserViewModel>> GetAll();
        Task<UserViewModel> GetUserByName(string userName);
        Task<ApiResult<bool>> RoleAssign(Guid Id, RoleAssignRequest request);

        Task<List<RoleViewModel>> GetAllRole();
    }
}
