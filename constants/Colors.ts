/**
 * Color system - Match với web frontend (tailwind.config.ts)
 */

export const AppColors = {
  // Primary colors - match với web
  primary: '#194DB6',
  primaryLight: '#E3F2FD',
  primaryDark: '#0D3A7A',
  
  // Secondary colors
  secondary: '#F3F4F6',
  
  // Semantic colors
  success: '#10B981',
  successLight: '#D1FAE5',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  
  // Status colors for stats cards (match web dashboard)
  blue: {
    bg: '#EFF6FF',
    text: '#1E40AF',
    border: '#BFDBFE',
  },
  green: {
    bg: '#DCFCE7',
    text: '#15803D',
    border: '#BBF7D0',
  },
  orange: {
    bg: '#FFEDD5',
    text: '#C2410C',
    border: '#FED7AA',
  },
  purple: {
    bg: '#F3E8FF',
    text: '#7C3AED',
    border: '#E9D5FF',
  },
  
  // Grayscale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Base colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  
  // Text colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Background colors
  background: '#F9FAFB',
  backgroundWhite: '#FFFFFF',
  backgroundGray: '#F3F4F6',
  
  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',
};

// Priority colors for notifications (match web)
export const PriorityColors = {
  high: {
    bg: '#FEE2E2',
    text: '#991B1B',
    border: '#FCA5A5',
  },
  medium: {
    bg: '#FEF3C7',
    text: '#92400E',
    border: '#FCD34D',
  },
  low: {
    bg: '#F3F4F6',
    text: '#374151',
    border: '#D1D5DB',
  },
};

export default AppColors;
