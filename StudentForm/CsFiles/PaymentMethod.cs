using System;

namespace WebApplication.Business
{
    public abstract class PaymentMethod
    {
        public decimal Amount { get; set; }

        public abstract string GetDescription();
    }
}