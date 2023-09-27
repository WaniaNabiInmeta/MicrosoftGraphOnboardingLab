using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("Authorization", "Bearer <access_token>");

            try
            {
                var response = await client.GetAsync("https://graph.microsoft.com/");
                response.EnsureSuccessStatusCode(); // Throws an exception for non-2xx responses
                var content = await response.Content.ReadAsStringAsync();
                // Process the data from the API response
                Console.WriteLine(content);
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"HTTP request error: {e.Message}");
            }
        }
    }
}
