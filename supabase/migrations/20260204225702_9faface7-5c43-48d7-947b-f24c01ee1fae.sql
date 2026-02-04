-- Create chain_templates table for storing prompt chain templates
CREATE TABLE public.chain_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  prompt_ids INTEGER[] NOT NULL,
  category TEXT DEFAULT 'General',
  is_public BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  use_count INTEGER DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.chain_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for chain_templates
-- Users can view their own templates and public templates
CREATE POLICY "Users can view own and public templates" 
ON public.chain_templates 
FOR SELECT 
USING (is_public = true OR auth.uid() = created_by);

-- Users can create their own templates
CREATE POLICY "Users can create own templates" 
ON public.chain_templates 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

-- Users can update their own templates
CREATE POLICY "Users can update own templates" 
ON public.chain_templates 
FOR UPDATE 
USING (auth.uid() = created_by);

-- Users can delete their own templates
CREATE POLICY "Users can delete own templates" 
ON public.chain_templates 
FOR DELETE 
USING (auth.uid() = created_by);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_chain_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_chain_templates_updated_at
BEFORE UPDATE ON public.chain_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_chain_templates_updated_at();

-- Seed with pre-built templates (public, no creator)
INSERT INTO public.chain_templates (name, description, prompt_ids, category, is_public, created_by) VALUES
('Vibe Coding Starter', 'A beginner-friendly chain for getting into flow state with AI-assisted coding', ARRAY[1, 7, 16, 31], 'Coding', true, NULL),
('Deep Analysis', 'Systematic breakdown of complex problems through multiple analytical lenses', ARRAY[6, 8, 9, 13, 27], 'Analysis', true, NULL),
('Creative Synthesis', 'Combine lateral thinking with constraint-based innovation for novel solutions', ARRAY[15, 17, 19, 23, 28], 'Creative', true, NULL),
('Socratic Foundation', 'Core prompts for establishing deep questioning and self-validation habits', ARRAY[3, 16, 22, 32], 'Learning', true, NULL),
('Systems Thinking', 'Analyze systems at multiple scales with emergence and feedback loop detection', ARRAY[13, 25, 30, 39, 40], 'Strategy', true, NULL);