import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import {
  useRef,
  useState,
} from "react";
import chatMessages from "./data/chatMessages";
import profiles from "./data/profiles";

export default function ChatScreen() {
  const { name } = useLocalSearchParams();

  const profile = profiles.find(
  (p) => p.name === name
);
  
  const initialMessages =
    chatMessages[String(name)] || [];

  const [message, setMessage] = useState("");

  const [isTyping, setIsTyping] =
  useState(false);
  
  const scrollRef =
  useRef<ScrollView>(null);

  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
      type: "sent" | "received";
    }[]
  >(initialMessages);

const sendMessage = () => {
  
  if (message.trim().length === 0) return;

  const newMessage = {
    id: Date.now(),
    text: message,
    type: "sent" as const,
  };

  setMessages([
    ...messages,
    newMessage,
  ]);

  setTimeout(() => {
  scrollRef.current?.scrollToEnd({
    animated: true,
  });
}, 100);

  setMessage("");

  setIsTyping(true);

setTimeout(() => {
    setIsTyping(false);
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now() + 1,
        text: "Das klingt schön. Erzähl mir mehr davon 😊",
        type: "received" as const,
      },
    ]);

    setTimeout(() => {
  scrollRef.current?.scrollToEnd({
    animated: true,
  });
}, 100);
  }, 1200);
};
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Zurück</Text>
        </TouchableOpacity>

        <Text style={styles.name}>{name}</Text>

        {profile?.image ? (
  <Image
    source={{ uri: profile.image }}
    style={styles.headerImage}
  />
) : (
  <View style={{ width: 46 }} />
)}
      </View>

<ScrollView
  ref={scrollRef}
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

{isTyping && (
  <View style={styles.typingBubble}>
    <Text style={styles.typingText}>
      tippt gerade...
    </Text>
  </View>
)}

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
  style={[
  styles.sendButton,
  message.trim().length === 0 &&
    styles.sendButtonDisabled,
]}
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

  typingBubble: {
  backgroundColor: "#FFFFFF",
  padding: 14,
  borderRadius: 18,
  borderBottomLeftRadius: 6,
  alignSelf: "flex-start",
  marginTop: 4,
  maxWidth: "60%",
},

typingText: {
  color: "#8C84A1",
  fontSize: 14,
  fontStyle: "italic",
},

sendButtonDisabled: {
  opacity: 0.5,
},

headerImage: {
  width: 46,
  height: 46,
  borderRadius: 23,
  marginBottom: 6,
},
});