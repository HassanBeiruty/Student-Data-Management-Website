// Bank.cs
using WebApplication.Business;

public class Bank : PaymentMethod
{
    public string BankName { get; set; }

    public override string GetDescription()
    {
        return $"{Amount} From {BankName}";
    }
    public Bank(decimal amount, string bankName)
    {
        Amount = amount;
        BankName = bankName;    
       
    }
}
