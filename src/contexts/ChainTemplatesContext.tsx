import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { hackPrompts } from '@/data/prompts';
import { HackPrompt } from '@/types';

export interface ChainTemplate {
  id: string;
  name: string;
  description: string | null;
  prompt_ids: number[];
  category: string;
  is_public: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  use_count: number;
}

interface ChainTemplatesContextType {
  templates: ChainTemplate[];
  myTemplates: ChainTemplate[];
  publicTemplates: ChainTemplate[];
  isLoading: boolean;
  fetchTemplates: () => Promise<void>;
  createTemplate: (data: {
    name: string;
    description?: string;
    prompt_ids: number[];
    category?: string;
    is_public?: boolean;
  }) => Promise<{ error: Error | null }>;
  updateTemplate: (id: string, data: Partial<ChainTemplate>) => Promise<{ error: Error | null }>;
  deleteTemplate: (id: string) => Promise<{ error: Error | null }>;
  incrementUseCount: (id: string) => Promise<void>;
  getPromptsByIds: (ids: number[]) => HackPrompt[];
}

const ChainTemplatesContext = createContext<ChainTemplatesContextType | undefined>(undefined);

export function ChainTemplatesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<ChainTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('chain_templates')
        .select('*')
        .order('use_count', { ascending: false });

      if (error) throw error;
      setTemplates((data as ChainTemplate[]) || []);
    } catch (err) {
      console.error('Error fetching templates:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates, user]);

  const myTemplates = templates.filter(t => t.created_by === user?.id);
  const publicTemplates = templates.filter(t => t.is_public);

  const createTemplate = async (data: {
    name: string;
    description?: string;
    prompt_ids: number[];
    category?: string;
    is_public?: boolean;
  }) => {
    if (!user) return { error: new Error('Must be logged in to create templates') };

    const { error } = await supabase.from('chain_templates').insert({
      ...data,
      created_by: user.id,
    });

    if (!error) {
      await fetchTemplates();
    }

    return { error: error as Error | null };
  };

  const updateTemplate = async (id: string, data: Partial<ChainTemplate>) => {
    const { error } = await supabase
      .from('chain_templates')
      .update(data)
      .eq('id', id);

    if (!error) {
      await fetchTemplates();
    }

    return { error: error as Error | null };
  };

  const deleteTemplate = async (id: string) => {
    const { error } = await supabase
      .from('chain_templates')
      .delete()
      .eq('id', id);

    if (!error) {
      await fetchTemplates();
    }

    return { error: error as Error | null };
  };

  const incrementUseCount = async (id: string) => {
    const template = templates.find(t => t.id === id);
    if (!template) return;

    await supabase
      .from('chain_templates')
      .update({ use_count: template.use_count + 1 })
      .eq('id', id);
  };

  const getPromptsByIds = (ids: number[]): HackPrompt[] => {
    return ids
      .map(id => hackPrompts.find(p => p.id === id))
      .filter((p): p is HackPrompt => p !== undefined);
  };

  return (
    <ChainTemplatesContext.Provider
      value={{
        templates,
        myTemplates,
        publicTemplates,
        isLoading,
        fetchTemplates,
        createTemplate,
        updateTemplate,
        deleteTemplate,
        incrementUseCount,
        getPromptsByIds,
      }}
    >
      {children}
    </ChainTemplatesContext.Provider>
  );
}

export function useChainTemplates() {
  const context = useContext(ChainTemplatesContext);
  if (!context) {
    throw new Error('useChainTemplates must be used within a ChainTemplatesProvider');
  }
  return context;
}
