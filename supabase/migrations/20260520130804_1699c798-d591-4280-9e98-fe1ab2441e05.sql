
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  email TEXT NOT NULL,
  cpf TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX students_cpf_unique ON public.students (cpf);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Qualquer um pode se cadastrar
CREATE POLICY "Anyone can register as student"
ON public.students
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Apenas admins podem ver
CREATE POLICY "Admins view all students"
ON public.students
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
