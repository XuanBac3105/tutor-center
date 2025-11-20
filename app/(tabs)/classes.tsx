import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { ClassCard } from '@/components/ui';
import { api } from '@/services';
import { AppColors, BorderRadius, FontSize, Spacing } from '@/constants';
import { Classroom, JoinRequest } from '@/types';

export default function ClassesScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allClasses, setAllClasses] = useState<Classroom[]>([]);
  const [myClasses, setMyClasses] = useState<Classroom[]>([]);
  const [myRequests, setMyRequests] = useState<JoinRequest[]>([]);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [classesResult, enrollmentsResult, requestsResult] = await Promise.all([
        api.getClassrooms({ page: 1, pageSize: 20 }),
        api.getMyEnrollments(),
        api.getMyJoinRequests(),
      ]);

      setAllClasses(classesResult.items);
      setMyClasses(enrollmentsResult);
      setMyRequests(requestsResult);
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Không thể tải danh sách lớp học');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleEnroll = async (classroomId: number) => {
    if (!user) {
      Alert.alert('Thông báo', 'Vui lòng đăng nhập để đăng ký lớp học');
      return;
    }

    // Check if already enrolled
    if (myClasses.some(c => c.classroomId === classroomId)) {
      Alert.alert('Thông báo', 'Bạn đã là thành viên của lớp học này');
      return;
    }

    // Check if request is pending
    const existingRequest = myRequests.find(r => r.classroomId === classroomId);
    if (existingRequest?.status === 'pending') {
      Alert.alert('Thông báo', 'Yêu cầu tham gia của bạn đang chờ duyệt');
      return;
    }

    setEnrollingId(classroomId);

    try {
      await api.createJoinRequest({
        classroomId,
        studentId: user.userId,
      });

      Alert.alert('Thành công', 'Đã gửi yêu cầu tham gia lớp học. Vui lòng chờ giáo viên duyệt.');
      
      // Reload join requests
      const requestsResult = await api.getMyJoinRequests();
      setMyRequests(requestsResult);
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Không thể gửi yêu cầu tham gia lớp học');
    } finally {
      setEnrollingId(null);
    }
  };

  const handleClassPress = (classroomId: number) => {
    router.push(`/class/${classroomId}`);
  };

  const filteredAllClasses = searchQuery
    ? allClasses.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tutorName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allClasses;

  const filteredMyClasses = searchQuery
    ? myClasses.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tutorName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : myClasses;

  const enrolledClassroomIds = myClasses.map(c => c.classroomId);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary} />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lớp học</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={AppColors.gray[400]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm lớp học, giáo viên..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={AppColors.gray[400]}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={AppColors.gray[400]} />
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            Tất cả ({filteredAllClasses.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'my' && styles.activeTab]}
          onPress={() => setActiveTab('my')}
        >
          <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>
            Của tôi ({filteredMyClasses.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Classes List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'all' ? (
          filteredAllClasses.length > 0 ? (
            filteredAllClasses.map((classroom) => {
              const isEnrolled = enrolledClassroomIds.includes(classroom.classroomId);
              const isPending = myRequests.some(
                r => r.classroomId === classroom.classroomId && r.status === 'pending'
              );
              
              return (
                <ClassCard
                  key={classroom.classroomId}
                  classroom={classroom}
                  onPress={() => handleClassPress(classroom.classroomId)}
                  onEnroll={() => handleEnroll(classroom.classroomId)}
                  isEnrolled={isEnrolled}
                  isPending={isPending}
                  enrolling={enrollingId === classroom.classroomId}
                />
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="school-outline" size={64} color={AppColors.gray[300]} />
              <Text style={styles.emptyText}>Không tìm thấy lớp học nào</Text>
            </View>
          )
        ) : (
          filteredMyClasses.length > 0 ? (
            filteredMyClasses.map((classroom) => (
              <ClassCard
                key={classroom.classroomId}
                classroom={classroom}
                onPress={() => handleClassPress(classroom.classroomId)}
                isEnrolled={true}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="book-outline" size={64} color={AppColors.gray[300]} />
              <Text style={styles.emptyText}>
                Bạn chưa tham gia lớp học nào
              </Text>
              <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => setActiveTab('all')}
              >
                <Text style={styles.exploreButtonText}>Khám phá lớp học</Text>
              </TouchableOpacity>
            </View>
          )
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.background,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: FontSize.base,
    color: AppColors.textSecondary,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.base,
    color: AppColors.textPrimary,
    paddingVertical: Spacing.sm,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: AppColors.white,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  activeTab: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  tabText: {
    fontSize: FontSize.base,
    fontWeight: '600',
    color: AppColors.textSecondary,
  },
  activeTabText: {
    color: AppColors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyText: {
    fontSize: FontSize.lg,
    color: AppColors.textSecondary,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  exploreButton: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
  },
  exploreButtonText: {
    color: AppColors.white,
    fontSize: FontSize.base,
    fontWeight: 'bold',
  },
});
