# 🚀 Mobile App Setup Guide

## Bạn đã có đầy đủ code mobile app giống web!

### Đã tạo xong:

#### **Constants & Theme**
- ✅ `constants/Colors.ts` - Color system giống web (#194DB6 primary)
- ✅ `constants/Spacing.ts` - Spacing, FontSize, BorderRadius
- ✅ `constants/index.ts` - Export tất cả constants

#### **Types**
- ✅ `types/index.ts` - TypeScript types (User, Classroom, JoinRequest...)

#### **Components**
- ✅ `components/ui/ThemedInput.tsx` - Input component giống AuthInput
- ✅ `components/ui/ThemedButton.tsx` - Button với variants (primary, secondary...)
- ✅ `components/ui/StatCard.tsx` - Thẻ thống kê cho dashboard
- ✅ `components/ui/ClassCard.tsx` - Thẻ lớp học với cover image
- ✅ `components/ui/index.ts` - Export tất cả UI components

#### **Services**
- ✅ `services/apiService.ts` - API client hoàn chỉnh
  - Auth: login, register, logout, getMe
  - Classrooms: getClassrooms, getMyEnrollments, getClassroomById
  - JoinRequests: createJoinRequest, getMyJoinRequests

#### **Screens**
- ✅ `app/(tabs)/dashboard.tsx` - Dashboard với stats, quick actions, notifications
- ✅ `app/(tabs)/classes.tsx` - Danh sách lớp học (All/My tabs)
- ✅ `app/(tabs)/profile.tsx` - Hồ sơ cá nhân
- ✅ `app/(tabs)/_layout.tsx` - Tab navigation (Dashboard, Classes, Profile)
- ✅ `app/(tabs)/index.tsx` - Redirect tới dashboard

---

##  Cách chạy mobile app:

### **Option 1: Expo Go (Dễ nhất)**

```bash
cd mobile_app
npm start
```

Sau đó:
- **Android**: Scan QR code bằng Expo Go app
- **iOS**: Scan QR code bằng Camera app

### **Option 2: Android Studio Emulator**

```bash
# Mở Android Studio emulator trước
npm run android
```

### **Option 3: iOS Simulator (Mac only)**

```bash
npm run ios
```

---

## 📱 Cấu trúc màn hình:

### **Tab Navigation:**
```
┌─────────────────────────────────────┐
│                                     │
│        Dashboard Screen             │  ← 4 stat cards, quick actions, notifications
│                                     │
├─────────────────────────────────────┤
│  [Dashboard] [Lớp học] [Cá nhân]   │  ← Bottom tabs
└─────────────────────────────────────┘
```

### **Dashboard:**
- 4 stat cards (horizontal scroll)
- Quick actions grid
- Notifications list

### **Classes:**
- Search bar
- All/My tabs
- ClassCard list
- Enroll button với states (Đăng ký, Chờ duyệt, Đã tham gia)

### **Profile:**
- Avatar & user info
- Stats cards (3 cards)
- Menu items list
- Logout button

---

## 🎨 Design giống Web:

| Web | Mobile | Match |
|-----|--------|-------|
| Primary color #194DB6 | ✅ | Same |
| AuthInput floating label | ✅ ThemedInput | Same |
| AuthButton variants | ✅ ThemedButton | Same |
| StatCard với icon | ✅ StatCard | Same |
| ClassCard layout | ✅ ClassCard | Same |
| Dashboard 4 stats | ✅ Dashboard | Same |
| All/My classes tabs | ✅ Classes screen | Same |

---

## 🔧 Cần cập nhật IP Backend:

**File: `mobile_app/config/index.ts`**
```typescript
API_BASE_URL: 'http://192.168.1.XXX:5293/api'
```

Thay `192.168.1.XXX` bằng IP thật của máy bạn:

```bash
# Windows (PowerShell)
ipconfig

# Tìm IPv4 Address của adapter Wi-Fi/Ethernet
```

---

## ✅ Checklist test:

- [ ] Chạy `npm start` trong `mobile_app/`
- [ ] Scan QR code bằng Expo Go
- [ ] Test login screen (đã có sẵn)
- [ ] Test dashboard screen (4 stat cards, notifications)
- [ ] Test classes screen (All/My tabs, search)
- [ ] Test enroll button (gửi join request)
- [ ] Test profile screen (logout)

---

## 🚀 Next Steps:

1. **Cập nhật IP trong config**
2. **Chạy backend API** (port 5293)
3. **npm start trong mobile_app/**
4. **Test trên Expo Go hoặc emulator**
5. **Có lỗi thì báo tôi!**

---

## 📝 API Endpoints đã integrate:

- ✅ `POST /Auth/login`
- ✅ `POST /Auth/register`
- ✅ `POST /Auth/logout`
- ✅ `GET /Profile/me`
- ✅ `GET /Classrooms` (with params)
- ✅ `GET /Classrooms/my-enrollments`
- ✅ `GET /Classrooms/{id}`
- ✅ `POST /JoinRequests`
- ✅ `GET /JoinRequests/my`

---

Bạn sẵn sàng chạy thử chưa? 🎉
