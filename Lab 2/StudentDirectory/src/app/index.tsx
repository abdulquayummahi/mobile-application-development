import { FlatList, StyleSheet, View, Text } from "react-native";
// Importing our custom StudentItem component to display each student in the list
import StudentItem from "@/components/student-item";
// Importing the list of students from our data file
import { STUDENTS } from "@/data/students";
// Importing SafeAreaView to ensure content is displayed within the safe area boundaries of a device
import { SafeAreaView } from "react-native-safe-area-context";
// NEW: Importing the SearchBar component to allow users to search for students
import SearchBar from "@/components/search-bar";
import {useState} from "react";

export default function HomeScreen() {
    const [query, setQuery] = useState<string>("");

    const filtered = STUDENTS.filter((s) => {
       return (
           s.name.toLowerCase().includes(query.toLowerCase()) ||
               s.department.toLowerCase().includes(query.toLowerCase())
       );
    });
    return (
        // View is the container that contains the list of students and search bar
        <SafeAreaView style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Student Directory</Text>
            </View>
            {/* // NEW: Search Bar */}
            {/* // NEW: update the value and onChangeText function in the Search Bar */}
            <SearchBar value={query} onChangeText={setQuery} />

            <FlatList
                data={filtered}
                renderItem={({item}) => <StudentItem student={item} onPress={() => {}} isSelected={false}/>}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}> No Students match "{query}"</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
    // NEW: styles for the title bar
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#0D1F4E",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    count: {
        fontSize: 12,
        color: "#CCFBF1",
    },
    empty: {
        padding: 40,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 14,
        color: "#94A3B8",
    },
});
