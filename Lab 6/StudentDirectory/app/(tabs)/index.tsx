import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/search-bar";
import StudentDetail from "@/components/student-detail";
import StudentItem from "@/components/student-item";
import { useStudents } from "@/context/students-context";
import { Student } from "@/data/students";
// NEW (Week 6): custom hook that delays the search query
import { useDebounce } from "@/hooks/use-debounce";

// Feature 2: one place to change the debounce delay (ms)
const SEARCH_DEBOUNCE_DELAY = 300;

export default function HomeScreen() {
    // State 1: the current search query
    const [query, setQuery] = useState<string>("");

    // Read students directly from the global context
    const { students } = useStudents();

    // State 2: the currently selected student (null = none selected)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // NEW (Week 6): ref to the search bar's TextInput, used to focus it
    const searchRef = useRef<TextInput>(null);

    // NEW (Week 6): focus the search bar 300ms after mount (lets the tab animation finish)
    useEffect(() => {
        const timer = setTimeout(() => {
            searchRef.current?.focus();
        }, 300);
        return () => clearTimeout(timer);
    }, []); // [] — run once on mount only

    // NEW (Week 6): the filter only uses the query after typing stops
    const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_DELAY);

    // NEW (Week 6): stable function reference — setSelectedStudent never changes
    const handleSelect = useCallback((student: Student) => {
        setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
    }, []);

    // If the selected student was removed, this becomes null and the
    // detail panel closes on its own.
    const selected = students.find((s) => s.id === selectedStudent?.id) ?? null;

    // NEW (Week 6): only recomputes when students or debouncedQuery changes.
    // Tapping a student (setSelectedStudent) does NOT re-run this.
    const filtered = useMemo(() => {
        return students.filter(
            (s) =>
                s.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                s.department.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
    }, [students, debouncedQuery]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Student Directory</Text>
                {/* Navigate to the AddStudent screen, no prop passing needed */}
                <Pressable style={styles.addButton} onPress={() => router.push("/(tabs)/add-student")}>
                    <Text style={styles.addButtonText}>+ Add</Text>
                </Pressable>
            </View>

            <SearchBar
                ref={searchRef}
                value={query}
                onChangeText={setQuery}
                debounceDelay={SEARCH_DEBOUNCE_DELAY}
            />

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <StudentItem student={item} onPress={handleSelect} isSelected={selected?.id === item.id} />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No students match &quot;{debouncedQuery}&quot;</Text>
                    </View>
                }
            />

            {/* Detail panel — only shown when a student is selected */}
            {selected && <StudentDetail student={selected} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
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
    addButton: {
        backgroundColor: "#0D9488",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 13,
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
