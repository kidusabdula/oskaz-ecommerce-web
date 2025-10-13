import { handleApiRequest, withEndpointLogging } from '@/lib/api-template';
import { frappeClient } from '@/lib/frappe-client';

interface TestResponse {
  user: string;
  timestamp: string;
}

export async function GET() {
  return handleApiRequest<TestResponse>(
    withEndpointLogging('/api/test-api')(async () => {
      const user = await frappeClient.auth.getLoggedInUser();

      if (!user) {
        throw new Error('No user data received from API');
      }

      return {
        user,
        timestamp: new Date().toISOString(),
      };
    })
  );
}