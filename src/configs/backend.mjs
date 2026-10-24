// Keep host selection separate from React Native so device/emulator behavior is testable.
export function resolveBackendConfig({ apiUrl, socketUrl, hostUri, platform, port = '8888' } = {}) {
  let host = 'localhost';
  if (hostUri) {
    host = new URL(hostUri.includes('://') ? hostUri : `http://${hostUri}`).hostname;
  }
  if (platform === 'android' && ['localhost', '127.0.0.1'].includes(host)) host = '10.0.2.2';
  const base = (apiUrl?.trim() || `http://${host}:${port}/api/v3`).replace(/\/+$/, '');
  const parsed = new URL(base);
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('API URL must use HTTP or HTTPS.');
  const socket = socketUrl?.trim() || `${parsed.protocol}//${parsed.hostname}:8088/websocket/ws`;
  return { apiUrl: base, socketUrl: socket.replace(/\/+$/, '') };
}

export function normalizeAuthResult(result) {
  const accessToken = result?.token || result?.accessToken;
  if (!accessToken) throw new Error('Máy chủ không trả về token đăng nhập.');
  return { ...result, accessToken, refreshToken: result.refreshToken || '', expiryTime: result.expiryTime };
}

export function normalizeProfile(profile) {
  return { ...profile?.profile, ...profile, id: profile?.accountId || profile?.id };
}

export function getApiError(error) {
  const data = error?.response?.data;
  if (error?.response?.status === 404 && data?.code === 1003) {
    return {
      ...data,
      message: 'Đăng nhập hợp lệ nhưng tài khoản chưa có hồ sơ người dùng/tài xế. Admin mặc định chưa có hồ sơ mobile.',
    };
  }
  if (data) return data;
  return {
    code: error?.code || 'NETWORK_ERROR',
    message: error?.response
      ? `Máy chủ trả về lỗi HTTP ${error.response.status}.`
      : 'Không kết nối được backend. Kiểm tra máy chủ, địa chỉ API và kết nối Wi-Fi.',
  };
}
