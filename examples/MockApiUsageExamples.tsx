// ======================================
// 🎨 EXAMPLE: Cách sử dụng Mock API Service
// ======================================
// File này demo cách sử dụng mockApiService trong các screen

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { mockApiService } from '../services/mockApiService';
import { useAuth } from '../contexts/AuthContext';

// ======================================
// 📚 Example 1: Classes Screen
// ======================================
export function ExampleClassesScreen() {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClassrooms();
  }, []);

  const loadClassrooms = async () => {
    try {
      setLoading(true);
      // 🎨 Mock API: Tự động trả về mock data nếu ENABLE_MOCK_MODE = true
      const data = await mockApiService.classrooms.getAllClassrooms();
      setClassrooms(data);
    } catch (error) {
      console.error('Load classrooms error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={classrooms}
      keyExtractor={(item) => item.classroomId.toString()}
      renderItem={({ item }) => (
        <View style={styles.classCard}>
          <Text style={styles.className}>{item.name}</Text>
          <Text style={styles.teacherName}>{item.teacherName}</Text>
          <Text style={styles.studentCount}>
            {item.studentCount} sinh viên
          </Text>
        </View>
      )}
    />
  );
}

// ======================================
// 📊 Example 2: Dashboard Screen
// ======================================
export function ExampleDashboardScreen() {
  const { user } = useAuth(); // 🎨 Mock Mode: Auto login với mockUser
  const [stats, setStats] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // 🎨 Mock API: Load stats
      const statsData = await mockApiService.dashboard.getStats();
      setStats(statsData);

      // 🎨 Mock API: Load notifications
      const notifData = await mockApiService.dashboard.getNotifications();
      setNotifications(notifData.data);
    } catch (error) {
      console.error('Load dashboard error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* User Info - Tự động có data từ AuthContext */}
      <View style={styles.userCard}>
        <Text style={styles.userName}>{user?.fullName}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      {/* Stats */}
      {stats && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalClasses}</Text>
            <Text style={styles.statLabel}>Lớp học</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalAssignments}</Text>
            <Text style={styles.statLabel}>Bài tập</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalQuizzes}</Text>
            <Text style={styles.statLabel}>Kiểm tra</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.averageScore}</Text>
            <Text style={styles.statLabel}>Điểm TB</Text>
          </View>
        </View>
      )}

      {/* Notifications */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notifCard}>
            <Text style={styles.notifTitle}>{item.title}</Text>
            <Text style={styles.notifMessage}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
}

// ======================================
// 📝 Example 3: Assignments Screen
// ======================================
export function ExampleAssignmentsScreen() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      // 🎨 Mock API: Load assignments
      const data = await mockApiService.assignments.getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error('Load assignments error:', error);
    }
  };

  const handleSubmit = async (exerciseId: number) => {
    try {
      // 🎨 Mock API: Submit assignment (fake)
      await mockApiService.assignments.submitAssignment(
        exerciseId,
        'Nội dung bài làm của tôi'
      );
      alert('Nộp bài thành công!');
      loadAssignments(); // Reload
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <FlatList
      data={assignments}
      keyExtractor={(item) => item.exerciseId.toString()}
      renderItem={({ item }) => (
        <View style={styles.assignmentCard}>
          <Text style={styles.assignmentTitle}>{item.title}</Text>
          <Text style={styles.className}>{item.classroomName}</Text>
          <Text style={styles.status}>
            Status: {item.submissionStatus}
          </Text>
          {item.score && (
            <Text style={styles.score}>Điểm: {item.score}</Text>
          )}
        </View>
      )}
    />
  );
}

