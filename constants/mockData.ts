// ======================================
//MOCK MODE - Test giao diện không cần đăng nhập
// ======================================
// Bật/tắt mock mode bằng cách thay đổi giá trị ENABLE_MOCK_MODE

export const ENABLE_MOCK_MODE = true; // ✅ BẬT mock mode | false: TẮT mock mode

// ======================================
// 👤 MOCK USER DATA
// ======================================
export const mockUser = {
  userId: 1,
  fullName: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  phoneNumber: '0123456789',
  roleName: 'Student',
  avatarUrl: 'https://i.pravatar.cc/150?img=12',
  isActive: true,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  dateOfBirth: '2000-01-01',
  gender: 'male',
};

// ======================================
// 🎓 MOCK CLASSROOMS DATA
// ======================================
export const mockClassrooms = [
  {
    classroomId: 1,
    name: 'Toán Cao Cấp A1',
    description: 'Khóa học Toán Cao Cấp dành cho sinh viên năm nhất. Nội dung bao gồm: Giới hạn, Đạo hàm, Tích phân, Chuỗi số.',
    tutorId: 101,
    tutorName: 'TS. Nguyễn Thị Lan',
    isArchived: false,
    studentCount: 45,
    price: 2000000,
    createdAt: '2024-09-01T00:00:00Z',
    // Extra fields for UI
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
    isEnrolled: true,
    enrollmentStatus: 'approved',
  },
  {
    classroomId: 2,
    name: 'Lập Trình Web Nâng Cao',
    description: 'Học React, Node.js, Express, MongoDB. Xây dựng ứng dụng web full-stack từ cơ bản đến nâng cao.',
    tutorId: 102,
    tutorName: 'ThS. Trần Văn Nam',
    isArchived: false,
    studentCount: 38,
    price: 2500000,
    createdAt: '2024-09-05T00:00:00Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    isEnrolled: true,
    enrollmentStatus: 'approved',
  },
  {
    classroomId: 3,
    name: 'Tiếng Anh Giao Tiếp B1',
    description: 'Khóa học tiếng Anh giao tiếp cơ bản, phát triển kỹ năng nghe nói đọc viết.',
    tutorId: 103,
    tutorName: 'Ms. Phạm Thu Hà',
    isArchived: false,
    studentCount: 52,
    price: 1800000,
    createdAt: '2024-09-10T00:00:00Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
    isEnrolled: false,
    enrollmentStatus: null,
  },
  {
    classroomId: 4,
    name: 'Vật Lý Đại Cương',
    description: 'Cơ học, Nhiệt học, Điện từ học, Quang học cơ bản cho sinh viên kỹ thuật.',
    tutorId: 104,
    tutorName: 'PGS.TS Lê Minh Tuấn',
    isArchived: false,
    studentCount: 60,
    price: 2200000,
    createdAt: '2024-09-01T00:00:00Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400',
    isEnrolled: true,
    enrollmentStatus: 'approved',
  },
  {
    classroomId: 5,
    name: 'Thiết Kế Đồ Họa với Photoshop',
    description: 'Học Photoshop từ cơ bản đến nâng cao. Thiết kế banner, poster, logo chuyên nghiệp.',
    tutorId: 105,
    tutorName: 'Nguyễn Hoàng Long',
    isArchived: false,
    studentCount: 28,
    price: 1500000,
    createdAt: '2024-10-01T00:00:00Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400',
    isEnrolled: false,
    enrollmentStatus: 'pending',
  },
  {
    classroomId: 6,
    name: 'Marketing Online 2024',
    description: 'Chiến lược Marketing Online, Facebook Ads, Google Ads, SEO, Content Marketing.',
    tutorId: 106,
    tutorName: 'Trần Thị Hương',
    isArchived: false,
    studentCount: 42,
    price: 3000000,
    createdAt: '2024-10-15T00:00:00Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    isEnrolled: false,
    enrollmentStatus: null,
  },
];

// ======================================
// 📊 MOCK DASHBOARD STATS
// ======================================
export const mockDashboardStats = {
  totalClasses: 5,
  totalAssignments: 12,
  totalQuizzes: 8,
  averageScore: 8.7,
  completedAssignments: 10,
  pendingAssignments: 2,
  upcomingQuizzes: 3,
};

// ======================================
// 📢 MOCK NOTIFICATIONS
// ======================================
export const mockNotifications = [
  {
    id: 1,
    title: 'Bài tập mới',
    message: 'Bài tập Toán Cao Cấp chương 5 đã được đăng',
    type: 'assignment',
    createdAt: '2024-11-18T10:00:00Z',
    isRead: false,
  },
  {
    id: 2,
    title: 'Bài kiểm tra sắp tới',
    message: 'Kiểm tra Lập Trình Web vào thứ 5 tuần này',
    type: 'quiz',
    createdAt: '2024-11-17T14:30:00Z',
    isRead: false,
  },
  {
    id: 3,
    title: 'Điểm số mới',
    message: 'Bạn đã nhận được điểm bài tập Vật Lý: 9.0',
    type: 'grade',
    createdAt: '2024-11-16T09:15:00Z',
    isRead: true,
  },
  {
    id: 4,
    title: 'Thông báo lớp học',
    message: 'Lớp Toán Cao Cấp nghỉ vào thứ 2 tuần sau',
    type: 'announcement',
    createdAt: '2024-11-15T16:00:00Z',
    isRead: true,
  },
  {
    id: 5,
    title: 'Tài liệu mới',
    message: 'Slide bài giảng Web Development đã cập nhật',
    type: 'material',
    createdAt: '2024-11-14T11:45:00Z',
    isRead: true,
  },
  {
    id: 6,
    title: 'Yêu cầu tham gia được chấp nhận',
    message: 'Bạn đã được chấp nhận vào lớp Toán Cao Cấp A1',
    type: 'enrollment',
    createdAt: '2024-11-13T08:30:00Z',
    isRead: true,
  },
];

