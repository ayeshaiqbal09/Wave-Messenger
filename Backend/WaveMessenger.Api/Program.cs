using WaveMessenger.Application.Interfaces;
using WaveMessenger.Application.Services;
using Microsoft.EntityFrameworkCore;
using WaveMessenger.Persistence.Context;
using WaveMessenger.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using WaveMessenger.Domain.Entities;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Add controllers
builder.Services.AddControllers();


//database connection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));
 

  //Dependency injection
  builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();   
 builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();  

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



app.MapControllers();

app.Run();


