import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppColors, BorderRadius, FontSize, Spacing } from '@/constants';

export default function MessagesScreen() {
  // Mock conversations
  const conversations = [
    {
      id: 1,
      name: 'TS. Nguyễn Văn A',
      lastMessage: 'Bài tập tuần này các em nhớ nộp đúng hạn nhé',
      time: '10 phút trước',
      unread: 2,
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      name: 'ThS. Trần Thị B',
      lastMessage: 'Em đã hiểu bài chưa?',
      time: '1 giờ trước',
      unread: 0,
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      name: 'Nhóm Toán 12 - Hàm số',
      lastMessage: 'Nguyễn Văn C: Ai có đáp án bài 5 không?',
      time: '2 giờ trước',
      unread: 5,
      avatar: null,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tin nhắn</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {conversations.map((conversation) => (
          <View key={conversation.id} style={styles.conversationCard}>
            <View style={styles.avatar}>
              {conversation.avatar ? (
                <Text style={styles.avatarText}>
                  {conversation.name.charAt(0)}
                </Text>
              ) : (
                <Ionicons name="people" size={24} color={AppColors.white} />
              )}
            </View>

            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <Text style={styles.conversationName} numberOfLines={1}>
                  {conversation.name}
                </Text>
                <Text style={styles.conversationTime}>{conversation.time}</Text>
              </View>

              <View style={styles.messageRow}>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {conversation.lastMessage}
                </Text>
                {conversation.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{conversation.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}

        {/* Empty state when no messages */}
        {conversations.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={AppColors.gray[400]} />
            <Text style={styles.emptyText}>Chưa có tin nhắn nào</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    backgroundColor: AppColors.white,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  conversationCard: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: AppColors.white,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  conversationName: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginRight: Spacing.sm,
  },
  conversationTime: {
    fontSize: FontSize.xs,
    color: AppColors.textTertiary,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: FontSize.sm,
    color: AppColors.textSecondary,
    marginRight: Spacing.sm,
  },
  unreadBadge: {
    backgroundColor: AppColors.primary,
    borderRadius: BorderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  unreadText: {
    fontSize: FontSize.xs,
    fontWeight: 'bold',
    color: AppColors.white,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxxl * 2,
  },
  emptyText: {
    fontSize: FontSize.base,
    color: AppColors.textSecondary,
    marginTop: Spacing.md,
  },
});
