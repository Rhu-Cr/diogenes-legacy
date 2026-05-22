-- 1) Lock down SECURITY DEFINER trigger helpers
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 2) Restrict has_role to authenticated only (RLS still works)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- 3) Add validation trigger on public student registration (defense in depth)
CREATE OR REPLACE FUNCTION public.validate_student()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.full_name IS NULL OR char_length(btrim(NEW.full_name)) < 3 OR char_length(NEW.full_name) > 120 THEN
    RAISE EXCEPTION 'Nome completo inválido';
  END IF;
  IF NEW.email IS NULL OR char_length(NEW.email) > 255 OR NEW.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'E-mail inválido';
  END IF;
  IF NEW.cpf IS NULL OR NEW.cpf !~ '^\d{11}$' THEN
    RAISE EXCEPTION 'CPF inválido';
  END IF;
  IF NEW.phone IS NULL OR NEW.phone !~ '^\d{10,11}$' THEN
    RAISE EXCEPTION 'Telefone inválido';
  END IF;
  IF NEW.cep IS NULL OR NEW.cep !~ '^\d{8}$' THEN
    RAISE EXCEPTION 'CEP inválido';
  END IF;
  IF NEW.city IS NULL OR char_length(btrim(NEW.city)) < 2 OR char_length(NEW.city) > 120 THEN
    RAISE EXCEPTION 'Cidade inválida';
  END IF;
  IF NEW.birth_date IS NOT NULL AND (NEW.birth_date > CURRENT_DATE OR NEW.birth_date < DATE '1900-01-01') THEN
    RAISE EXCEPTION 'Data de nascimento inválida';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_student_before_insert ON public.students;
CREATE TRIGGER validate_student_before_insert
BEFORE INSERT OR UPDATE ON public.students
FOR EACH ROW EXECUTE FUNCTION public.validate_student();