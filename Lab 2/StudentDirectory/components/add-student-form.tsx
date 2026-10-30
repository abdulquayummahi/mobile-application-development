import {Student} from "../data/students";
import {useEffect, useState} from "react";
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, Alert, View} from "react-native";
import FormField from "./form-field";
import {SafeAreaView} from "react-native-safe-area-context";

interface AddStudentFormProps {
    onSubmitSuccess: (student: Student) => void;
    onCancel: () => void;
}

interface FormData {
    name: string;
    studentId: string;
    email: string;
    department: string;
    bio: string;
    skillsText: string;
}

interface FormErrors {
    name?: string;
    studentId?: string;
    email?: string;
    department?: string;
    bio?: string;
}

function validateForm(data: FormData): FormErrors {
    const newErrors: FormErrors = {};

    if(data.name.trim().length === 0) {
        newErrors.name = "Name is required";
    } else if(data.name.trim().length < 3) {
        newErrors.name = "Name must be at least 3 characters";
    }

    const idPattern = /^\d{2}-\d{5}-\d$/;
    if(data.studentId.trim().length === 0) {
        newErrors.studentId = "Student Id is required";
    } else if(!idPattern.test(data.studentId.trim())){
        newErrors.studentId = "Format must be NN-NNNNN-N (e.g. 22-12345-1).";
    }

    const emailPattern = /^\d{2}-\d{5}-\d@student\.aiub\.edu$/;
    if(data.email.trim().length === 0) {
        newErrors.email = "Email is required";
    } else if(!emailPattern.test(data.email.trim())) {
        newErrors.email = "Format must be a valid email address (e.g. 22-12345-1@student.aiub.edu).)";
    }

    if(data.department.trim().length === 0) {
        newErrors.department = "Department is required";
    }

    if(data.bio.trim().length === 0) {
        newErrors.bio = "Bio is required";
    } else if(data.bio.trim().length < 10) {
        newErrors.bio = "Bio must be at least 10 characters";
    } else if(data.bio.length > 200) {
        newErrors.bio = "Bio cannot exceed 200 characters";
    }

    return newErrors;
}

