using System;

using WebApplication.Business;

    public class Cash : PaymentMethod
    {
        public Currency CurrencyId { get; set; }
        public string CurrencyString { get; set; }
       public override string GetDescription()
        {
            return $"{Amount} {CurrencyId}";
        }
    public Cash(decimal amount, Currency currencyId)
    {
        Amount = amount;
        CurrencyId = currencyId;
        CurrencyString = currencyId.ToString();
     }

   }

public enum Currency
    {
        LBP,
        USD
    }
