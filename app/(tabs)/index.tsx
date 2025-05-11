import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MenuSection from './menuSection.tsx'
import { Pressable } from 'react-native'
import ConfirmModal from '../../components/ConfirmModal.tsx'

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
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')

  const handleLongPressHeader = () => {
    setModalVisible(true)
    setModalType('reset-menu')
  }

  const handleChoice = (accepted) => {
    console.log(accepted, modalType)
    if (accepted) {
      if (modalType === 'reset-menu') {
        resetMenu()
      }
    }
    setModalVisible(false)
    setModalType('')
  }

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

  const resetMenu = () => {
    AsyncStorage.removeItem('dopamineMenu')
    setMenu(DEFAULT_MENU)
  }

  const saveMenu = (newMenu) => {
    AsyncStorage.setItem('dopamineMenu', JSON.stringify(newMenu))
  }

  const addMenuItem = (course, item) => {
    const tempMenu = {...menu}
    tempMenu[course].push(item)
    setMenu(tempMenu)
    saveMenu(tempMenu)
  }

  const deleteMenuItem = (course, index) => {
    const tempMenu = {...menu}
    tempMenu[course].splice(index, 1)
    setMenu(tempMenu)
    saveMenu(tempMenu)
  }

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CE00', dark: '#1D3D00' }}>
      <ThemedView style={styles.titleContainer}>
        <Pressable onLongPress={()=>handleLongPressHeader()}>
          <ThemedText type="title">Dopamine Menu</ThemedText>
        </Pressable>
      </ThemedView>

      <MenuSection title="Starters" items={menu.starters} deleteMenuItem={deleteMenuItem} addMenuItem={addMenuItem} />
      <MenuSection title="Mains" items={menu.mains} deleteMenuItem={deleteMenuItem} addMenuItem={addMenuItem} />
      <MenuSection title="Deserts" items={menu.deserts} deleteMenuItem={deleteMenuItem} addMenuItem={addMenuItem} />

      <ConfirmModal
        visible={modalVisible}
        onConfirm={() => handleChoice(true)}
        onCancel={() => handleChoice(false)}
        type={modalType}
      />
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
