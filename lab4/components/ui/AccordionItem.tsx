import { PropsWithChildren, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

// Міняємо на ../ бо файли лежать у папці components, а не в ui
import { AppTypography } from "../AppTypography";
import { SurfaceView } from "../SurfaceView";
import { NativeIcon } from "./NativeIcon"; // Це залишається в ui

import { Colors } from "~/constants/theme";
import { useAppTheme } from "~/hooks/useAppTheme";

export function AccordionItem({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useAppTheme();

  const iconColor = theme === "light" ? Colors.light.tint : Colors.dark.tint;

  const toggleHandle = () => setIsExpanded((prev) => !prev);

  return (
    <SurfaceView style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [styles.trigger, pressed && { opacity: 0.7 }]}
        onPress={toggleHandle}
      >
        <NativeIcon
          name="chevron.right"
          size={16}
          color={iconColor}
          style={[
            styles.arrow,
            { transform: [{ rotate: isExpanded ? "90deg" : "0deg" }] },
          ]}
        />

        <AppTypography variant="semiBold" style={styles.label}>
          {title}
        </AppTypography>
      </Pressable>

      {isExpanded && <View style={styles.innerContent}>{children}</View>}
    </SurfaceView>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    marginVertical: 4,
    overflow: "hidden",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  arrow: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    letterSpacing: -0.3,
  },
  innerContent: {
    paddingTop: 4,
    paddingLeft: 30,
    paddingBottom: 10,
  },
});