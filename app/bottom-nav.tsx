import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

export default function BottomNav({
  active,
}: {
  active: string;
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.nav}>
<TouchableOpacity
  style={[
    styles.item,
    active === "discover" && styles.activeItem,
  ]}
  onPress={() => router.push("/discover")}
>
 <Text
  style={[
    styles.label,
    active === "discover" && styles.activeLabel,
  ]}
>
  Entdecken
</Text>
        </TouchableOpacity>

<TouchableOpacity
  style={[
    styles.item,
    active === "chats" && styles.activeItem,
  ]}
  onPress={() => router.push("/chats")}
>
<Text
  style={[
    styles.label,
    active === "chats" && styles.activeLabel,
  ]}
>
  Chats
</Text>
        </TouchableOpacity>

<TouchableOpacity
  style={[
    styles.item,
    active === "profile" && styles.activeItem,
  ]}
  onPress={() => router.push("/profile")}
>
<Text
  style={[
    styles.label,
    active === "profile" && styles.activeLabel,
  ]}
>
  Profil
</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F7F3FF",
    paddingHorizontal: 18,
    paddingBottom: 24,
    paddingTop: 10,
  },

  nav: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
  },

  icon: {
    fontSize: 22,
    marginBottom: 4,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7C3AED",
  },

  activeItem: {
  backgroundColor: "#8B5CF6",
  borderRadius: 18,
  paddingVertical: 10,
},

activeLabel: {
  color: "#FFFFFF",
},
});