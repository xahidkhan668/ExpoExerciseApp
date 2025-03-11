import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface EditActionBarProps {
  onDiscard: () => void;
  onSave: () => void;
}

export default function EditActionBar({ onDiscard, onSave }: EditActionBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View 
      className="absolute bottom-0 left-0 right-0 bg-white"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      {/* White overlay with shadow */}
      <View className="px-4 py-3 flex-row justify-between items-center shadow-lg">
        <Pressable
          onPress={onDiscard}
          className="flex-1 mr-3 py-3 rounded-full bg-gray-100 items-center"
        >
          <Text className="font-semibold text-gray-900">Discard</Text>
        </Pressable>

        <Pressable
          onPress={onSave}
          className="flex-1 py-3 rounded-full bg-yellow-400 items-center"
        >
          <Text className="font-semibold text-gray-900">Save Changes</Text>
        </Pressable>
      </View>
    </View>
  );
} 