import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/ui';
import { AppColors, BorderRadius, FontSize, Spacing, PriorityColors } from '@/constants';
import { Notification } from '@/types';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - Giống web dashboard
  const stats = [
    {
      title: 'Lớp học',
      value: 4,
      description: 'Đã tham gia',
      icon: 'school' as const,
      color: 'blue' as const,
      trend: '+1 lớp mới',
    },
    {
      title: 'Bài tập',
      value: 18,
      description: 'Đã nộp',
      icon: 'document-text' as const,
      color: 'green' as const,
      trend: '12/15 đạt điểm tốt',
    },
    {
      title: 'Bài kiểm tra',
      value: 6,
      description: 'Đã hoàn thành',
      icon: 'clipboard' as const,
      color: 'purple' as const,
      trend: 'Điểm TB: 8.5',
    },
    {
      title: 'Điểm TB',
      value: '8.5',
      description: 'Tổng quát',
      icon: 'trophy' as const,
      color: 'orange' as const,
      trend: '+0.5 so với kỳ trước',
    },
  ];

  // Mock notifications - Giống web
  const notifications: Notification[] = [
    {
      id: 1,
      className: 'Lớp Toán 12 - Chuyên đề hàm số',
      teacher: '',
      title: 'Gia sư đã tạo bài tập mới',
      message: 'Gia sư đã tạo bài tập mới',
      time: '10 phút trước',
      priority: 'high',
      isRead: false,
      type: 'exercise',
    },
    {
      id: 2,
      className: 'Lớp Vật lý 11',
      teacher: '',
      title: 'Bài kiểm tra sẽ bắt đầu vào 3:00 PM hôm nay',
      message: 'Bài kiểm tra sẽ bắt đầu vào 3:00 PM hôm nay',
      time: '30 phút trước',
      priority: 'high',
      isRead: false,
      type: 'quiz',
    },
    {
      id: 3,
      className: 'Lớp Toán 12 - Chuyên đề hàm số',
      teacher: '',
      title: 'Bài tập của bạn đã được chấm điểm',
      message: 'Bài tập của bạn đã được chấm điểm',
      time: '2 giờ trước',
      priority: 'medium',
      isRead: true,
      type: 'grade',
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Fetch real data from API
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    const icons = {
      exercise: 'document-text',
      quiz: 'stats-chart',
      class: 'school',
      lecture: 'book',
      grade: 'star',
      document: 'document',
      announcement: 'megaphone',
    };
    return icons[type] || 'notifications';
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    const labels = {
      high: 'Quan trọng',
      medium: 'Bình thường',
      low: 'Thông tin',
    };
    return {
      color: PriorityColors[priority],
      label: labels[priority],
    };
  };

  // Đếm số thông báo chưa đọc
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Xin chào,</Text>
            <Text style={styles.userName}>{user?.fullName || 'Học viên'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color={AppColors.textPrimary} />
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Stats Cards - Horizontal scroll */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thống kê</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.statsScroll}
          >
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </ScrollView>
        </View>

        {/* Hoạt động 7 ngày qua */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hoạt động 7 ngày qua</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityRow}>
              <View style={styles.activityItem}>
                <Ionicons name="checkmark-circle" size={20} color={AppColors.success} />
                <Text style={styles.activityValue}>12</Text>
                <Text style={styles.activityLabel}>Bài tập nộp</Text>
              </View>
              <View style={styles.activityItem}>
                <Ionicons name="time" size={20} color={AppColors.warning} />
                <Text style={styles.activityValue}>3</Text>
                <Text style={styles.activityLabel}>Bài tập trễ</Text>
              </View>
              <View style={styles.activityItem}>
                <Ionicons name="document-text" size={20} color={AppColors.blue.text} />
                <Text style={styles.activityValue}>5</Text>
                <Text style={styles.activityLabel}>Bài kiểm tra</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tiến độ học tập theo lớp */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tiến độ học tập theo lớp</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressClass}>Toán 12 - Chuyên đề hàm số</Text>
                <Text style={styles.progressPercent}>85%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '85%', backgroundColor: AppColors.blue.text }]} />
              </View>
            </View>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressClass}>Vật lý 11</Text>
                <Text style={styles.progressPercent}>72%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '72%', backgroundColor: AppColors.green.text }]} />
              </View>
            </View>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressClass}>Hóa học 10</Text>
                <Text style={styles.progressPercent}>90%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '90%', backgroundColor: AppColors.purple.text }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông báo</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          {notifications.map((notification) => {
            const priority = getPriorityBadge(notification.priority);
            return (
              <TouchableOpacity key={notification.id} style={styles.notificationCard}>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationClass} numberOfLines={1}>
                    {notification.className}
                  </Text>

                  <Text style={styles.notificationMessage} numberOfLines={2}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  greeting: {
    fontSize: FontSize.base,
    color: AppColors.textSecondary,
  },
  userName: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
  },
  notificationButton: {
    position: 'relative',
    padding: Spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: AppColors.error,
    borderRadius: BorderRadius.full,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: AppColors.white,
    fontSize: FontSize.xs,
    fontWeight: 'bold',
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  seeAllText: {
    fontSize: FontSize.sm,
    color: AppColors.primary,
    fontWeight: '600',
  },
  statsScroll: {
    paddingLeft: Spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  quickActionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: AppColors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  quickActionText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationIcon: {
    marginRight: Spacing.md,
  },
  notificationEmoji: {
    fontSize: 32,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  notificationClass: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginRight: Spacing.sm,
  },
  priorityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  notificationTeacher: {
    fontSize: FontSize.sm,
    color: AppColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  notificationMessage: {
    fontSize: FontSize.sm,
    color: AppColors.textPrimary,
    marginBottom: Spacing.xs,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: FontSize.xs,
    color: AppColors.textTertiary,
  },
  // Activity Card Styles
  activityCard: {
    backgroundColor: AppColors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activityItem: {
    alignItems: 'center',
    flex: 1,
  },
  activityValue: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
    marginTop: Spacing.xs,
  },
  activityLabel: {
    fontSize: FontSize.xs,
    color: AppColors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  // Progress Card Styles
  progressCard: {
    backgroundColor: AppColors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressItem: {
    marginBottom: Spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  progressClass: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: AppColors.textPrimary,
    flex: 1,
  },
  progressPercent: {
    fontSize: FontSize.sm,
    fontWeight: 'bold',
    color: AppColors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: AppColors.gray[200],
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
});
