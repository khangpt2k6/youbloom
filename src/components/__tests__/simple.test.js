// Simple test to verify Jest setup
describe('Simple Test Suite', () => {
  test('should pass basic math test', () => {
    expect(1 + 1).toBe(2);
    expect(2 * 3).toBe(6);
    expect(10 - 5).toBe(5);
  });

  test('should handle string operations', () => {
    expect('hello').toBe('hello');
    expect('hello' + ' world').toBe('hello world');
    expect('hello'.length).toBe(5);
  });

  test('should handle array operations', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr[0]).toBe(1);
    expect(arr.includes(2)).toBe(true);
  });

  test('should handle object operations', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj.name).toBe('test');
    expect(obj.value).toBe(42);
    expect(Object.keys(obj)).toHaveLength(2);
  });
});
