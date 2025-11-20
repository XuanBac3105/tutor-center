import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JoinClassScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleJoinClass = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to join class
      // await joinClass();
      
      setToastType('success');
      setToastMessage('Đăng ký thành công!');
      setShowToast(true);
      
      // Tự động ẩn toast sau 2 giây
      setTimeout(() => {
        setShowToast(false);
        // Chuyển về màn hình trước đó
        router.back();
      }, 2000);
    } catch (error) {
      setToastType('error');
      setToastMessage('Đăng ký thất bại. Vui lòng thử lại!');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      
      {/* Main Content */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ThemedText style={styles.backButtonText}>←</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Tham gia lớp học</ThemedText>
        </View>

        {/* Class Info Card */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Thông tin lớp</ThemedText>
          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <ThemedText style={styles.label}>Tên lớp:</ThemedText>
              <ThemedText style={styles.value}>Lớp Toán 12A1</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.label}>Môn học:</ThemedText>
              <ThemedText style={styles.value}>Toán</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.label}>Lịch học:</ThemedText>
              <ThemedText style={styles.value}>Thứ 2, 4, 6 (19:00 - 21:00)</ThemedText>
            </View>
          </View>
        </View>

        {/* Join Button */}
        <TouchableOpacity 
          style={[styles.joinButton, isLoading && styles.joinButtonDisabled]}
          onPress={handleJoinClass}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <ThemedText style={styles.joinButtonText}>Đăng ký ngay</ThemedText>
          )}
        </TouchableOpacity>

        {/* Toast Message */}
        {showToast && (
          <View style={styles.toastOverlay}>
            <View style={[
              styles.toast,
              toastType === 'success' ? styles.successToast : styles.errorToast
            ]}>
              <ThemedText style={styles.toastText}>{toastMessage}</ThemedText>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  cardContent: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666666',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: '#007AFF',
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
  },
  joinButtonDisabled: {
    opacity: 0.7,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toastOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successToast: {
    backgroundColor: '#f5f5f5',
  },
  errorToast: {
    backgroundColor: '#f5f5f5',
  },
  toastText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});