import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import ProfileAnswer from "./ProfileAnswer";

type Profile = {
  name: string;
  age: number;
  special: string;
  image: string;
  about: string;
  proud: string;
  relationship: string;
  laugh: string;
  dream: string;
};

export default function ProfileCard({
  profile,
  onInfoPress,
  onNext,
  onMeet,
}: {
  profile: Profile;
  onInfoPress: () => void;
  onNext: () => void;
  onMeet: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {profile.name}, {profile.age}
      </Text>

      <View style={styles.specialRow}>
        <Text style={styles.special}>
          Besonderheit: {profile.special}
        </Text>

        <TouchableOpacity onPress={onInfoPress}>
          <Text style={styles.infoIcon}>ⓘ</Text>
        </TouchableOpacity>
      </View>

      <ProfileAnswer
        question="Was sollte man über mich wissen?"
        answer={profile.about}
      />

      <ProfileAnswer
        question="Auf was bin ich am meisten stolz?"
        answer={profile.proud}
      />

      <ProfileAnswer
        question="Was wünsche ich mir in einer Beziehung?"
        answer={profile.relationship}
      />

      <ProfileAnswer
        question="Was bringt dich zum Lachen?"
        answer={profile.laugh}
      />

      <ProfileAnswer
        question="Wenn du alles machen könntest was du willst, was wäre es?"
        answer={profile.dream}
      />

      {profile.image ? (
        <View>
          <Text style={styles.imageLabel}>
            Ein ehrlicher Blick.
          </Text>

          <Image
            source={{ uri: profile.image }}
            style={styles.image}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={onNext}
      >
        <Text style={styles.nextButtonText}>
          Nächstes Profil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onMeet}
      >
        <Text style={styles.buttonText}>
          Kennenlernen
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 24,
    paddingTop: 32,
    paddingBottom: 34,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#EFE7FF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginBottom: 40,
  },

  name: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 10,
    textAlign: "center",
  },

  specialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  special: {
    fontSize: 14,
    color: "#8C84A1",
    fontWeight: "600",
    textAlign: "center",
  },

  infoIcon: {
    fontSize: 18,
    color: "#8B5CF6",
    marginLeft: 8,
    fontWeight: "700",
  },

  imageLabel: {
    fontSize: 14,
    color: "#8C84A1",
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: 320,
    borderRadius: 24,
    marginTop: 14,
    marginBottom: 30,
  },

  nextButton: {
    borderWidth: 2,
    borderColor: "#C4B5FD",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 14,
  },

  nextButtonText: {
    color: "#7C3AED",
    fontSize: 16,
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});