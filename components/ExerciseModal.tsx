import React from 'react';
import { View, Text, Modal, ScrollView, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type ModalType = 'instructions' | 'warmup' | 'faq';

interface ExerciseModalProps {
  visible: boolean;
  onClose: () => void;
  type: ModalType;
  data: string[] | Array<{ question: string; answer: string }>;
  title: string;
}

export default function ExerciseModal({ visible, onClose, type, data, title }: ExerciseModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <View className="mt-auto bg-white rounded-t-3xl h-3/4">
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-xl font-bold">{title}</Text>
            <Pressable onPress={onClose}>
              <FontAwesome name="close" size={24} color="black" />
            </Pressable>
          </View>

          {/* Content */}
          <ScrollView className="p-4">
            {type === 'faq' ? (
              // FAQ Layout
              (data as Array<{ question: string; answer: string }>).map((item, index) => (
                <View key={index} className="mb-6">
                  <Text className="text-lg font-semibold mb-2">{item.question}</Text>
                  <Text className="text-gray-600">{item.answer}</Text>
                </View>
              ))
            ) : (
              // Instructions and Warmup Layout
              (data as string[]).map((item, index) => (
                <View key={index} className="flex-row mb-4">
                  <Text className="text-lg font-bold mr-4">{index + 1}.</Text>
                  <Text className="text-lg flex-1">{item}</Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
} 