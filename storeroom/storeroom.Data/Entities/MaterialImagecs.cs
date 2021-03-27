using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Data.Entities
{
    public class MaterialImage
    {
        public int Id { get; set; }
        public int MaterialId { get; set; }
        public string ImgPath { get; set; }

        public Material  Material { get; set; }

    }
}
