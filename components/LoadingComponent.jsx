import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#00bfff" />
      <Text style={styles.text}>Processing your image...</Text>
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  text: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
});
