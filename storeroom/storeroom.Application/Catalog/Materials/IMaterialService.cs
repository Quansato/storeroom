using storeroom.Application.Catalog.Materials.Dtos;
using storeroom.Application.Catalog.Materials.Dtos.MStoreroom;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Materials
{
    public interface IMaterialService
    {
        /// <summary>
        /// Thêm mới 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<int> Create(MaterialCreateRequest request);

        /// <summary>
        /// cập nhật
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<int> Update(MaterialUpdateRequest request);
        Task<int> Delete(int MaterialId);

        /// <summary>
        /// Lấy theo id
        /// </summary>
        /// <param name="MaterialId"></param>
        /// <returns></returns>
        Task<PagedResult<MaterialViewModel>> GetDetail(int MaterialId);

        /// <summary>
        /// Phân trang
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<PagedResult<MaterialViewModel>> GetAllPaging(SearchRequest request);

        public Task<List<MaterialViewModel>> GetAll();


        /// <summary>
        /// Lấy vật tư trong kho
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<PagedResult<MaterialStoreroomVm>> GetAllMSPaging(MaterialStoreroomGetPaging request);

        /// <summary>
        /// Lấy vật tư chưa có trong kho
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<PagedResult<MaterialViewModel>> GetAllMaterialToAdd(MaterialStoreroomGetPaging request);


        /// <summary>
        /// Lấy định mức tồn max
        /// </summary>
        /// <param name="MaterialId"></param>
        /// <param name="StoreroomId"></param>
        /// <returns></returns>
        Task<int> GetQuantityMax(int MaterialId, int StoreroomId);

        /// <summary>
        /// Lấy định mức tồn min
        /// </summary>
        /// <param name="MaterialId"></param>
        /// <param name="StoreroomId"></param>
        /// <returns></returns>
        Task<int> GetQuantityMin(int MaterialId, int StoreroomId);

        /// <summary>
        /// Cập nhật vật tư trong kho
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>

        Task<int> UpdateMaterialToStoreroom(MaterialStoreroomVm request);

        /// <summary>
        /// Cập nhật số lượng vật tư trong kho
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<int> UpdateStock(MaterialStoreroomVm request);

        /// <summary>
        /// Cập nhật định mức trong kho
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<int> UpdateQuantityMinMax(MaterialStoreroomVm request);

        Task<int> DeleteMS(int storeroomId,int materialId);
    }
}
