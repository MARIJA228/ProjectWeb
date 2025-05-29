Getting Started

1. **Clone the Repository** 
   git clone https://github.com/MARIJA228/ProjectWeb 
   cd ProjectWeb


2. **Requirements**
 ->  .NET 6 SDK or later  
 ->  SQL Server   
 ->  Node.js & npm   
 ->  Angular CLI (if not) :  
     npm install -g @angular/cli   


3. **Backend Setup (SLMP.API)**   
    a) Navigate to the backend project folder:   
     cd SLMP.API   
    b) Restore dependencies:   
      dotnet restore   
    c) Update your connection string (if needed) in appsettings.json:   
    "ConnectionStrings": {   
      "DefaultConnection": "Server=localhost;Database=PantryDb;Trusted_Connection=True;"   
   }   
    d) Apply any database migrations:   
      dotnet ef database update   
    e) Run the backend:    
      dotnet run   
   f) Ensure that SQL Server is running on your machine.    
       The default connection string uses:    
       Server: localhost   
       Database: PantryDb   


4. **Frontend (Angular)**    
    a) Navigate to the Angular project folder:   
        cd ../web   
    b) Installing    
       npm install    
    c) Start the development server:    
        ng serve --open   
        This should run at http://localhost:4200/   
   

**Make sure both backend and frontend are running!** :)





