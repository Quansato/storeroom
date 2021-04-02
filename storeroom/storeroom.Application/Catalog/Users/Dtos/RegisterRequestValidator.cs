using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace storeroom.Application.Catalog.Users.Dtos
{
    public class RegisterRequestValidator:AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {

        }
    }
}
