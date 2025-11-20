import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { AppColors, BorderRadius, FontSize, Spacing } from '@/constants';

type TabType = 'overview' | 'lessons' | 'assignments' | 'members';

interface Lesson {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'document';
  duration?: string;
  completed: boolean;
  uploadDate: string;
}

interface Assignment {
  id: number;
  title: string;
  description: string;
  type: 'exercise' | 'quiz';
  dueDate: string;
  duration?: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  maxScore: number;
}

interface Member {
  id: number;
  name: string;
  role: 'teacher' | 'student';
}

export default function ClassDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Mock data
  const classData = {
    id: id,
    name: 'Toán 12 - Luyện thi THPT QG',
    teacher: 'Thầy Nguyễn Văn B',
    description: 'Lớp học toán nâng cao dành cho học sinh lớp 12 chuẩn bị thi THPT Quốc Gia. Tập trung vào các dạng bài tập quan trọng.',
    schedule: 'Thứ 2, 4, 6 - 14:00-16:00',
    totalStudents: 25,
    totalLessons: 36,
    completedLessons: 12,
    progress: 65,
  };

  const lessons: Lesson[] = [
    {
      id: 1,
      title: 'Giới thiệu về hàm số',
      description: 'Khái niệm cơ bản về hàm số và các tính chất',
      type: 'video',
      duration: '45 phút',
      completed: true,
      uploadDate: '01/11/2025'
    },
    {
      id: 2,
      title: 'Đạo hàm và ứng dụng',
      description: 'Quy tắc tính đạo hàm và bài tập áp dụng',
      type: 'video',
      duration: '60 phút',
      completed: true,
      uploadDate: '05/11/2025'
    },
    {
      id: 3,
      title: 'Tài liệu ôn tập giữa kỳ',
      description: 'Bộ đề thi thử và đáp án chi tiết',
      type: 'document',
      completed: false,
      uploadDate: '10/11/2025'
    }
  ];

  const assignments: Assignment[] = [
    {
      id: 1,
      title: 'Bài tập về hàm số bậc nhất',
      description: 'Làm bài tập từ câu 1 đến câu 10',
      type: 'exercise',
      dueDate: '20/11/2025',
      status: 'graded',
      score: 8.5,
      maxScore: 10
    },
    {
      id: 2,
      title: 'Bài tập về đạo hàm',
      description: 'Hoàn thành worksheet về đạo hàm',
      type: 'exercise',
      dueDate: '25/11/2025',
      status: 'submitted',
      maxScore: 10
    },
    {
      id: 3,
      title: 'Kiểm tra giữa kỳ',
      description: 'Bài kiểm tra trắc nghiệm 15 câu',
      type: 'quiz',
      duration: '30 phút',
      dueDate: '30/11/2025',
      status: 'pending',
      maxScore: 10
    }
  ];

  const members: Member[] = [
    { id: 1, name: 'Thầy Nguyễn Văn B', role: 'teacher' },
    { id: 2, name: 'Nguyễn Văn A', role: 'student' },
    { id: 3, name: 'Trần Thị B', role: 'student' },
    { id: 4, name: 'Lê Văn C', role: 'student' },
  ];

  const getLessonIcon = (type: string) => {
    return type === 'video' ? 'play-circle' : 'document-text';
  };

  const getAssignmentIcon = (type: string) => {
    return type === 'quiz' ? 'clipboard' : 'document-text';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: { bg: AppColors.warning, text: 'Chưa nộp' },
      submitted: { bg: AppColors.blue.text, text: 'Đã nộp' },
      graded: { bg: AppColors.success, text: 'Đã chấm' }
    };
    return colors[status as keyof typeof colors];
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Progress Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tiến độ học tập</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${classData.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{classData.progress}% hoàn thành</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{classData.completedLessons}/{classData.totalLessons}</Text>
            <Text style={styles.statLabel}>Bài học</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{classData.totalStudents}</Text>
            <Text style={styles.statLabel}>Học viên</Text>
          </View>
        </View>
      </View>

      {/* Schedule Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lịch học</Text>
        <View style={styles.scheduleRow}>
          <Ionicons name="calendar" size={20} color={AppColors.primary} />
          <Text style={styles.scheduleText}>{classData.schedule}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mô tả</Text>
        <Text style={styles.description}>{classData.description}</Text>
      </View>
    </View>
  );

  const renderLessons = () => (
    <View style={styles.tabContent}>
      {lessons.map((lesson) => (
        <TouchableOpacity
          key={lesson.id}
          style={styles.listItem}
          onPress={() => router.push(`/lesson/${lesson.id}`)}
        >
          <View style={[styles.iconContainer, { backgroundColor: lesson.completed ? AppColors.success : AppColors.blue.bg }]}>
            <Ionicons name={getLessonIcon(lesson.type) as any} size={20} color={lesson.completed ? AppColors.white : AppColors.blue.text} />
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>{lesson.title}</Text>
            <Text style={styles.listDescription} numberOfLines={1}>{lesson.description}</Text>
            <View style={styles.listMeta}>
              {lesson.duration && (
                <Text style={styles.metaText}>⏱ {lesson.duration}</Text>
              )}
              <Text style={styles.metaText}>📅 {lesson.uploadDate}</Text>
            </View>
          </View>
          {lesson.completed && (
            <Ionicons name="checkmark-circle" size={24} color={AppColors.success} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAssignments = () => (
    <View style={styles.tabContent}>
      {assignments.map((assignment) => {
        const status = getStatusColor(assignment.status);
        return (
          <TouchableOpacity
            key={assignment.id}
            style={styles.listItem}
            onPress={() => router.push(`/assignment/${assignment.id}`)}
          >
            <View style={[styles.iconContainer, { backgroundColor: AppColors.orange.bg }]}>
              <Ionicons name={getAssignmentIcon(assignment.type) as any} size={20} color={AppColors.orange.text} />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>{assignment.title}</Text>
              <Text style={styles.listDescription} numberOfLines={1}>{assignment.description}</Text>
              <View style={styles.listMeta}>
                <Text style={styles.metaText}>📅 Hạn: {assignment.dueDate}</Text>
                {assignment.score !== undefined && (
                  <Text style={styles.metaText}>Điểm: {assignment.score}/{assignment.maxScore}</Text>
                )}
              </View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
              <Text style={styles.statusText}>{status.text}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderMembers = () => (
    <View style={styles.tabContent}>
      {members.map((member) => (
        <View key={member.id} style={styles.memberItem}>
          <View style={[styles.avatar, { backgroundColor: member.role === 'teacher' ? AppColors.primary : AppColors.gray[300] }]}>
            <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role === 'teacher' ? 'Giáo viên' : 'Học viên'}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={AppColors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{classData.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Tổng quan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'lessons' && styles.activeTab]}
            onPress={() => setActiveTab('lessons')}
          >
            <Text style={[styles.tabText, activeTab === 'lessons' && styles.activeTabText]}>
              Bài học
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
            onPress={() => setActiveTab('assignments')}
          >
            <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>
              Bài tập
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'members' && styles.activeTab]}
            onPress={() => setActiveTab('members')}
          >
            <Text style={[styles.tabText, activeTab === 'members' && styles.activeTabText]}>
              Thành viên
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'lessons' && renderLessons()}
        {activeTab === 'assignments' && renderAssignments()}
        {activeTab === 'members' && renderMembers()}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: AppColors.white,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    flex: 1,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
    textAlign: 'center',
    marginHorizontal: Spacing.sm,
  },
  tabBar: {
    backgroundColor: AppColors.white,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  tab: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: AppColors.primary,
  },
  tabText: {
    fontSize: FontSize.sm,
    color: AppColors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: AppColors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    padding: Spacing.md,
  },
  card: {
    backgroundColor: AppColors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
    marginBottom: Spacing.md,
  },
  progressContainer: {
    marginBottom: Spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: AppColors.gray[200],
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: AppColors.primary,
    borderRadius: BorderRadius.full,
  },
  progressText: {
    fontSize: FontSize.sm,
    color: AppColors.textSecondary,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: AppColors.primary,
  },
  statLabel: {
    fontSize: FontSize.sm,
    color: AppColors.textSecondary,
    marginTop: Spacing.xs,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  scheduleText: {
    fontSize: FontSize.base,
    color: AppColors.textPrimary,
  },
  description: {
    fontSize: FontSize.base,
    color: AppColors.textSecondary,
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: FontSize.base,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  listDescription: {
    fontSize: FontSize.sm,
    color: AppColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  listMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metaText: {
    fontSize: FontSize.xs,
    color: AppColors.textTertiary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: FontSize.xs,
    color: AppColors.white,
    fontWeight: '600',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: AppColors.white,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: FontSize.base,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },
  memberRole: {
    fontSize: FontSize.sm,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
});