export default function AddStudentForm({onSubmitSuccess, onCancel}: AddStudentFormProps) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        studentId: "",
        email: "",
        department: "",
        bio: "",
        skillsText: "",
    })

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [submitTrigger, setSubmitTrigger] = useState(false);

    const markTouched = (field: keyof FormData) => {
        setTouched((prev) => ({...prev, [field]: true}));
    }

    const handleSubmitPress = () => {
        setTouched((prev) => ({
            ...prev,
            name: true,
            studentId: true,
            email: true,
            department: true,
            bio: true,
        }));
        setSubmitAttempted(true);

        if (isFormValid) {
            setIsSubmitting(true);
            setSubmitTrigger(true);
        }

    }

    const handleCancelPress = () => {
        const hasUnsavedChanges =
            formData.name.trim().length > 0 ||
            formData.studentId.trim().length > 0 ||
            formData.email.trim().length > 0 ||
            formData.department.trim().length > 0 ||
            formData.bio.trim().length > 0 ||
            formData.skillsText.trim().length > 0 ;

        if(hasUnsavedChanges) {
            Alert.alert(
                "Discard Changes",
                "You have unsaved changes. Are you sure you want to discard changes?",
                [
                    {text: "Keep Editing", style: "cancel"},
                    {text: "Discard", style: "destructive", onPress: onCancel},
                ]
            )
        } else {
            onCancel();
        }
    }

    const getFieldError = (field: keyof FormErrors) => {
        return touched[field] || submitAttempted ? errors[field] : undefined;
    }

    const updateField = (filed: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [filed]: value }));
    }

    useEffect(() => {
        const newErrors = validateForm(formData);
        setErrors(newErrors);
    }, [formData]);

    useEffect(() => {
        if(!submitTrigger)
            return;

        const timeoutId = setTimeout(() => {
            const newStudent: Student = {
                id: Date.now().toString(),
                name: formData.name.trim(),
                studentId: formData.studentId.trim(),
                email: formData.email.trim(),
                department: formData.department.trim(),
                bio: formData.bio.trim(),
                skills: formData.skillsText
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s.length > 0),
                avatarUrl: "https://i.pravatar.cc/150?u=" + Date.now(),
            };
            setIsSubmitting(false);
            setSubmitTrigger(false);
            onSubmitSuccess(newStudent);
        }, 1500)
        return () => {
            clearTimeout(timeoutId);
        }
    }, [submitTrigger, formData, onSubmitSuccess]);

    const isFormValid =
        Object.keys(errors).length === 0 &&
        formData.name.length > 0 &&
        formData.studentId.length > 0 &&
        formData.email.length > 0;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
                <Text style={styles.heading}>Join the Directory</Text>
                <Text style={styles.subheading}>
                    Fill in your details below to add yourself to StudentDirectory.
                </Text>

                <FormField
                    label={"Full Name"}
                    value={formData.name}
                    onChangeText={(text) => updateField("name", text)}
                    onBlur={() => markTouched("name")}
                    placeholder={"e.g. John Doe"}
                    // error={errors.name}
                    error={getFieldError("name")}
                />

                <FormField
                    label={"Student ID"}
                    value={formData.studentId}
                    onChangeText={(text) => updateField("studentId", text)}
                    onBlur={() => markTouched("studentId")}
                    placeholder={"e.g. 22-12345-1"}
                    autoCapitalize={"none"}
                    error={getFieldError("studentId")}
                />

                <FormField
                    label={"Email"}
                    value={formData.email}
                    onChangeText={(text) => updateField("email", text)}
                    onBlur={() => markTouched("email")}
                    placeholder={"e.g. 22-12345-1@student.aiub.edu"}
                    // error={errors.email}
                    error={getFieldError("email")}
                />

                <FormField
                    label={"Department"}
                    value={formData.department}
                    onChangeText={(text) => updateField("department", text)}
                    onBlur={() => markTouched("department")}
                    placeholder={"e.g. Computer Science"}
                    // error={errors.department}
                    error={getFieldError("department")}
                />

                <FormField
                    label={"Bio"}
                    value={formData.bio}
                    onChangeText={(text) => updateField("bio", text)}
                    onBlur={() => markTouched("bio")}
                    placeholder={"A short sentence about yourself..."}
                    multiline
                    // error={errors.bio}
                    error={getFieldError("bio")}
                />
                <Text style={[
                    styles.charCounter,
                    formData.bio.length > 200 && styles.charCounterError
                ]}>
                    {formData.bio.length} / 200 characters
                </Text>

                <FormField
                    label="Skills (comma-separated)"
                    value={formData.skillsText}
                    onChangeText={(text) => updateField("skillsText", text)}
                    onBlur={() => markTouched("skillsText")}
                    placeholder={"e.g. React Native, TypeScript, Figma"}
                    autoCapitalize={"none"}
                />

                <View style={styles.buttonRow}>
                    {/*Cancel Button*/}
                    <Pressable
                        style={[styles.button, styles.cancelButton]}
                        onPress={handleCancelPress}
                        disabled={isSubmitting}
                    >
                        <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                    </Pressable>

                    {/* Submit Button*/}
                    <Pressable
                        style={[styles.button, styles.submitButton, !isFormValid && styles.buttonDisabled]}
                        onPress={handleSubmitPress}
                        disabled={!isFormValid || isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#FFFFFF"/>
                        ): (
                            <Text style={styles.buttonText}>Join Directory</Text>
                        )}
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: "800",
        color: "#0D1F4E",
        marginBottom: 4,
    },
    subheading: {
        fontSize: 13,
        color: "#64748B",
        marginBottom: 24,
        lineHeight: 19,
    },
    charCounter: {
        fontSize: 12,
        color: "#64748B",
        textAlign: "right",
        marginTop: -12,
        marginBottom: 16,
    },
    charCounterError: {
        color: "#DC2626",
    },
    buttonRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
        marginBottom: 32,
    },
    button: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: "#0D9488",
    },
    cancelButton: {
        backgroundColor: "#F1F5F9",
    },
    buttonDisabled: {
        backgroundColor: "#CBD5E1",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
    cancelButtonText: {
        color: "#475569",
    }
});