import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppColors, BorderRadius, FontSize, Spacing } from '@/constants';
import { Classroom } from '@/types';

interface ClassCardProps {
  classroom: Classroom;
  onPress?: () => void;
  onEnroll?: () => void;
  isEnrolled?: boolean;
  isPending?: boolean;
  enrolling?: boolean;
}

export function ClassCard({
  classroom,
  onPress,
  onEnroll,
  isEnrolled = false,
  isPending = false,
  enrolling = false,
}: ClassCardProps) {
  const getCoverImage = () => {
    // Use coverMediaId for image
    if (classroom.coverMediaId) {
      // Generate image based on coverMediaId
      const imageUrls = [
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
        'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800',
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      ];
      const index = (classroom.coverMediaId - 1) % imageUrls.length;
      return { uri: imageUrls[index] };
    }
    return require('@/assets/images/partial-react-logo.png'); // Default image
  };

  const getButtonState = () => {
    if (isEnrolled) {
      return { text: 'Đã tham gia', color: AppColors.success, disabled: true };
    }
    if (isPending) {
      return { text: 'Chờ duyệt', color: AppColors.warning, disabled: true };
    }
    if (enrolling) {
      return { text: 'Đang xử lý...', color: AppColors.gray[400], disabled: true };
    }
    return { text: 'Đăng ký', color: AppColors.primary, disabled: false };
  };

  const buttonState = getButtonState();

  const handleCardPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      <Image source={getCoverImage()} style={styles.coverImage} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {classroom.name}
        </Text>
        
        <View style={styles.teacherContainer}>
          <Ionicons name="person" size={16} color={AppColors.gray[600]} />
          <Text style={styles.teacher} numberOfLines={1}>
            {classroom.tutorName}
          </Text>
        </View>

        {classroom.description && (
          <Text style={styles.description} numberOfLines={2}>
            {classroom.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.studentsContainer}>
            <Ionicons name="people" size={16} color={AppColors.gray[600]} />
            <Text style={styles.students}>
              {classroom.studentCount} học viên
            </Text>
          </View>

          {classroom.price > 0 && (
            <Text style={styles.price}>
              {classroom.price.toLocaleString('vi-VN')}đ
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.enrollButton,
            { backgroundColor: buttonState.color },
            buttonState.disabled && styles.enrollButtonDisabled,
          ]}
          onPress={onEnroll}
          disabled={buttonState.disabled}
        >
          <Text style={styles.enrollText}>{buttonState.text}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: 140,
    backgroundColor: AppColors.gray[200],
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  teacherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  teacher: {
    fontSize: FontSize.sm,
    color: AppColors.gray[600],
    flex: 1,
  },
  description: {
    fontSize: FontSize.sm,
    color: AppColors.gray[600],
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  studentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  students: {
    fontSize: FontSize.sm,
    color: AppColors.gray[600],
  },
  price: {
    fontSize: FontSize.base,
    fontWeight: 'bold',
    color: AppColors.primary,
  },
  enrollButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enrollButtonDisabled: {
    opacity: 0.7,
  },
  enrollText: {
    color: AppColors.white,
    fontSize: FontSize.base,
    fontWeight: 'bold',
  },
});
