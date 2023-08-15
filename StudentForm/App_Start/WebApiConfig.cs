using System.Web.Http;
using Newtonsoft.Json;

public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        // Web API configuration and services

        // Web API routes
        config.MapHttpAttributeRoutes();

        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );

        // Configure JSON serialization settings
        var json = config.Formatters.JsonFormatter;
        json.SerializerSettings.TypeNameHandling = TypeNameHandling.Objects;
        json.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Unspecified;
    }
}
