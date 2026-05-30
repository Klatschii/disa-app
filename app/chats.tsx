import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import chats from "./(data)/chats";
import BottomNav from "./bottom-nav";

export default function ChatsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Chats</Text>

        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatCard}
            onPress={() =>
              router.push({
                pathname: "/chat",
                params: {
                  name: chat.name,
                },
              })
            }
          >
            <Text style={styles.chatName}>{chat.name}</Text>
            <Text style={styles.chatPreview}>{chat.preview}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <BottomNav active="chats" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3FF",
    padding: 24,
    paddingTop: 80,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 30,
  },

  chatCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EFE7FF",
  },

  chatName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 8,
  },

  chatPreview: {
    fontSize: 15,
    color: "#6E6480",
    lineHeight: 22,
  },
});