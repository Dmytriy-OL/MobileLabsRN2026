import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ErrorBoundaryScreen() {
  return (
    <View style={styles.mainWrapper}>
      {/* Міняємо заголовок у верхній панелі */}
      <Stack.Screen options={{ title: 'Помилка доступу', headerShown: true }} />
      
      <View style={styles.content}>
        <Ionicons name="alert-circle-outline" size={80} color="#FF3B30" />
        
        <Text style={styles.errorTitle}>Упс! Сторінку не знайдено</Text>
        <Text style={styles.infoText}>
          Здається, ви перейшли за неправильним посиланням або сторінку було видалено.
        </Text>

        <Link href="/(main)" asChild>
          <Pressable style={styles.backButton}>
            <Text style={styles.buttonLabel}>На головну сторінку</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1C1E',
    marginTop: 20,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});