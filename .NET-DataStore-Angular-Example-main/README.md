# .NET-DataStore-Angular-Example

The Angular Pages app demonstrates how to integrate standard RESTful Web APIs developed using .NET DataStore into an HTML app and is generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0. It uses Angular for the presentation layer and .NET DataStore for the data layer.

### Sample Project Structure

The project is structured as follows.

```
|—— Web-Angular-Example Repository 
	|—— Appeon.DataStoreDemo.Angular.Web				Angular project folder
```

### Setting Up the Project

Download this Angular demo project, and then:

1. Set up and run the Web APIs created in [.NET-DataStore-Rest-Example](https://github.com/Appeon/.NET-DataStore-Rest-Example).

2. Open the Angular project in Visual Studio Code or other development tools, find the environment.ts file, and change the value of apiUrl to the URL that it listens to in step #1.

   ```
   export const environment = {
     production:  false,
      apiUrl: 'Your Rest API URL'
   };
   ```

3. Install Node (Project was made under node 14.16.1 LTS)

4. Install angular-cli  

   ```
   npm install -g @angular/cli
   ```

5. Go into project folder and install all dependencies.

   ```
   npm install
   ```

6. Run angular project. 

   ```
   ng serve
   ```

7. Navigate to `http://localhost:4200/`. 
