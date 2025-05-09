import { Platform, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MenuSection({ title, items }: { title: string; items: string[]; }) {
  return (
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">{title}</ThemedText>
      {items.map((item, index) => (
        <ThemedText key={index}>{item}</ThemedText>
      ))}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});

