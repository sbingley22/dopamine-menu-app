import { Platform, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import ConfirmModal from '../../components/ConfirmModal.tsx'

export default function MenuSection({ title, items, deleteMenuItem, addMenuItem }: { title: string; items: string[]; deleteMenuItem: any; }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFocus, setModalFocus] = useState('')
  const [modalType, setModalType] = useState('')
  const [itemSelecetion, setItemSelection] = useState(null)

  const handleLongPressItem = (index) => {
    setModalVisible(true);
    setModalFocus('item')
    setItemSelection(index)
    setModalType('remove-item')
  };

  const handleLongPressCourse = () => {
    setModalVisible(true);
    setModalFocus('course')
    setModalType('add-item')
  }

  const handleChoice = (input?: string) => {
    if (modalType==='add-item' && input) {
      addMenuItem(title.toLowerCase(), input)
    }
    else if (modalType==='remove-item') {
      deleteMenuItem(title.toLowerCase(), itemSelecetion)
    }
    setModalVisible(false);
    setModalFocus('')
    setModalType('')
    setItemSelection(null)
  };

  const handleCancel = () => {
    setModalVisible(false);
    setModalFocus('')
    setModalType('')
    setItemSelection(null)
  };

  return (
    <ThemedView style={styles.stepContainer}>
      <Pressable onLongPress={()=>handleLongPressCourse()}>
        <ThemedText type="subtitle">{title}</ThemedText>
      </Pressable>
      {items.map((item, index) => (
        <Pressable key={index} onLongPress={()=>handleLongPressItem(index)}>
          <ThemedText>{item}</ThemedText>
        </Pressable>
      ))}

      <ConfirmModal
        visible={modalVisible}
        onConfirm={handleChoice}
        onCancel={handleCancel}
        type={modalType}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});

