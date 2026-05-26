GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON TABLE public.students TO anon;
GRANT INSERT, SELECT ON TABLE public.students TO authenticated;
GRANT ALL ON TABLE public.students TO service_role;
NOTIFY pgrst, 'reload schema';