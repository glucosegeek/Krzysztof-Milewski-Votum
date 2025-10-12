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

// Testimonials API
export const testimonialsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getAllVisible() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_visible', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(testimonial: {
    name: string;
    description: string;
    stars: number;
    city: string;
    is_visible?: boolean;
    display_order?: number;
  }) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonial])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, testimonial: Partial<{
    name: string;
    description: string;
    stars: number;
    city: string;
    is_visible: boolean;
    display_order: number;
  }>) {
    const { data, error } = await supabase
      .from('testimonials')
      .update({ ...testimonial, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// News API
export const newsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getAllVisible() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('is_visible', true)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(news: {
    title: string;
    content: string;
    author: string;
    date: string;
    category?: string;
    is_visible?: boolean;
    display_order?: number;
  }) {
    const { data, error } = await supabase
      .from('news')
      .insert([news])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, news: Partial<{
    title: string;
    content: string;
    author: string;
    date: string;
    category: string;
    is_visible: boolean;
    display_order: number;
  }>) {
    const { data, error } = await supabase
      .from('news')
      .update({ ...news, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('news')
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
