import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function RegisterScreen() {
  const fields = [
    { label: 'Електронна адреса', placeholder: 'example@mail.com', secure: false },
    { label: 'Пароль', placeholder: '********', secure: true },
    { label: 'Підтвердження', placeholder: '********', secure: true },
    { label: 'Прізвище', placeholder: 'Введіть прізвище', secure: false },
    { label: "Ім'я", placeholder: "Введіть ім'я", secure: false },
  ];
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Створення аккаунту</Text>
          {fields.map((field, index) => (
            <View key={index} style={styles.group}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput 
                style={styles.input} 
                secureTextEntry={field.secure} 
                placeholder={field.placeholder}
                placeholderTextColor="#ced4da"
              />
            </View>
          ))}
          <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
            <Text style={styles.btnText}>Зареєструватися</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>Олійник Дмитро Сергійович, BT-22-1</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa', flexGrow: 1 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 20, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
  group: { marginBottom: 15 },
  label: { fontSize: 13, color: '#6c757d', marginBottom: 6, marginLeft: 4 },
  input: { backgroundColor: '#f1f3f5', borderRadius: 10, padding: 12, fontSize: 16, color: '#212529' },
  btn: { backgroundColor: '#28a745', padding: 16, borderRadius: 12, marginTop: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footer: { textAlign: 'center', marginTop: 40, fontSize: 12, color: '#adb5bd' }
});