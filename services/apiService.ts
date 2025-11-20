import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
import {
  LoginRequest,
  RegisterRequest,
  AuthTokens,
  User,
  ClassroomQueryParams,
  ClassroomQueryResponse,
  Classroom,
  CreateJoinRequestData,
  JoinRequest,
  ApiResponse,
} from '../types';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = config.API_BASE_URL;
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await AsyncStorage.getItem(config.ACCESS_TOKEN_KEY);
    return {
      ...config.DEFAULT_HEADERS,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.title || errorMessage;
        } catch {
          // Ignore JSON parse error
        }
      }
      
      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return {} as T;
  }

  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.REQUEST_TIMEOUT);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Kết nối mạng quá chậm, vui lòng thử lại');
      }
      throw error;
    }
  }

  // Auth endpoints
  async login(loginData: LoginRequest): Promise<AuthTokens> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}/Auth/login`, {
        method: 'POST',
        headers: await this.getAuthHeaders(),
        body: JSON.stringify(loginData),
      });

      const result = await this.handleResponse<AuthTokens>(response);
      
      // Save tokens
      if (result.accessToken) {
        await AsyncStorage.setItem(config.ACCESS_TOKEN_KEY, result.accessToken);
        await AsyncStorage.setItem(config.REFRESH_TOKEN_KEY, result.refreshToken);
      }
      
      return result;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Đăng nhập thất bại');
    }
  }

  async register(registerData: RegisterRequest): Promise<AuthTokens> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}/Auth/register`, {
        method: 'POST',
        headers: await this.getAuthHeaders(),
        body: JSON.stringify(registerData),
      });

      const result = await this.handleResponse<AuthTokens>(response);
      
      // Save tokens
      if (result.accessToken) {
        await AsyncStorage.setItem(config.ACCESS_TOKEN_KEY, result.accessToken);
        await AsyncStorage.setItem(config.REFRESH_TOKEN_KEY, result.refreshToken);
      }
      
      return result;
    } catch (error: any) {
      console.error('Register error:', error);
      throw new Error(error.message || 'Đăng ký thất bại');
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = await AsyncStorage.getItem(config.REFRESH_TOKEN_KEY);
      
      if (!refreshToken) {
        return false;
      }

      const response = await this.fetchWithTimeout(`${this.baseURL}/Auth/refresh`, {
        method: 'POST',
        headers: await this.getAuthHeaders(),
        body: JSON.stringify({ refreshToken }),
      });

      const result = await this.handleResponse<AuthTokens>(response);
      
      if (result.accessToken) {
        await AsyncStorage.setItem(config.ACCESS_TOKEN_KEY, result.accessToken);
        await AsyncStorage.setItem(config.REFRESH_TOKEN_KEY, result.refreshToken);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Refresh token error:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = await AsyncStorage.getItem(config.REFRESH_TOKEN_KEY);
      
      if (refreshToken) {
        await this.fetchWithTimeout(`${this.baseURL}/Auth/logout`, {
          method: 'POST',
          headers: await this.getAuthHeaders(),
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear tokens
      await AsyncStorage.removeItem(config.ACCESS_TOKEN_KEY);
      await AsyncStorage.removeItem(config.REFRESH_TOKEN_KEY);
    }
  }

  async getMe(): Promise<User> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}/Profile/me`, {
        method: 'GET',
        headers: await this.getAuthHeaders(),
      });

      return await this.handleResponse<User>(response);
    } catch (error: any) {
      console.error('Get me error:', error);
      throw new Error(error.message || 'Lấy thông tin người dùng thất bại');
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem(config.ACCESS_TOKEN_KEY);
    return !!token;
  }

  // Classroom endpoints
  async getClassrooms(params?: ClassroomQueryParams): Promise<ClassroomQueryResponse> {
    try {
      const queryString = new URLSearchParams();
      if (params?.q) queryString.append('Q', params.q);
      if (params?.tutorId) queryString.append('TutorId', params.tutorId.toString());
      if (params?.isArchived !== undefined) queryString.append('IsArchived', params.isArchived.toString());
      if (params?.page) queryString.append('Page', params.page.toString());
      if (params?.pageSize) queryString.append('PageSize', params.pageSize.toString());

      const url = `${this.baseURL}/Classrooms${queryString.toString() ? `?${queryString}` : ''}`;
      
      const response = await this.fetchWithTimeout(url, {
        method: 'GET',
        headers: await this.getAuthHeaders(),
      });

      return await this.handleResponse<ClassroomQueryResponse>(response);
    } catch (error: any) {
      console.error('Get classrooms error:', error);
      throw new Error(error.message || 'Lấy danh sách lớp học thất bại');
    }
  }

  async getMyEnrollments(): Promise<Classroom[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}/Classrooms/my-enrollments`, {
        method: 'GET',
        headers: await this.getAuthHeaders(),
      });

      return await this.handleResponse<Classroom[]>(response);
    } catch (error: any) {
      console.error('Get my enrollments error:', error);
      throw new Error(error.message || 'Lấy danh sách lớp học đã tham gia thất bại');
    }
  }

  async getClassroomById(id: number): Promise<Classroom> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}/Classrooms/${id}`, {
        method: 'GET',
        headers: await this.getAuthHeaders(),
      });

      return await this.handleResponse<Classroom>(response);
    } catch (error: any) {
      console.error('Get classroom by id error:', error);
      throw new Error(error.message || 'Lấy thông tin lớp học thất bại');
    }
  }

  // Join Request endpoints
  async createJoinRequest(data: CreateJoinRequestData): Promise<JoinRequest> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}/JoinRequests`, {
        method: 'POST',
        headers: await this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      return await this.handleResponse<JoinRequest>(response);
    } catch (error: any) {
      console.error('Create join request error:', error);
      throw new Error(error.message || 'Gửi yêu cầu tham gia thất bại');
    }
  }

  async getMyJoinRequests(): Promise<JoinRequest[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}/JoinRequests/my`, {
        method: 'GET',
        headers: await this.getAuthHeaders(),
      });

      return await this.handleResponse<JoinRequest[]>(response);
    } catch (error: any) {
      console.error('Get my join requests error:', error);
      throw new Error(error.message || 'Lấy danh sách yêu cầu tham gia thất bại');
    }
  }
}

export const apiService = new ApiService();
