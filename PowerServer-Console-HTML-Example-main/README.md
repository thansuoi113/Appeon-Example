# PowerServer-Console-HTML-Example

This PowerServer Console project is based on VUE. It uses the UI Toolkit element-ui, and the server side is a ServerAPI project. 

It mainly demonstrates below functionalities provided by PowerServer API:
1. Displaying the current PowerServer license and instance information.
2. Configuration management including the management of applications and connections.
3. Monitoring the running status of the current PowerServer including the information of sessions and transactions.


##### Project Structure

The project contains a VUE project. It is implemented using vue.js.

The project is structured as follows.

```
|—— PowerServer-Console-HTML-Example Repository 
	|—— PowerServer Console    			Project implemented with Vue
	    	|—— build				Includes the build files
	    	|—— config				Defines the runtime environment config files
	    	|—— src					Includes the vue pages
			|-- api				Defines the JavaScript file of request server api 
			|-- assets			Includes the images and css files
			|-- components			Includes the common components
			|-- pages			Includes the Vue pages
			|-- router			Defines the page url
			|-- utils			Includes the common JavaScript file
	    	|—— static				Includes the static resource
```

##### Setting Up the Project

Before running this VUE project, make sure a PowerServer API project is running and it can be accessed. 

1. Download the VUE project and save it to your local directory.
2. Download node.js 14.16.0 and install it.
3. Open the command prompt window, change the current directory to the one where the project is unzipped, for example, under the PowerServer Console directory. 
4. Execute the below commands to install the dependent package. 

  ```bash
  # install dependencies
  npm install
  ```

5. Configure the server address in src/utils/config.js

6. Execute the command below. 

  ```bash
  # serve with hot reload at localhost:8080
  npm run dev
  ```
7. Browse the http://localhost:8080 by default. You may modify the access host and port in config/index.js.
8. The default API Server URL is https://psdemo.appeon.com:9001/api.sales. If you want to monitor your own API Server, you can update the URL in settings > API Server URL.

##### How to allow Server Management Console to access your own PowerServer API Server

Normally, this Server Management Console is not under the same domain with your PowerServer API Server. By default, the browser will not allow cross-origin resource sharing (CORS).

If you want to monitor one of your own PowerServer API Servers, please refer to the following steps to modify your code. 

1. Open the StartUp.cs file in your PowerServer API Server project.

2. Add the following code in the      ConfigureServices method.

   ```c#
   // Adds cross-origin resource sharing services
   services.AddCors(x=>
            {
                x.AddPolicy("limitRequest", policy =>
                 {
			  // Specify the Server Management Console's domain to access your PowerServer API server. 
			  // Here we use the domain of the Server Management Console (https://dsdemo.appeon.com/psconsolehtml) of our online demo site as an example.
                     policy.WithOrigins(new string[] { "https://dsdemo.appeon.com" })	
                     .AllowAnyHeader()
                     .AllowAnyMethod();
                 });
            });
   ```

3. Add the following code in the Configure method.

   ```c#
   // Note: put the following code after app.UseRouting() and before app.UseAuthentication().
   // Adds a CORS middleware to your web application pipeline to allow cross domain requests.
   app.UseCors("limitRequest"); 
   ```

4. Build and deploy your PowerServer API Server.

5. Enter your own PowerServer API Server URL in Server Management Console > Settings > API Server URL > API Host and click Update.

6. You can then monitor and manage      your PowerServer API Server using this console.

