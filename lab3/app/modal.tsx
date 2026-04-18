import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/AppText"; 
import { AppView } from "@/components/AppView";
import { Palette } from "@/constants/Colors";
import { useAppState } from "@/context/AppStatusContext";

export default function InfoModalScreen() {
  const { isDark } = useAppState();
  const theme = isDark ? Palette.dark : Palette.light;

  return (

    <AppView style={[styles.root, { backgroundColor: theme.background }]}>
      <View
        style={[styles.iconContainer, { backgroundColor: theme.accent + "15" }]}
      >
        <MaterialCommunityIcons
          name="information-variant"
          size={40}
          color={theme.accent}
        />
      </View>

      <AppText variant="header" style={[styles.headline, { color: theme.text }]}>
        Про проєкт
      </AppText>

      <AppText style={[styles.description, { color: theme.subText }]}>
        Це навчальний застосунок "Gesture Clicker", розроблений для демонстрації
        роботи з жестами у React Native. Використовуйте тапи, довгі натискання
        та свайпи для взаємодії з об'єктом.
      </AppText>

      <Link
        href="/"
        dismissTo
        asChild 
      >
        <View style={[styles.actionButton, { backgroundColor: theme.accent }]}>
          <AppText style={styles.buttonText}>Зрозуміло</AppText>
        </View>
      </Link>
    </AppView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headline: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 15,
  },
  description: {
    textAlign: "center",
    lineHeight: 22,
    fontSize: 15,
    marginBottom: 30,
  },
  actionButton: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 15,
    elevation: 4,
    minWidth: 150, 
    alignItems: 'center'
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});