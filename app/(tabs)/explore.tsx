import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  return (
<ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/aboutImage.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About Us</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
  <ThemedText type="subtitle">About This Project</ThemedText>
  <ThemedText>
    The Smart Currency Identifier is developed to assist visually impaired individuals in recognizing currency notes on their own, without relying on others.
    It uses a Convolutional Neural Network (CNN) to accurately detect the denomination from a captured image.
  </ThemedText>
</ThemedView>

<ThemedView style={styles.stepContainer}>
  <ThemedText type="subtitle">What Makes It Special?</ThemedText>
  <ThemedText>
    Unlike other tools, our system provides a dual-mode output:
    clear text for sighted users and real-time speech for those with visual impairments — ensuring accessibility and inclusivity for all.
  </ThemedText>
</ThemedView>

<ThemedView style={styles.stepContainer}>
  <ThemedText type="subtitle">Our Goal</ThemedText>
  <ThemedText>
    To make financial transactions safer and more independent for blind and visually impaired users by using intelligent, accessible technologies.
  </ThemedText>
</ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
   stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 208,
    width: 380,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
   
});
