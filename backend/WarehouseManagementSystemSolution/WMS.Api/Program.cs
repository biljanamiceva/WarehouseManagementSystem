using Microsoft.EntityFrameworkCore;
using WMS.DataContext;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Repository;
using WMS.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories .AddTransient
builder.Services.AddTransient<ISupplierRepository, SupplierRepository>();
// Services .AddScoped
builder.Services.AddScoped<ISupplierService, SupplierService>();


var app = builder.Build();

app.UseCors(policy => policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(origin => true)
                            .AllowCredentials());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization(); 

app.MapControllers();

app.Run();
