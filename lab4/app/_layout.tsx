import { Stack } from 'expo-router';


const AppEntryLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Мій Провідник", 
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          headerTitle: 'Інформація',
        }}
      />
    </Stack>
  );
};

export default AppEntryLayout;