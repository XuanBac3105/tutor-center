import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { AppColors, BorderRadius, FontSize, Spacing } from '@/constants';

interface ThemedInputProps extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  required?: boolean;
  containerStyle?: any;
}

export function ThemedInput({
  label,
  error,
  rightIcon,
  leftIcon,
  required = false,
  containerStyle,
  value,
  onChangeText,
  ...props
}: ThemedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [labelAnimation] = useState(new Animated.Value(value ? 1 : 0));

  const hasValue = value !== '' && value !== undefined;

  React.useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFocused || hasValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, hasValue, labelAnimation]);

  const labelStyle = {
    top: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -8],
    }),
    fontSize: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [FontSize.base, FontSize.sm],
    }),
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Animated.Text>

        <TextInput
          {...props}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
          ]}
          placeholderTextColor={AppColors.gray[400]}
        />

        {rightIcon && (
          <TouchableOpacity style={styles.rightIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  inputContainer: {
    position: 'relative',
    borderWidth: 2,
    borderColor: AppColors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerFocused: {
    borderColor: AppColors.primary,
  },
  inputContainerError: {
    borderColor: AppColors.error,
  },
  label: {
    position: 'absolute',
    left: Spacing.md,
    backgroundColor: AppColors.white,
    paddingHorizontal: 4,
    color: AppColors.gray[500],
    fontWeight: '600',
    zIndex: 1,
  },
  required: {
    color: AppColors.error,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSize.base,
    color: AppColors.textPrimary,
    fontWeight: '500',
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: Spacing.xs,
  },
  leftIcon: {
    paddingLeft: Spacing.md,
  },
  rightIcon: {
    paddingRight: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  errorText: {
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
    fontSize: FontSize.sm,
    color: AppColors.error,
  },
});
