import { useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function Index() {
    const router = useRouter();
    const [books, setBooks] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);

    useFocusEffect(
        useCallback(() => {
            axios
                .get(API_URL + "/books")
                .then((response) => setBooks(response.data))
                .catch((error) => console.error(error));
        }, [])
    );

    const handleDelete = (id: string) => {
        axios
            .delete(`${API_URL}/books/${id}`)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
                alert("Book deleted successfully");
            })
            .catch((error) =>
                console.error("Error deleting book:", error));
    }

    const handleEdit = (book: any) => {
        setSelectedBook(book);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setSelectedBook(null);
        setIsModalVisible(false);
    };

    const handelUpdate = () => {
        if (selectedBook) {
            const updateBook = {
                title: selectedBook.title,
                author: selectedBook.author,
                stock: Number(selectedBook.stock),
                price: Number(selectedBook.price)
            };

            axios.put(`${API_URL}/books/${selectedBook.id}`, updateBook)
                .then(() => {
                    closeModal();
                    setBooks((prevBooks) => prevBooks.map((book) => book.id === selectedBook.id ? selectedBook : book));
                })
                .catch((error) => {
                    console.error("Error updating book:", error.response?.data || error.message);
                });
        }
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}>
                        <Text>Title: {item.title}</Text>
                        <Text>Author: {item.author}</Text>
                        <Text>Stock: {item.stock}</Text>
                        <Text>Price: {item.price}</Text>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => handleEdit(item)}
                        >
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Button title="Go to Profile 👤 " onPress={() => router.push('/(screens)/profile')} />

            <Modal
                visible={isModalVisible}
                onRequestClose={closeModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text>Edit Book</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={selectedBook?.title}
                            onChangeText={(text) => setSelectedBook((prev) => ({ ...prev, title: text }))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Author"
                            value={selectedBook?.author}
                            onChangeText={(text) => setSelectedBook((prev) => ({ ...prev, author: text }))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Stock"
                            value={selectedBook?.stock?.toString()}
                            onChangeText={(text) => setSelectedBook((prev) => ({ ...prev, stock: text }))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            value={selectedBook?.price?.toString()}
                            onChangeText={(text) => setSelectedBook((prev) => ({ ...prev, price: text }))}
                        />
                        <Button title="save Changes" onPress={handelUpdate} />
                        <Button title="cancel" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#c9fffb",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff"
    },
    buttonText: {
        color: "#fff",
    },
    deleteButton: {
        backgroundColor: "#ff4d4d",
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteText: {
        color: "#fff",
        fontWeight: "bold",
    },
    editButton: {
        backgroundColor: "#0de136",
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
    },
    editText: {
        color: "#fff",
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#0de136",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
});
