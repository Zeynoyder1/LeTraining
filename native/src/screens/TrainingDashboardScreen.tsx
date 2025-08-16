import { useUser } from "@clerk/clerk-expo";
import { AntDesign, Feather } from "@expo/vector-icons";
import { api } from "@packages/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const TrainingDashboardScreen = ({ navigation }) => {
  const user = useUser();
  const imageUrl = user?.user?.imageUrl;
  const firstName = user?.user?.firstName;

  const userProfile = useQuery(api.training.getUserProfile);
  const userStats = useQuery(api.training.getUserStats, { days: 30 });
  const recentSessions = useQuery(api.training.getUserSessions, { limit: 10 });
  const [search, setSearch] = useState("");

  const renderSessionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("SessionDetailScreen", {
          sessionId: item._id,
        })
      }
      activeOpacity={0.5}
      style={styles.sessionItem}
    >
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionTitle}>{item.name}</Text>
        <Text style={styles.sessionDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.sessionDetails}>
        <Text style={styles.sessionDuration}>{item.duration} min</Text>
        {item.rating && (
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}/5</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderStatsCard = (title, value, subtitle) => (
    <View style={styles.statsCard}>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsTitle}>{title}</Text>
      <Text style={styles.statsSubtitle}>{subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icons/logo2small.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.welcomeContainer}>
        <Image style={styles.avatarSmall} />
        <Text style={styles.title}>Training Dashboard</Text>
        {imageUrl ? (
          <Image style={styles.avatarSmall} source={{ uri: imageUrl }} />
        ) : (
          <Text>{firstName ? firstName : ""}</Text>
        )}
      </View>

      {/* Stats Overview */}
      {userStats && (
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>This Month</Text>
          <View style={styles.statsGrid}>
            {renderStatsCard(
              userStats.totalSessions.toString(),
              "Sessions",
              "Completed"
            )}
            {renderStatsCard(
              `${Math.round(userStats.totalDuration / 60)}h`,
              "Total Time",
              "Training"
            )}
            {renderStatsCard(
              userStats.sessionsThisWeek.toString(),
              "This Week",
              "Sessions"
            )}
            {renderStatsCard(
              userStats.avgRating.toFixed(1),
              "Avg Rating",
              "Quality"
            )}
          </View>
        </View>
      )}

      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="grey"
          style={styles.searchIcon}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search sessions..."
          style={styles.searchInput}
        />
      </View>

      {/* Recent Sessions */}
      <View style={styles.sessionsContainer}>
        <Text style={styles.sectionTitle}>Recent Sessions</Text>
        {!recentSessions || recentSessions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Start your first training{"\n"}session to see it here
            </Text>
          </View>
        ) : (
          <FlatList
            data={recentSessions}
            renderItem={renderSessionItem}
            keyExtractor={(item) => item._id}
            style={styles.sessionsList}
            contentContainerStyle={{
              borderTopWidth: 0.5,
              borderTopColor: "rgba(0, 0, 0, 0.59)",
            }}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("CreateSessionScreen")}
        style={styles.newSessionButton}
      >
        <AntDesign name="pluscircle" size={20} color="#fff" />
        <Text style={styles.newSessionButtonText}>Start Training</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#0D87E1",
    height: 67,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: RFValue(17.5),
    fontFamily: "MMedium",
    alignSelf: "center",
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    marginTop: 19,
  },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 10,
  },
  statsContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontFamily: "MSemiBold",
    color: "#2D2D2D",
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  statsCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 12,
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  statsValue: {
    fontSize: RFValue(20),
    fontFamily: "MBold",
    color: "#0D87E1",
  },
  statsTitle: {
    fontSize: RFValue(12),
    fontFamily: "MMedium",
    color: "#2D2D2D",
    marginTop: 4,
  },
  statsSubtitle: {
    fontSize: RFValue(10),
    fontFamily: "MRegular",
    color: "#6C757D",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: RFValue(15),
    fontFamily: "MRegular",
    color: "#2D2D2D",
  },
  sessionsContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sessionsList: {
    flex: 1,
  },
  sessionItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.59)",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    marginBottom: 8,
  },
  sessionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sessionTitle: {
    fontSize: RFValue(16),
    fontFamily: "MMedium",
    color: "#2D2D2D",
    flex: 1,
  },
  sessionDate: {
    fontSize: RFValue(12),
    fontFamily: "MRegular",
    color: "#6C757D",
  },
  sessionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionDuration: {
    fontSize: RFValue(14),
    fontFamily: "MRegular",
    color: "#495057",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: RFValue(12),
    fontFamily: "MRegular",
    color: "#6C757D",
    marginLeft: 4,
  },
  newSessionButton: {
    flexDirection: "row",
    backgroundColor: "#0D87E1",
    borderRadius: 7,
    width: Dimensions.get("window").width / 1.6,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    position: "absolute",
    bottom: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  newSessionButtonText: {
    color: "white",
    fontSize: RFValue(15),
    fontFamily: "MMedium",
    marginLeft: 10,
  },
  emptyStateText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: RFValue(15),
    color: "grey",
    fontFamily: "MLight",
  },
  emptyState: {
    width: "100%",
    height: "35%",
    marginTop: 19,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.59)",
    borderRadius: 8,
  },
});

export default TrainingDashboardScreen;
