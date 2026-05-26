GRANT INSERT ON public.students TO anon, authenticated;
GRANT SELECT ON public.students TO authenticated;
GRANT ALL ON public.students TO service_role;