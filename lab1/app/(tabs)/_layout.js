import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#28a745', 
      tabBarInactiveTintColor: '#888',
      headerTitleStyle: { fontWeight: 'bold' },
      headerTitleAlign: 'center',
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Новини',
          tabBarLabel: 'Головна',
          tabBarIcon: ({color, size}) => <Ionicons name="newspaper" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="gallery" 
        options={{ 
          title: 'Медіагалерея',
          tabBarLabel: 'Галерея',
          tabBarIcon: ({color, size}) => <Ionicons name="images" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Кабінет',
          tabBarLabel: 'Профіль',
          tabBarIcon: ({color, size}) => <Ionicons name="person-circle" size={size} color={color} />
        }} 
      />
    </Tabs>
  );
}