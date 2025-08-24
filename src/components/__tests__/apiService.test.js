import { apiService } from '../../services/api';

describe('API Service', () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test('getUsers fetches users successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    global.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers)
      });

    const result = await apiService.getUsers();
    
    expect(result).toEqual(mockUsers);
  });

  test('getUsers handles error response', async () => {
    global.fetch = () =>
      Promise.resolve({
        ok: false
      });

    await expect(apiService.getUsers()).rejects.toThrow('Failed to fetch users');
  });

  test('getUserById fetches user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    global.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser)
      });

    const result = await apiService.getUserById(1);
    
    expect(result).toEqual(mockUser);
  });
});
