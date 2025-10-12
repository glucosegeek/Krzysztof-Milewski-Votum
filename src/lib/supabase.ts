import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface OngoingCase {
  id: string;
  case_type: string;
  current_status: string;
  start_date: string;
  expected_amount: number;
  description: string;
  client_location: string;
  stage: string;
  created_at?: string;
  updated_at?: string;
}

export interface WonCase {
  id: string;
  case_type: string;
  amount_recovered: number;
  date_won: string;
  description: string;
  client_location: string;
  created_at?: string;
  updated_at?: string;
}

export interface Statistic {
  id: string;
  page_type: 'ongoing' | 'won';
  stat_key: string;
  stat_value: string | null;
  stat_label: string;
  icon_name: string;
  display_order: number;
  is_auto_calculated: boolean;
  created_at?: string;
  updated_at?: string;
}

export const ongoingCasesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('ongoing_cases')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data as OngoingCase[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('ongoing_cases')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as OngoingCase | null;
  },

  async create(caseData: Omit<OngoingCase, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('ongoing_cases')
      .insert([caseData])
      .select()
      .single();

    if (error) throw error;
    return data as OngoingCase;
  },

  async update(id: string, caseData: Partial<Omit<OngoingCase, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('ongoing_cases')
      .update({ ...caseData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as OngoingCase;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('ongoing_cases')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

export const wonCasesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('won_cases')
      .select('*')
      .order('date_won', { ascending: false });

    if (error) throw error;
    return data as WonCase[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('won_cases')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as WonCase | null;
  },

  async create(caseData: Omit<WonCase, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('won_cases')
      .insert([caseData])
      .select()
      .single();

    if (error) throw error;
    return data as WonCase;
  },

  async update(id: string, caseData: Partial<Omit<WonCase, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('won_cases')
      .update({ ...caseData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as WonCase;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('won_cases')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

export const statisticsApi = {
  async getByPageType(pageType: 'ongoing' | 'won') {
    const { data, error } = await supabase
      .from('statistics')
      .select('*')
      .eq('page_type', pageType)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data as Statistic[];
  },

  async update(id: string, statData: Partial<Omit<Statistic, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('statistics')
      .update({ ...statData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Statistic;
  }
};
