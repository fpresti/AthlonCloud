# Athlon Cloud .NET
Athlon Cloud is a real-time chat application that enables bi-directional messaging between users. The solution consists of:

- **Backend** built on ASP .NET Core (.NET 8) using SignalR for real-time communication.
- **Frontend** built with Angular 19 and Tailwind CSS 4 for a modern, responsive UI.

---

## Technologies Used

| Layer      | Technology                                |
|------------|-------------------------------------------|
| Backend    | • .NET 8 (ASP .NET Core)  
|            | • SignalR                                 |
|            | • Entity Framework Core (optional)        |
| Frontend   | • Angular 19  
|            | • Tailwind CSS 4                          |
| Dev Tools  | • Git  
|            | • Node.js (v18+)  
|            | • Angular CLI                             |

---

## Prerequisites
1. [.NET 8 SDK](https://dotnet.microsoft.com/download)  
2. [Node.js v18+](https://nodejs.org/) and NPM  
3. Angular CLI globally installed:  
   ```bash
   npm install -g @angular/cli

git clone https://github.com/your-org/athlon-cloud-dotnet.git
cd athlon-cloud-dotnet

# Backend
1. cd backend (backend folder)
2.  Install dependencies
    ```bash
    dotnet restore
    dotnet watch run
3. cp appsettings.Development.json.example appsettings.Development.json
4. Remember to edit connection strings, URLs, etc.

# Frontend
5. cd frontend (frontend folder)
6.  Install dependencies
    ```bash
    npm install
    ng serve --open
7. cp src/environments/environment.ts.example src/environments/environment.ts
8. Remember to edit API URL, ports, etc.

# Estructura del Proyecto
```bash
athlon-cloud/
├── backend/               # ASP.NET Core + SignalR  
│   ├── Controllers/       # Controladores  
│   ├── Hubs/              # Hubs de SignalR  
│   ├── Data/              # DbContext de EF Core  
│   └── Program.cs         # Punto de entrada del backend  
└── frontend/              # Angular 19 + Tailwind 4  
    ├── src/  
    │   ├── app/           # Módulos y componentes  
    │   ├── assets/        # Recursos estáticos  
    │   └── environments/  # Configuraciones  
    └── tailwind.config.js # Configuración de Tailwind  

