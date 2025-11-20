// ======================================
// 🎯 AUTO API SERVICE SELECTOR
// ======================================
// File này tự động export mock hoặc real API service
// dựa trên ENABLE_MOCK_MODE

import { ENABLE_MOCK_MODE } from '../constants/mockData';
import { mockApiService } from './mockApiService';
import { apiService } from './apiService';

// ======================================
// 🔄 AUTO SELECT SERVICE
// ======================================

// Export service phù hợp dựa trên mock mode
export const api = ENABLE_MOCK_MODE ? mockApiService : apiService;

// Export default
export default api;

// ======================================
// 📝 USAGE
// ======================================
/*

Thay vì import apiService trực tiếp:
  ❌ import { apiService } from '@/services/apiService';

Hãy import từ file này:
  ✅ import { api } from '@/services/api';

Hoặc:
  ✅ import api from '@/services/api';

Ví dụ:
  const classrooms = await api.getClassrooms();
  const user = await api.getMe();

Khi ENABLE_MOCK_MODE = true:
  → Sử dụng mockApiService (fake data)

Khi ENABLE_MOCK_MODE = false:
  → Sử dụng apiService (real API)

*/
