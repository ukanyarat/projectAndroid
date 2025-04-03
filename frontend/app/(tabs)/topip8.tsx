import { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Alert, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export default function ImagePickerExample() {
    const [image, setImage] = useState<string | null>(null);
    const [savedAsset, setSavedAsset] = useState<MediaLibrary.Asset | null>(null);
    const [hasMediaPermission, setHasMediaPermission] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setHasMediaPermission(status === 'granted');
        })();
    }, []);

    const requestPermissions = async () => {
        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        const { status: pickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (mediaStatus !== 'granted' || pickerStatus !== 'granted') {
            Alert.alert('Permission Required', 'Please allow access to use media library.');
            return false;
        }

        setHasMediaPermission(true);
        return true;
    };

    const pickImage = async () => {
        if (!(await requestPermissions())) return;

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log("ImagePicker result:", result);

            if (!result.canceled && result.assets.length > 0) {
                setImage(result.assets[0].uri);
                setSavedAsset(null);
            }
        } catch (error) {
            console.error("ImagePicker Error:", error);
            Alert.alert("Error", "Failed to pick an image.");
        }
    };

    const saveImage = async () => {
        if (!image) return;
        
        if (!hasMediaPermission) {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Please allow access to save images to gallery.');
                return;
            }
            setHasMediaPermission(true);
        }
    
        try {
            // บันทึกรูปโดยไม่ต้องสร้างอัลบั้ม
            const asset = await MediaLibrary.createAssetAsync(image);
            setSavedAsset(asset); // เก็บ asset ไว้ใช้ลบภายหลัง
            Alert.alert('Success', 'Image saved successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to save image.');
            console.error('Save error:', error);
        }
    };
    

    const deleteImage = async () => {
        if (!savedAsset) {
            Alert.alert('Error', 'No saved image to delete.');
            return;
        }
    
        try {
            if (!hasMediaPermission) {
                const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Required', 'Please allow access to delete images from gallery.');
                    return;
                }
                setHasMediaPermission(true);
            }
    
            // ลบ asset โดยใช้ ID
            const result = await MediaLibrary.deleteAssetsAsync([savedAsset.id]);
    
            if (result) {
                setSavedAsset(null);
                Alert.alert('Success', 'Image deleted successfully!');
            } else {
                Alert.alert('Error', 'Failed to delete image.');
            }
        } catch (error) {
            console.error("Delete error:", error);
            Alert.alert('Error', 'Failed to delete image: ' );
        }
    };
    
    const shareImage = async () => {
        if (!image) {
            Alert.alert('Error', 'No image to share.');
            return;
        }
    
        try {
            // Check if sharing is available on the device
            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) {
                Alert.alert('Error', 'Sharing is not available on this device');
                return;
            }
    
            // Share the image
            await Sharing.shareAsync(image);
        } catch (error) {
            console.error("Sharing error:", error);
            Alert.alert('Error', 'Failed to share image: ' );
        }
    };
    
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Image Picker Example</Text>
            <Button title="Pick an image from gallery" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {image && <Button title='Save to Gallery' onPress={saveImage} color="#4CAF50" />}
            {savedAsset && <Button title="Delete from Gallery" onPress={deleteImage} color="#FF3B30" />}
            {image && <Button title="Share Image" onPress={shareImage} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
});