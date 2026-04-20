import { Ionicons } from "@expo/vector-icons"; // Додамо іконки для стилю
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../../store/SessionManager";

const INVENTORY = [
  {
    id: "1",
    title: "PS5 Digital Edition",
    price: "22500 ₴",
    img: "https://picsum.photos/seed/1/300",
  },
  {
    id: "2",
    title: "Xbox Series X",
    price: "21000 ₴",
    img: "https://picsum.photos/seed/2/300",
  },
  {
    id: "3",
    title: "Nintendo Switch OLED",
    price: "12000 ₴",
    img: "https://picsum.photos/seed/3/300",
  },
];

export default function ShopHomeScreen() {
  const { logout } = useAuth();
  const router = useRouter();

  // Функція рендеру картки (вертикальна замість горизонтальної)
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.gridCard}
      onPress={() => router.push(`/details/${item.id}`)}
    >
      <Image source={{ uri: item.img }} style={styles.cardPreview} />
      <View style={styles.cardContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <Text style={styles.brandName}>Gaming Store</Text>
        <Pressable onPress={logout} style={styles.exitBtn}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </Pressable>
      </View>

      <FlatList
        data={INVENTORY}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2} // РОБИМО СІТКУ В ДВА СТОВПЧИКИ
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listPadding}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F2F2F7" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  brandName: { fontSize: 24, fontWeight: "900", color: "#1C1C1E" },
  exitBtn: { padding: 5 },
  listPadding: { padding: 10 },
  row: { justifyContent: "space-between" },
  gridCard: {
    backgroundColor: "#fff",
    width: "48%", // Картки займають половину екрану
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3, // Тінь для Android
    shadowColor: "#000", // Тінь для iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPreview: { width: "100%", height: 150 },
  cardContent: { padding: 12 },
  itemTitle: { fontSize: 14, fontWeight: "700", marginBottom: 5 },
  itemPrice: { fontSize: 16, color: "#007AFF", fontWeight: "500" },
});
