// app/(tabs)/(home)/index.tsx
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArticleList() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = ["All", ...new Set(ARTICLES.map(a => a.category))];

    const filteredArticles = selectedCategory
        ? ARTICLES.filter(a => a.category === selectedCategory)
        : ARTICLES;

    const handlePress = (article: Article) => {
        router.push({
            pathname: "/(home)/[id]",
            params: { id: article.id },
        });
    };

    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={filteredArticles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ArticleCard article={item} onPress={handlePress} />}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.pillContainer}
                        >
                            {categories.map(category => {
                                const isActive = selectedCategory === category || (category === "All" && !selectedCategory);
                                return (
                                    <TouchableOpacity
                                        key={category}
                                        style={[styles.pill, isActive && styles.activePill]}
                                        onPress={() => setSelectedCategory(category === "All" ? null : category)}
                                    >
                                        <Text style={[styles.pillText, isActive && styles.activePillText]}>
                                            {category}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <View style={styles.listHeader}>
                            <Text style={styles.listHeaderText}>
                                {filteredArticles.length} stories {selectedCategory ? `- IN ${selectedCategory.toUpperCase()}` : ""}
                            </Text>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F0F4F8" },
    list: { paddingTop: 12, paddingBottom: 32 },
    listHeader: { paddingHorizontal: 16, paddingBottom: 8 },
    listHeaderText: { fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1 },
    pillContainer: { paddingHorizontal: 16, paddingBottom: 16, gap: 8 },
    pill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#E2E8F0",
    },
    activePill: {
        backgroundColor: "#0D1F4E",
    },
    pillText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#475569",
    },
    activePillText: {
        color: "#FFFFFF",
    },
});