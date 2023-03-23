# PowerServer REST API Authentication Example

This application demonstrates various user/identity authentication strategies for securing access to the REST APIs generated by a PowerServer project. The authentication extension for the API Server is developed with .NET Core authentication framework; the PowerBuilder app is developed with [PowerBuilder](https://www.appeon.com/products/powerbuilder) and deployed with Appeon [PowerServer 2022](https://www.appeon.com/products/powerserver).

### Sample Project Structure

The project is structured as follows.

```
|—— PowerServer-Authentication-Example Repository 
	|—— Client 		PowerBuilder client application that has incorporated the authentication strategies
	|—— Server		PowerServer Web APIs solution that has incorporated the authentication stategies 
		|—— AppModels		Stores the models and ESqls converted and exported from the PowerBuilder application(s)
		|—— ServerAPIs		PowerServer Web API project
		|—— ServerAPIs.Authentication.AWS		Amazon Cognito authentication integration
		|—— ServerAPIs.Authentication.Azure		Azure AD/B2C authentication integration
		|—— ServerAPIs.Authentication.Common		Common class library
		|—— ServerAPIs.Authentication.IdentityServer4		IdentityServer4 authentication integration
		|—— ServerAPIs.Authentication.Jwt		JWT authentication integration
```

### Setting Up the Project

#### Preparations

Prerequisite: Register a test project in Amazon Cognito, Azure AD, or Azure B2C based on your preference. Note that the routing of the callback address based on the authorization_code mode must be consistent with that configured on the third-party authorization platform, for example, the callback address of AWS is `https://localhost:4000/aws/callback`.

Download this demo application, and then:

1. Download the database file <b>pbdemo2021_for_sqlanywhere.zip</b> from [PowerBuilder-Project-Example-Database](https://github.com/Appeon/PowerBuilder-Project-Example-Database) and restore it. 
2. Configure the ODBC data source.

#### Build & deploy the PowerServer project

1. Open the PowerBuilder project in PowerBuilder 2022.
2. Open the PowerServer project: ps_authentication, switch to the Web APIs tab and set the Web API URL as you need. Please note that the Web API URL must be HTTPS.
3. Click the Auto Import button in the License settings to import your license.
4. Open Database Configuration. Set the database to the ODBC source configured in step #2 of the Preparations section.
5. Open the CloudSetting.ini file in the Client folder, change the host of TokenEndpoint and UserEndpoint to the Web API URL configured in step #2, change the AuthorizeUrl of AWS and Azure according to your personal account configuration, and change Username and Password according to your account information.
6. Build & deploy the PowerServer project. (In this example, the C# solution generated is **PowerServer_authentication.sln**.)

#### Modifying the configuration files in **PowerServer-Authentication-Example.sln**

1. Copy the ServerAPIs/AppConfig/Applications.json from **PowerServer_authentication.sln** generated in the section above and replace the files of same names in **PowerServer-Authentication-Example.sln.** 

2. Copy the  ServerAPIs/Server.json from **PowerServer_authentication.sln** generated in the section above and replace the files of same names in **PowerServer-Authentication-Example.sln**. 

3. Fill in all the sensitive data between the angle brackets `<>` in the ServerAPIs/Authentication/Authentication.json file in **PowerServer-Authentication-Example.sln**, for example:

   e.g.:

```
"AWS": {
	       	"Region": "<your region>", (Fill in the Region you used when registering in AWS between the angle brackets.)
			...
	}
```

#### Running the Example

1. Run the ServerAPIs project. 
2. Switch to PowerBuilder 2022, right click on **ps_authentication**, and then click Run PowerServer project.

#### How to integrate to your ServerAPIs project

1. Open your PowerServer ServerAPIs project.

2. Add reference to  **ServerAPIs.Authentication.Common** class library. The relative path is //Server/ServerAPIs.Authentication.Common/ServerAPIs.Authentication.Common.csproj.

3. Add references to the library of the authentication that you need to use (they are integrated in **PowerServer-Authentication-Example.sln**) in your ServerAPIs project. For example, suppose you need to use Aamaon Cognito authentication, you will need to add reference to **ServerAPIs.Authentication.AWS** project.

4. Edit the **AuthenticationExtensions.cs** file in **Authentication** folder in the ServerAPIs project, and add the following code inside **AddPowerServerAuthentication** method. Note that uncomment the code that is required for your authentication.

   ```c#
   // Authentication platform service to supporting multiple identity authentication
   services.AddAuthenticationPlatform();
   
   // Implements authentication based on Amazon Cognito
   services.AddAWSCognito(configuration);
   // Implements authentication based on IdentityServer4
   //services.AddIdSvr4(configuration);
   // Implements authentication based on IdentityModel JWT
   //services.AddJwt(configuration);
   // Implements authentication based on Azure AD
   //services.AddAzureAD(configuration);
   // Implements authentication based on Azure B2C
   //services.AddAzureB2C(configuration);
   
   services.AddAuthorization(options =>
   {
   	options.AddPolicy(PowerServerConstants.DefaultAuthorizePolicy, policy =>
   	{
   		policy.RequireAuthenticatedUser();
   	});
   });
   ```

5. Go to your PowerBuilder application, add authentication.pbl in your PowerBuilder application and add the following code in your application open event. Note that you need to ensure that need to call **geon_auth.of_login()** before accessing the protected APIs (like invoking the retrieve method of a DataWindow). 

   ```
   geon_auth = Create eon_authentication
   geon_auth.of_login()
   ```