using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Dtos
{
    public class StoreroomException : Exception
    {
        public StoreroomException()
        {
        }

        public StoreroomException(string message)
            : base(message)
        {
        }

        public StoreroomException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
