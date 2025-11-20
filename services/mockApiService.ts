// ======================================
// MOCK API SERVICE
// Mock implementation của ApiService với fake data
// ======================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
import {
  mockUser,
  mockClassrooms,
  mockAuthTokens,
  mockDelay,
} from '../constants/mockData';
import type {
  LoginRequest,
  RegisterRequest,
  AuthTokens,
  User,
  ClassroomQueryParams,
  ClassroomQueryResponse,
  Classroom,
  CreateJoinRequestData,
  JoinRequest,
} from '../types';

// ======================================
// 🎨 MOCK API SERVICE CLASS
// ======================================

class MockApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = 'mock://api';
  }

  // ======================================
  // 🔐 AUTH METHODS
  // ======================================

  async login(loginData: LoginRequest): Promise<AuthTokens> {
    await mockDelay(500);
    
    // Save mock tokens
    await AsyncStorage.setItem(config.ACCESS_TOKEN_KEY, mockAuthTokens.accessToken);
    await AsyncStorage.setItem(config.REFRESH_TOKEN_KEY, mockAuthTokens.refreshToken);
    
    return mockAuthTokens;
  }

  async register(registerData: RegisterRequest): Promise<AuthTokens> {
    await mockDelay(500);
    
    // Save mock tokens
    await AsyncStorage.setItem(config.ACCESS_TOKEN_KEY, mockAuthTokens.accessToken);
    await AsyncStorage.setItem(config.REFRESH_TOKEN_KEY, mockAuthTokens.refreshToken);
    
    return mockAuthTokens;
  }

  async refreshToken(): Promise<boolean> {
    await mockDelay(200);
    return true;
  }

  async logout(): Promise<void> {
    await mockDelay(200);
    await AsyncStorage.removeItem(config.ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(config.REFRESH_TOKEN_KEY);
  }

  async getMe(): Promise<User> {
    await mockDelay(300);
    return mockUser;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem(config.ACCESS_TOKEN_KEY);
    return !!token;
  }

  // ======================================
  // 🎓 CLASSROOM METHODS
  // ======================================

  async getClassrooms(params?: ClassroomQueryParams): Promise<ClassroomQueryResponse> {
    await mockDelay(500);
    
    let filtered = [...mockClassrooms];
    
    // Filter by search query
    if (params?.q) {
      const query = params.q.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query) ||
        c.teacherName?.toLowerCase().includes(query)
      );
    }
    
    // Filter by tutorId
    if (params?.tutorId) {
      // Mock doesn't have tutorId, skip filter
    }
    
    // Filter by isArchived
    if (params?.isArchived !== undefined) {
      filtered = filtered.filter(c => c.isArchived === params.isArchived);
    }
    
    // Pagination
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = filtered.slice(start, end);
    
    return {
      items: items as any,
      total: filtered.length,
      page,
      pageSize,
    };
  }

  async getMyEnrollments(): Promise<Classroom[]> {
    await mockDelay(500);
    const enrolled = mockClassrooms.filter(c => c.isEnrolled);
    return enrolled as any;
  }

  async getClassroomById(id: number): Promise<Classroom> {
    await mockDelay(300);
    const classroom = mockClassrooms.find(c => c.classroomId === id);
    if (!classroom) {
      throw new Error('Không tìm thấy lớp học');
    }
    return classroom as any;
  }

  // ======================================
  // 📝 JOIN REQUEST METHODS
  // ======================================

  async createJoinRequest(data: CreateJoinRequestData): Promise<JoinRequest> {
    await mockDelay(500);
    
    // Update mock classroom status
    const classroom = mockClassrooms.find(c => c.classroomId === data.classroomId);
    if (classroom) {
      classroom.enrollmentStatus = 'pending';
    }
    
    return {
      joinRequestId: Date.now(),
      classroomId: data.classroomId,
      studentId: mockUser.userId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as JoinRequest;
  }

  async getMyJoinRequests(): Promise<JoinRequest[]> {
    await mockDelay(300);
    
    // Generate mock join requests based on classroom status
    const requests: JoinRequest[] = mockClassrooms
      .filter(c => c.enrollmentStatus === 'pending')
      .map(c => ({
        joinRequestId: c.classroomId,
        classroomId: c.classroomId,
        studentId: mockUser.userId,
        status: 'pending',
        message: 'Xin được tham gia lớp học',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })) as JoinRequest[];
    
    return requests;
  }
}

// ======================================
// 📌 EXPORT
// ======================================

export const mockApiService = new MockApiService();
export default mockApiService;
