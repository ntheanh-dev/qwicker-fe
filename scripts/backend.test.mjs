import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveBackendConfig, normalizeAuthResult, normalizeProfile, getApiError } from '../src/configs/backend.mjs';

test('physical device uses the Metro LAN host and microservices ports', () => {
  assert.deepEqual(resolveBackendConfig({ hostUri: '192.168.88.24:8090', platform: 'ios' }), {
    apiUrl: 'http://192.168.88.24:8888/api/v3',
    socketUrl: 'http://192.168.88.24:8088/websocket/ws',
  });
});
test('iOS simulator can use localhost', () => {
  assert.equal(resolveBackendConfig({ platform: 'ios' }).apiUrl, 'http://localhost:8888/api/v3');
});
test('Android emulator uses its host-machine alias', () => {
  assert.equal(resolveBackendConfig({ hostUri: 'localhost:8089', platform: 'android' }).apiUrl, 'http://10.0.2.2:8888/api/v3');
});
test('explicit deployment URLs override development discovery', () => {
  assert.deepEqual(resolveBackendConfig({ apiUrl: 'https://api.example.test/api/v3/', socketUrl: 'https://socket.example.test/ws/', hostUri: '192.168.0.1:8089' }), {
    apiUrl: 'https://api.example.test/api/v3', socketUrl: 'https://socket.example.test/ws',
  });
});
test('microservice tokens map to the existing Redux token shape', () => {
  assert.deepEqual(normalizeAuthResult({ token: 'test-jwt', expiryTime: 'tomorrow' }), {
    token: 'test-jwt', accessToken: 'test-jwt', refreshToken: '', expiryTime: 'tomorrow',
  });
  assert.throws(() => normalizeAuthResult({}), /token/);
});
test('shipper nested profile remains usable by existing profile screens', () => {
  assert.deepEqual(normalizeProfile({ accountId: 'account-1', profile: { firstName: 'Test' }, vehicleId: '1' }), {
    id: 'account-1', accountId: 'account-1', profile: { firstName: 'Test' }, firstName: 'Test', vehicleId: '1',
  });
});
test('network failures do not become incorrect-password messages', () => {
  assert.match(getApiError({ code: 'ECONNABORTED' }).message, /Không kết nối được backend/);
  assert.deepEqual(getApiError({ response: { data: { message: 'Incorrect password' } } }), { message: 'Incorrect password' });
});

test('missing profile is distinct from a network or password failure', () => {
  const error = getApiError({ response: { status: 404, data: { code: 1003, message: 'Profile not found' } } });
  assert.match(error.message, /Đăng nhập hợp lệ/);
  assert.match(error.message, /Admin/);
});