// ======================================
// 📚 MOCK MY ENROLLMENTS
// ======================================
export const mockMyEnrollments = mockClassrooms.filter(c => c.isEnrolled);

// ======================================
// 📝 MOCK ASSIGNMENTS
// ======================================
export const mockAssignments = [
  {
    exerciseId: 1,
    classroomId: 1,
    classroomName: 'Toán Cao Cấp A1',
    title: 'Bài tập Chương 5: Tích phân',
    description: 'Giải 10 bài tập về tích phân xác định và bất định',
    dueDate: '2024-11-25T23:59:00Z',
    maxScore: 10,
    submissionStatus: 'pending',
    score: null,
  },
  {
    exerciseId: 2,
    classroomId: 2,
    classroomName: 'Lập Trình Web Nâng Cao',
    title: 'Project: Todo App với React',
    description: 'Xây dựng ứng dụng Todo sử dụng React Hooks và Local Storage',
    dueDate: '2024-11-30T23:59:00Z',
    maxScore: 10,
    submissionStatus: 'submitted',
    score: 9.5,
  },
  {
    exerciseId: 3,
    classroomId: 4,
    classroomName: 'Vật Lý Đại Cương',
    title: 'Bài tập Cơ học',
    description: 'Giải bài tập chương động lực học chất điểm',
    dueDate: '2024-11-20T23:59:00Z',
    maxScore: 10,
    submissionStatus: 'submitted',
    score: 9.0,
  },
];

// ======================================
// 📊 MOCK QUIZZES
// ======================================
export const mockQuizzes = [
  {
    quizId: 1,
    classroomId: 1,
    classroomName: 'Toán Cao Cấp A1',
    title: 'Kiểm tra giữa kỳ',
    description: 'Kiểm tra kiến thức chương 1-5',
    duration: 90,
    totalQuestions: 20,
    startTime: '2024-11-21T08:00:00Z',
    endTime: '2024-11-21T09:30:00Z',
    status: 'upcoming',
    maxScore: 10,
  },
  {
    quizId: 2,
    classroomId: 2,
    classroomName: 'Lập Trình Web Nâng Cao',
    title: 'Quiz React Hooks',
    description: 'Trắc nghiệm về useState, useEffect, useContext',
    duration: 30,
    totalQuestions: 15,
    startTime: '2024-11-19T13:00:00Z',
    endTime: '2024-11-19T13:30:00Z',
    status: 'completed',
    maxScore: 10,
    yourScore: 8.5,
  },
];

// ======================================
// 📖 MOCK LESSONS & LECTURES
// ======================================
export const mockLessons = [
  {
    lessonId: 1,
    classroomId: 1,
    title: 'Chương 1: Giới hạn và Liên tục',
    description: 'Khái niệm giới hạn, tính liên tục của hàm số',
    order: 1,
    lectures: [
      {
        lectureId: 1,
        title: 'Bài 1.1: Giới hạn của dãy số',
        type: 'video',
        url: 'https://example.com/video1',
        duration: 45,
      },
      {
        lectureId: 2,
        title: 'Bài 1.2: Giới hạn của hàm số',
        type: 'video',
        url: 'https://example.com/video2',
        duration: 50,
      },
    ],
  },
  {
    lessonId: 2,
    classroomId: 1,
    title: 'Chương 2: Đạo hàm',
    description: 'Định nghĩa đạo hàm, quy tắc tính đạo hàm',
    order: 2,
    lectures: [
      {
        lectureId: 3,
        title: 'Bài 2.1: Định nghĩa đạo hàm',
        type: 'video',
        url: 'https://example.com/video3',
        duration: 40,
      },
    ],
  },
];

// ======================================
// 💬 MOCK CHAT MESSAGES
// ======================================
export const mockChatMessages = [
  {
    messageId: 1,
    classroomId: 1,
    userId: 2,
    userName: 'Trần Văn B',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    message: 'Thầy ơi, bài tập 5 phần c em chưa hiểu ạ',
    createdAt: '2024-11-18T10:30:00Z',
  },
  {
    messageId: 2,
    classroomId: 1,
    userId: 3,
    userName: 'TS. Nguyễn Thị Lan',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    message: 'Em xem lại video bài 5.2, thầy đã giải thích rồi nhé',
    createdAt: '2024-11-18T10:32:00Z',
  },
];

// ======================================
// 🎯 HELPER FUNCTIONS
// ======================================

/**
 * Mô phỏng delay của API call
 */
export const mockDelay = (ms: number = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Mô phỏng API response success
 */
export const mockApiSuccess = async <T,>(data: T, delay: number = 500): Promise<T> => {
  await mockDelay(delay);
  return data;
};

/**
 * Mô phỏng API response error
 */
export const mockApiError = async (message: string, delay: number = 500): Promise<never> => {
  await mockDelay(delay);
  throw new Error(message);
};

/**
 * Generate mock auth tokens
 */
export const mockAuthTokens = {
  accessToken: 'mock_access_token_' + Date.now(),
  refreshToken: 'mock_refresh_token_' + Date.now(),
  expiresIn: 3600,
  tokenType: 'Bearer',
};

// ======================================
// 📌 EXPORT ALL
// ======================================
export default {
  ENABLE_MOCK_MODE,
  mockUser,
  mockClassrooms,
  mockDashboardStats,
  mockNotifications,
  mockMyEnrollments,
  mockAssignments,
  mockQuizzes,
  mockLessons,
  mockChatMessages,
  mockAuthTokens,
  mockDelay,
  mockApiSuccess,
  mockApiError,
};
