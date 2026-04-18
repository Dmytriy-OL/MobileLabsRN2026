import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AppText } from "@/components/AppText";
import { AppView } from "@/components/AppView";
import { Palette } from "@/constants/Colors";
import { useAppState } from "@/context/AppStatusContext";

export function ExpandableBlock({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [active, setActive] = useState(false);
  const { isDark } = useAppState();
  const theme = isDark ? Palette.dark : Palette.light;

  return (
    <AppView style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.trigger, { borderBottomColor: theme.outline }]}
        onPress={() => setActive(!active)}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name={active ? "chevron-down" : "chevron-right"}
          size={22}
          color={theme.accent}
        />

        <AppText style={[styles.titleText, { color: theme.text }]}>
          {title}
        </AppText>
      </TouchableOpacity>

      {active && (
        <View style={[styles.innerContent, { borderLeftColor: theme.accent }]}>
          {children}
        </View>
      )}
    </AppView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  innerContent: {
    marginTop: 8,
    paddingLeft: 16,
    borderLeftWidth: 2,
    paddingVertical: 4,
  },
});