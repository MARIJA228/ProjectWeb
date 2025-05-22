using Microsoft.EntityFrameworkCore;
using SLMP.API.Data;


var builder = WebApplication.CreateBuilder(args);

// Adding services .

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAngularApp", builder =>
    {
        builder.WithOrigins("http://localhost:4200", "https://localhost:4200") // Angular dev server
              .AllowCredentials()
               .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddDbContext<UserDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("userCon"))); //Usercon is connection to my database


var allowedOrigins = builder.Configuration.GetValue<string>("allowOrigins")!.Split(",");





var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseExceptionHandler("/error");


app.UseCors("AllowAngularApp");

app.UseAuthorization();
app.MapControllers();

app.Run();
