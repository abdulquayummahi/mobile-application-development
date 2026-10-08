import ProfileCard from "@/components/profile-card";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet } from "react-native";

export default function App() {
    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <StatusBar style="dark" />

            <ProfileCard
                name="Abdul Quayum"
                studentId="22-12345-1"
                department="Computer Science — AIUB"
                bio="Passionate about mobile development and building tools that make everyday life easier."
                skills={["C++", "Java", "MySQL", "ASP.NET", "React Native", "JavaScript", "Node.js", "PostgreSQL"]}
            />

            <ProfileCard
                name="Md. Musfikuzzaman"
                studentId="22-12345-2"
                department="Computer Science - AIUB"
                bio="Interested in Mobile Development Development and Computer Science related fields."
                skills={["C++", "React Native", "Node.js", "PostgreSQL", "Software Quality Testing"]}
            />

            <ProfileCard
                name="John Doe"
                studentId="22-67890-2"
                department="Computer Science — AIUB"
                bio="Interested in AI and full-stack web development. Loves competitive programming."
                skills={["Python", "Machine Learning", "React", "Django"]}
            />

            <ProfileCard
                name="Joe Schmo"
                studentId="22-54321-3"
                department="Computer Science — AIUB"
                bio="Aspiring software engineer with a passion for mobile apps and UI/UX design."
            />

            <ProfileCard
                name="Blackacre"
                studentId="22-67890-2"
                department="Electronic Engineer — AIUB"
                bio="Interested in innovative development."
                skills={["Robotics", "UAV", "Night Vision"]}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#F0F4F8",
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 40,
    },
});