using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Stripe;
using System.Text.Json.Serialization;
using WMS.Api.Middleware;
using WMS.DataContext;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Repository;
using WMS.Service;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Add Stripe configuration
builder.Services.Configure<StripeOptions>(builder.Configuration.GetSection("Stripe"));

// Retrieve Stripe options
var stripeOptions = builder.Configuration.GetSection("Stripe").Get<StripeOptions>();

// Set Stripe API key
StripeConfiguration.ApiKey = stripeOptions.SecretKey;

builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "WMSAppJWT", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers().AddJsonOptions(x =>
             x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Repositories .AddTransient
builder.Services.AddTransient<ISupplierRepository, SupplierRepository>();
builder.Services.AddTransient<ICustomerRepository, CustomerRepository>();
builder.Services.AddTransient<IProductRepository, ProductRepository>();
builder.Services.AddTransient<IReceiptRepository, ReceiptRepository>();
builder.Services.AddTransient<IInvoiceRepository, InvoiceRepository>();
builder.Services.AddTransient<IOrderRepository, OrderRepository>();
builder.Services.AddTransient<IOrderProductRepository, OrderProductRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IDashboardRepository, DashboardRepository>();
// Services .AddScoped
builder.Services.AddScoped<ISupplierService, WMS.Service.SupplierService>();
builder.Services.AddScoped<ICustomerService, WMS.Service.CustomerService>();
builder.Services.AddScoped<IProductService, WMS.Service.ProductService>();
builder.Services.AddScoped<IReceiptService, WMS.Service.ReceiptService>();
builder.Services.AddScoped<IInvoiceService, WMS.Service.InvoiceService>();
builder.Services.AddScoped<IOrderService, WMS.Service.OrderService>();
builder.Services.AddScoped<IUserService, WMS.Service.UserService>();
builder.Services.AddScoped<IPasswordService, WMS.Service.PasswordService>();
builder.Services.AddScoped<IJwtService, WMS.Service.JwtService>();
builder.Services.AddScoped<IDashboardService, WMS.Service.DashboardService>();


var app = builder.Build();

app.UseCors(policy => policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(origin => true)
                            .AllowCredentials());

app.UseMiddleware<AuthenticationMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
