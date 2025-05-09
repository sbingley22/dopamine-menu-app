import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MenuSection from './menuSection.tsx'

const DEFAULT_MENU = {
  starters: [
    'Meditate or Observe for 2 minutes',
    'Stretches and vagal exercises',
    'Doodle',
    'Pet cat / watch fish',
    'Engage in small talk',
    'Put on a SSP song',
    'Open up a project and look at code',
    'Ask AI about health research',
    'Make a quick character render'
  ],
  mains: [
    'Programming',
    'Read a medical article / paper',
    'Tidy up or house hold chores',
    'Develop learning on frequently used tools (vim, git, etc)',
  ],
  deserts: [
    'Play a video game with a definitive end',
    'Play 30 mins online game',
    'Browse Old Reddit for a couple of pages',
    'Watch a Youtube video',
  ],
};

export default function HomeScreen() {
  const [menu, setMenu] = useState(DEFAULT_MENU)

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const savedMenu = await AsyncStorage.getItem('dopamineMenu')
        if (savedMenu) {
          setMenu(JSON.parse(savedMenu))
        }
      } catch (error) {
        console.error('Failed to load menu:', error)
      }
    }

    loadMenu()
  }, [])

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CE00', dark: '#1D3D00' }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Dopamine Menu</ThemedText>
      </ThemedView>

      <MenuSection title="Starters" items={menu.starters} />
      <MenuSection title="Mains" items={menu.mains} />
      <MenuSection title="Deserts" items={menu.deserts} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    justifyContent: 'end',
  },
});