// ======================================
// 📊 Example 4: Enroll/Leave Classroom
// ======================================
export function ExampleEnrollButton({ classroomId, enrollmentStatus }) {
  const [status, setStatus] = useState(enrollmentStatus);
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    try {
      setLoading(true);
      // 🎨 Mock API: Enroll classroom
      await mockApiService.classrooms.enrollClassroom(classroomId);
      setStatus('pending');
      alert('Đã gửi yêu cầu tham gia!');
    } catch (error) {
      console.error('Enroll error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeave = async () => {
    try {
      setLoading(true);
      // 🎨 Mock API: Leave classroom
      await mockApiService.classrooms.leaveClassroom(classroomId);
      setStatus(null);
      alert('Đã rời khỏi lớp học!');
    } catch (error) {
      console.error('Leave error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {status === null && (
        <button onClick={handleEnroll} disabled={loading}>
          Đăng ký
        </button>
      )}
      {status === 'pending' && (
        <Text style={styles.pendingText}>Chờ duyệt</Text>
      )}
      {status === 'approved' && (
        <button onClick={handleLeave} disabled={loading}>
          Rời lớp
        </button>
      )}
    </View>
  );
}

// ======================================
// 💡 Example 5: Check Mock Mode Status
// ======================================
export function MockModeIndicator() {
  const { ENABLE_MOCK_MODE } = require('../constants/mockData');

  if (!ENABLE_MOCK_MODE) {
    return null; // Ẩn nếu không phải mock mode
  }

  return (
    <View style={styles.mockIndicator}>
      <Text style={styles.mockText}>
        🎨 MOCK MODE - Data giả lập
      </Text>
    </View>
  );
}

// ======================================
// 🎨 STYLES
// ======================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  classCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  studentCount: {
    fontSize: 12,
    color: '#999',
  },
  userCard: {
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  notifCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  notifTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notifMessage: {
    fontSize: 14,
    color: '#666',
  },
  assignmentCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  score: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  pendingText: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  mockIndicator: {
    backgroundColor: '#FFA500',
    padding: 8,
    alignItems: 'center',
  },
  mockText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

// ======================================
// 📝 SUMMARY - Cách sử dụng:
// ======================================
/*

1. Import mockApiService:
   import { mockApiService } from '../services/mockApiService';

2. Import useAuth để lấy user (auto login trong mock mode):
   import { useAuth } from '../contexts/AuthContext';
   const { user } = useAuth();

3. Sử dụng các API methods:
   
   Classes:
   - mockApiService.classrooms.getAllClassrooms()
   - mockApiService.classrooms.getMyClassrooms()
   - mockApiService.classrooms.getClassroomById(id)
   - mockApiService.classrooms.enrollClassroom(id)
   - mockApiService.classrooms.leaveClassroom(id)
   
   Dashboard:
   - mockApiService.dashboard.getStats()
   - mockApiService.dashboard.getNotifications(page, limit)
   - mockApiService.dashboard.markNotificationAsRead(id)
   
   Assignments:
   - mockApiService.assignments.getAssignments(classroomId?)
   - mockApiService.assignments.getAssignmentById(id)
   - mockApiService.assignments.submitAssignment(id, content, files?)
   
   Quizzes:
   - mockApiService.quizzes.getQuizzes(classroomId?)
   - mockApiService.quizzes.getQuizById(id)
   - mockApiService.quizzes.startQuiz(id)
   - mockApiService.quizzes.submitQuiz(attemptId, answers)
   
   Lessons:
   - mockApiService.lessons.getLessonsByClassroom(classroomId)
   - mockApiService.lessons.getLessonById(id)
   
   Chat:
   - mockApiService.chat.getChatMessages(classroomId, page, limit)
   - mockApiService.chat.sendMessage(classroomId, message)
   
   Profile:
   - mockApiService.profile.getProfile()
   - mockApiService.profile.updateProfile(data)
   - mockApiService.profile.changePassword(oldPass, newPass)

4. Khi ENABLE_MOCK_MODE = true:
   - Tất cả API đều trả về mock data
   - Không cần backend, không cần login
   - Tự động delay để simulate network
   
5. Khi ENABLE_MOCK_MODE = false:
   - Tất cả API gọi đến backend thật
   - Cần login, cần backend API chạy

*/
