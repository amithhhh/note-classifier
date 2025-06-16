import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Alert, Image as RNImage, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../../components/Button'; // Placeholder image
import LoadingComponent from '../../components/LoadingComponent';
const PlaceholderImage = require('@/assets/images/placeholderImage.jpg');

export default function PredictionScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // Pick image from gallery
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0]);
    } else {
      Alert.alert('You did not select any image');
    }
  };

  // Capture photo using camera
  const captureImageAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission to access camera is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0]);
    } else {
      Alert.alert('You did not take any photo');
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    const imageUri = selectedImage || RNImage.resolveAssetSource(PlaceholderImage).uri;


    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg'
    });

    try {
      const response = await fetch('https://currency-txnt.onrender.com/predict/', {
        method: 'POST',
        body: formData
      });
      const text = await response.text();  // <- grab raw response text

      if (response.ok) {
        // try parsing as JSON only if response was OK
        const data = JSON.parse(text);
        const predictionText = data.result;

        Toast.show({
          type: 'success',
          text1: 'Prediction Success',
          text2: predictionText
        });
        Speech.speak(predictionText)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Server Error',
          text2: text,
        });
      }

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Request Failed',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }

  }

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <View style={styles.imageContainer}>
        <RNImage
          source={selectedImage ? { uri: selectedImage } : PlaceholderImage}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button label="From gallery" theme="primary" type="gallery" onpress={pickImageAsync} width="40%" />
        <Button label="Capture a photo" theme="primary" type="camera" onpress={captureImageAsync} width="40%" />
      </View>
      <View style={styles.predictButtonContainer}>
        <Button label="Predict the image" width={320} theme="primary" onpress={handlePredict} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  buttonContainer: {
    flex: 0.1,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  predictButtonContainer: {

    alignItems: 'center',
    justifyContent: 'center'
  },

});
