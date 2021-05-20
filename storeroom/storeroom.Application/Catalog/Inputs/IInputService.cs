using storeroom.Application.Catalog.Inputs.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Inputs
{
    public interface IInputService
    {
        /// <summary>
        /// Thêm mới
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<int> Create(InputCreateRequest request);

        /// <summary>
        /// Cập nhật
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<int> Update(InputUpdateRequest request);

        /// <summary>
        /// Cập nhật chi tiết
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<int> UpdateDetail(MaterialInputCreateRequest request);

        /// <summary>
        /// Xoá
        /// </summary>
        /// <param name="InputId"></param>
        /// <returns></returns>
        Task<int> Delete(int InputId);

        /// <summary>
        /// Lấy chi tiết
        /// </summary>
        /// <param name="InputId"></param>
        /// <returns></returns>
        Task<PagedResult<InputViewModel>> GetDetail(int InputId);

        /// <summary>
        /// Phân trang 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<PagedResult<InputViewModel>> GetAllPaging(InputSearchRequest request);

        /// <summary>
        /// Lấy tất cả 
        /// </summary>
        /// <returns></returns>
        Task<PagedResult<InputViewModel>> GetAll();

        /// <summary>
        /// Lấy vật tư trong phiếu
        /// </summary>
        /// <param name="InputId"></param>
        /// <returns></returns>
        Task<PagedResult<MaterialInputViewModel>> GetMaterialByInputId(int InputId);

        /// <summary>
        /// Kiểm tra xem vật tư đã tồn tại trong kho hay chưa
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Task<bool> CheckMaterialIsExist(int storeroomId,int Id);
    }
}
