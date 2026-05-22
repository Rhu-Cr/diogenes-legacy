ALTER TABLE public.students ADD COLUMN birth_date DATE;
ALTER TABLE public.students ADD COLUMN city TEXT NOT NULL DEFAULT '';
ALTER TABLE public.students ALTER COLUMN age DROP NOT NULL;