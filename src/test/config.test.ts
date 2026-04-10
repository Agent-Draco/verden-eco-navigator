import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Supabase Configuration', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should throw error if Supabase environment variables are missing', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '');

    await expect(import('../services/supabase')).rejects.toThrow(
      'Missing Supabase environment variables. Please check your .env file.'
    );
  });

  it('should not throw error if Supabase environment variables are present', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'example-key');

    const { supabase } = await import('../services/supabase');
    expect(supabase).toBeDefined();
  });
});

describe('Navloc Configuration', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should throw error if Navloc environment variables are missing', async () => {
    vi.stubEnv('VITE_NAVLOCDB_SUPABASE_URL', '');
    vi.stubEnv('VITE_NAVLOCDB_SUPABASE_ANON_KEY', '');

    await expect(import('../services/nominatim')).rejects.toThrow(
      'Missing Navloc Supabase environment variables. Please check your .env file.'
    );
  });

  it('should not throw error if Navloc environment variables are present', async () => {
    vi.stubEnv('VITE_NAVLOCDB_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('VITE_NAVLOCDB_SUPABASE_ANON_KEY', 'example-key');

    const { navlocSupabase } = await import('../services/nominatim');
    expect(navlocSupabase).toBeDefined();
  });
});
