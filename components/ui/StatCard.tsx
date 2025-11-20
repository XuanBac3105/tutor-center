import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppColors, BorderRadius, FontSize, Spacing } from '@/constants';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: 'blue' | 'green' | 'orange' | 'purple';
}

const colorMap = {
  blue: AppColors.blue,
  green: AppColors.green,
  orange: AppColors.orange,
  purple: AppColors.purple,
};

export function StatCard({
  title,
  value,
  description,
  trend,
  icon,
  color,
}: StatCardProps) {
  const colors = colorMap[color];

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Ionicons name={icon} size={40} color={colors.text} style={styles.icon} />
        </View>
        
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.description, { color: colors.text }]}>{description}</Text>
        
        {trend && (
          <View style={styles.trendContainer}>
            <Ionicons name="trending-up" size={12} color={colors.text} />
            <Text style={[styles.trend, { color: colors.text }]}>{trend}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    padding: Spacing.lg,
    minWidth: 160,
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.sm,
    fontWeight: '500',
    opacity: 0.8,
    flex: 1,
  },
  icon: {
    opacity: 0.5,
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSize.xs,
    opacity: 0.7,
    marginBottom: Spacing.sm,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trend: {
    fontSize: FontSize.xs,
    fontWeight: '500',
  },
});
