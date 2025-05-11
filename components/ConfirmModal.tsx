import React, { useState, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ConfirmModal({
  visible,
  onConfirm,
  onCancel,
  type
}: {
  visible: boolean;
  onConfirm: (inputValue?: string) => void;
  onCancel: () => void;
  type?: 'add-item' | 'remove-item' | 'reset-menu';
}) {
  const [input, setInput] = useState('')

  useEffect(() => {
    if (!visible) setInput('')
  }, [visible])

  const handleConfirm = () => {
    onConfirm(type==='add-item' ? input : undefined)
    setInput('')
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalText}>
            {type === "add-item" ? 'Add New Item' : type === "remove-item" ? 'Delete Item?' : 'Reset Menu?'}
          </Text>

          {type==='add-item' && (
            <TextInput
              style={styles.input}
              placeholder="Enter item..."
              placeholderTextColor="#888"
              value={input}
              onChangeText={setInput}
            />
          )}

          <View style={styles.buttonRow}>
            <Pressable onPress={handleConfirm} style={styles.button}>
              <Text style={styles.tick}>✅</Text>
            </Pressable>
            <Pressable onPress={onCancel} style={styles.button}>
              <Text style={styles.cross}>❌</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    margin: 30,
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#bbb',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    padding: 10,
  },
  tick: {
    fontSize: 30,
  },
  cross: {
    fontSize: 30,
  },
  input: {
    color: '#bbb'
  }
});

