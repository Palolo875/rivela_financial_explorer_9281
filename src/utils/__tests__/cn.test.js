import { cn } from '../cn';

describe('cn utility function', () => {
  test('should merge class names correctly', () => {
    const result = cn('px-4', 'py-2', 'bg-blue-500');
    expect(result).toContain('px-4');
    expect(result).toContain('py-2');
    expect(result).toContain('bg-blue-500');
  });

  test('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
  });

  test('should handle falsy values', () => {
    const result = cn('base-class', null, undefined, false, 'valid-class');
    expect(result).toContain('base-class');
    expect(result).toContain('valid-class');
    expect(result).not.toContain('null');
    expect(result).not.toContain('undefined');
    expect(result).not.toContain('false');
  });

  test('should merge conflicting Tailwind classes', () => {
    const result = cn('px-4', 'px-6');
    // Should keep the last px value
    expect(result).toContain('px-6');
    expect(result).not.toContain('px-4');
  });
});