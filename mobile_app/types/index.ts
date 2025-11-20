/**
 * TypeScript types - Match với frontend types
 */

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthTokens {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}

export interface User {
  userId: number;
  fullName: string;
  email: string;
  roleName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  avatarMediaId?: number;
  dateOfBirth?: string;
  gender?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Classroom types
export interface Classroom {
  classroomId: number;
  name: string;
  description?: string;
  tutorId: number;
  tutorName: string;
  isArchived: boolean;
  studentCount: number;
  price: number;
  coverMediaId?: number;
  createdAt: string;
}

export interface ClassroomQueryParams {
  q?: string;
  tutorId?: number;
  isArchived?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ClassroomQueryResponse {
  items: Classroom[];
  total: number;
  page: number;
  pageSize: number;
}

// Join Request types
export interface JoinRequest {
  joinRequestId: number;
  classroomId: number;
  studentId: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface CreateJoinRequestData {
  classroomId: number;
  studentId: number;
}

// Lesson types
export interface Lesson {
  lessonId: number;
  title: string;
  description?: string;
  classroomId: number;
  type: 'video' | 'document' | 'exercise' | 'quiz';
  orderIndex: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Stats for dashboard (mock data structure)
export interface DashboardStats {
  totalClasses: number;
  totalExercises: number;
  totalQuizzes: number;
  averageScore: number;
}

// Notification types
export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'exercise' | 'quiz' | 'class' | 'grade' | 'document' | 'announcement';
  className?: string;
  teacher?: string;
  priority: 'high' | 'medium' | 'low';
}
