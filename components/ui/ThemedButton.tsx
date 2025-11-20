import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppColors, BorderRadius, FontSize, Spacing } from '@/constants';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'danger';

interface ThemedButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function ThemedButton({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  onPress,
  fullWidth = true,
  style,
  textStyle,
}: ThemedButtonProps) {
  const isDisabled = loading || disabled;

  const buttonStyles = [
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    isDisabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'danger' ? AppColors.white : AppColors.primary}
        />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  fullWidth: {
    width: '100%',
  },
  
  // Variants
  primary: {
    backgroundColor: AppColors.primary,
  },
  secondary: {
    backgroundColor: AppColors.secondary,
  },
  tertiary: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  outline: {
    backgroundColor: AppColors.transparent,
    borderWidth: 2,
    borderColor: AppColors.primary,
  },
  danger: {
    backgroundColor: AppColors.error,
  },

  // Text styles
  text: {
    fontSize: FontSize.base,
    fontWeight: 'bold',
  },
  primaryText: {
    color: AppColors.white,
  },
  secondaryText: {
    color: AppColors.primary,
  },
  tertiaryText: {
    color: AppColors.textPrimary,
  },
  outlineText: {
    color: AppColors.primary,
  },
  dangerText: {
    color: AppColors.white,
  },

  // Disabled state
  disabled: {
    backgroundColor: AppColors.gray[400],
    borderColor: AppColors.gray[300],
  },
  disabledText: {
    color: AppColors.gray[200],
  },
});
