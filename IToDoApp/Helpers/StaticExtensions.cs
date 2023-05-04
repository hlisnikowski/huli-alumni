using System.Security.Claims;

namespace IToDoApp.Helpers
{
    public static class StaticExtensions
    {
        public static string GetUserId(this ClaimsPrincipal user) => user.FindFirst(ClaimTypes.NameIdentifier).Value;
    }
}
