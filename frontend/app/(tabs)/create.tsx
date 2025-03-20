import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function CreateScreen() {
    const [book, setBook] = useState({
        title: "",
        author: "",
        stock: "",
        price: ""
    });

    const handleChange = (key: string, value: string) => {
        setBook({ ...book, [key]: value });
    };
    const handelSubmit = async () => {
        if (!book.title || !book.author || !book.stock || !book.price) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        try {
            const reaponse = await axios.post(API_URL + "/books", {
                title: book.title,
                author: book.author,
                stock: parseInt(book.stock),
                price: parseFloat(book.price)
            });

            Alert.alert("Success", "Book created successfully.");
            setBook({ title: "", author: "", stock: "", price: "" });
        } catch (error) {
            console.error("API error:", error);
            Alert.alert("Error", "Failed to create book.");
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.header}>Create Book</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={book.title}
                onChangeText={(text) => handleChange("title", text)}
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                placeholder="Author"
                value={book.author}
                onChangeText={(text) => handleChange("author", text)}
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                placeholder="Stock"
                value={book.stock.toString()}
                onChangeText={(text) => handleChange("stock", text)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={book.price.toString()}
                onChangeText={(text) => handleChange("price", text)}
                keyboardType="numeric"
            />
            <Button title="Create" onPress={handelSubmit} />
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#c9fffb",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: "#333",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
});