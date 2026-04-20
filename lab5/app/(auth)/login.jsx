import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../../store/SessionManager"; // Переконайся, що шлях вірний

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ОСЬ ТУТ: беремо signIn замість login
  const { signIn, isSyncing } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      // ВИКЛИКАЄМО signIn
      signIn(email, password);
    } else {
      alert("Заповніть пошту та пароль");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flexContainer}
    >
      <View style={styles.innerWrapper}>
        <View style={styles.headerBlock}>
          <Text style={styles.mainHeading}>Вітаємо знову!</Text>
          <Text style={styles.subHeading}>Увійдіть у свій профіль</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Електронна пошта</Text>
          <TextInput
            placeholder="example@mail.com"
            value={email}
            onChangeText={setEmail}
            style={styles.customInput}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isSyncing}
          />

          <Text style={styles.label}>Пароль</Text>
          <TextInput
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.customInput}
            editable={!isSyncing}
          />

          <Pressable
            style={[styles.primaryButton, isSyncing && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Авторизуватися</Text>
            )}
          </Pressable>
        </View>

        <Link href="/(auth)/register" asChild>
          <Pressable disabled={isSyncing}>
            <Text style={styles.footerLink}>
              Ще не з нами? <Text style={styles.linkBold}>Створити акаунт</Text>
            </Text>
          </Pressable>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexContainer: { flex: 1, backgroundColor: "#fff" },
  innerWrapper: { flex: 1, justifyContent: "center", padding: 30 },
  headerBlock: { marginBottom: 40 },
  mainHeading: { fontSize: 32, fontWeight: "900", color: "#1A1A1A" },
  subHeading: { fontSize: 16, color: "#666", marginTop: 5 },
  formGroup: { width: "100%" },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginLeft: 4,
  },
  customInput: {
    backgroundColor: "#F5F5F7",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#000",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    minHeight: 60,
    justifyContent: "center",
  },
  buttonDisabled: { backgroundColor: "#555" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  footerLink: { marginTop: 25, textAlign: "center", color: "#444" },
  linkBold: { color: "#007AFF", fontWeight: "bold" },
});
