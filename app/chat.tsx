import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import chatMessages from "./data/chatMessages";

export default function ChatScreen() {
  const { name } = useLocalSearchParams();

  const initialMessages =
    chatMessages[String(name)] || [];

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
      type: "sent" | "received";
    }[]
  >(initialMessages);

  const sendMessage = () => {
  if (message.trim().length === 0) return;

  setMessages([
    ...messages,
    {
      id: Date.now(),
      text: message,
      type: "sent",
    },
  ]);

  setMessage("");
};
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Zurück</Text>
        </TouchableOpacity>

        <Text style={styles.name}>{name}</Text>

        <View style={{ width: 60 }} />
      </View>

      <ScrollView
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
      >

{messages.map((msg) => (
  <View
    key={msg.id}
    style={
      msg.type === "sent"
        ? styles.sentMessage
        : styles.receivedMessage
    }
  >
    <Text
      style={
        msg.type === "sent"
          ? styles.sentMessageText
          : styles.messageText
      }
    >
      {msg.text}
    </Text>
  </View>
))}

      </ScrollView>

      <View style={styles.inputContainer}>
<TextInput
  placeholder="Schreibe eine Nachricht..."
  placeholderTextColor="#9CA3AF"
  style={styles.input}
  value={message}
  onChangeText={setMessage}
/>

<TouchableOpacity
  style={styles.sendButton}
  onPress={sendMessage}
>
  <Text style={styles.sendText}>Senden</Text>
</TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3FF",
  },

  header: {
    paddingTop: 70,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EFE7FF",
  },

  back: {
    color: "#7C3AED",
    fontSize: 16,
    fontWeight: "600",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B2238",
  },

  messages: {
    flex: 1,
  },

  messagesContent: {
    padding: 24,
  },

  receivedMessage: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 14,
    maxWidth: "80%",
  },

  sentMessage: {
    backgroundColor: "#8B5CF6",
    padding: 16,
    borderRadius: 20,
    borderBottomRightRadius: 6,
    alignSelf: "flex-end",
    marginBottom: 14,
    maxWidth: "80%",
  },

  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#2B2238",
  },

  sentMessageText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFE7FF",
  },

  input: {
    flex: 1,
    backgroundColor: "#F3F0FF",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    marginRight: 12,
  },

  sendButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 18,
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  sendText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});