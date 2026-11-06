GRANT SELECT ON public.chain_templates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chain_templates TO authenticated;
GRANT ALL ON public.chain_templates TO service_role;