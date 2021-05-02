using storeroom.Application.Catalog.Input.Dtos;
using storeroom.Data.EF;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Input
{
    public class InputService : IInputService
    {
        private storeroomDbContext _context;
        public InputService(storeroomDbContext context)
        {
            _context = context;
        }
        public Task<int> Create(InputCreateRequest request)
        {
            return null;
        }
    }
}
