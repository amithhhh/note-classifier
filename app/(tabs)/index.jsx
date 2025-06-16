import { GOOGLE_CLIENT_ID } from '@/components/authConfig';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { Image } from 'expo-image';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function HomeScreen() {
  const [userName, setUserName] = useState(null);

const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: GOOGLE_CLIENT_ID,
  scopes: ['profile', 'email'],
  redirectUri: AuthSession.makeRedirectUri({
    scheme: 'currencyapp',
    useProxy: false,
  }),
});



  useEffect(() => {
    if (response?.type === 'success') {
      const fetchUserInfo = async () => {
        try {
          const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
          });
          const user = await res.json();
          setUserName(user.name);
          await SecureStore.setItemAsync('userName', user.name); // Save locally if needed
        } catch (e) {
          console.error('Error fetching user info:', e);
        }
      };
      fetchUserInfo();
    }
  }, [response]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/homeImage.jpg')}
          style={styles.reactLogo}
        />

      }>
      <ThemedView style={styles.titleContainer}>

        {
          (userName) ? (
            <ThemedText type="title">Welcome! {userName}
              <HelloWave />
            </ThemedText>

          ) : (
            <Button
              title="Sign in with Google"
              onPress={() => promptAsync()}
              disabled={!request}
            />
          )
        }
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Welcome to Smart Currency Identifier</ThemedText>
        <ThemedText>
          An AI-powered solution that helps visually impaired users identify currency notes quickly and confidently.
          Simply point your device's camera at a banknote, and our system will announce and display the denomination.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">How It Works</ThemedText>
        <ThemedText>
          Powered by a Convolutional Neural Network (CNN), our app analyzes the captured image of a banknote in real time.
          Once identified, it announces the denomination through speech and displays it as text for additional clarity.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Start Identifying</ThemedText>
        <ThemedText>
          Tap the camera icon to begin. The system will guide you with voice instructions and let you know the note's value instantly.
        </ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
