import { Redirect } from 'expo-router';

export default function HomeScreen() {
  // Redirect to dashboard
  return <Redirect href="/dashboard" />;
}
