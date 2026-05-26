import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, UserPlus } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { toast } from "sonner";
import { z } from "zod";

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const schema = z.object({
  fullName: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().min(3, "Nome deve ter ao menos 3 caracteres").max(120, "Nome deve ter no máximo 120 caracteres")),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento inválida")
    .refine((v) => {
      const d = new Date(v);
      const min = new Date("1900-01-01");
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return !isNaN(d.getTime()) && d <= today && d >= min;
    }, "Data de nascimento deve estar entre 01/01/1900 e hoje"),
  email: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .max(255, "E-mail deve ter no máximo 255 caracteres")
        .regex(emailRegex, "E-mail inválido"),
    ),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter exatamente 11 dígitos"),
  phone: z.string().regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos (DDD + número)"),
  cep: z.string().regex(/^\d{8}$/, "CEP deve ter exatamente 8 dígitos"),
  city: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().min(2, "Cidade deve ter ao menos 2 caracteres").max(120, "Cidade deve ter no máximo 120 caracteres")),
});

type FieldErrors = Partial<Record<"fullName" | "birthDate" | "email" | "cpf" | "phone" | "cep" | "city", string>>;

function calcAge(birth: string): number {
  const b = new Date(birth);
  const t = new Date();
  let age = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
  return age;
}

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (field: keyof FieldErrors, value: string) => {
    const fieldSchema = (schema.shape as any)[field];
    const result = fieldSchema.safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const parsed = schema.safeParse({
        fullName,
        birthDate,
        email,
        cpf: cpf.replace(/\D/g, ""),
        phone: phone.replace(/\D/g, ""),
        cep: cep.replace(/\D/g, ""),
        city,
      });
      if (!parsed.success) {
        const fieldErrors: FieldErrors = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0] as keyof FieldErrors;
          if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        toast.error("Corrija os campos destacados antes de continuar.");
        setLoading(false);
        return;
      }
      setErrors({});

      const { error } = await supabase
        .from("students")
        .insert({
          full_name: parsed.data.fullName,
          birth_date: parsed.data.birthDate,
          age: calcAge(parsed.data.birthDate),
          email: parsed.data.email,
          cpf: parsed.data.cpf,
          phone: parsed.data.phone,
          cep: parsed.data.cep,
          city: parsed.data.city,
        });

      if (error) {
        if (error.code === "23505") {
          setErrors((prev) => ({ ...prev, cpf: "Este CPF já está cadastrado." }));
          toast.error("Este CPF já está cadastrado.");
        } else {
          toast.error(error.message);
        }
        setLoading(false);
        return;
      }

      localStorage.setItem("student_name", parsed.data.fullName);
      toast.success(`Bem-vindo(a), ${parsed.data.fullName}! Bons estudos! 🎓`);
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (field: keyof FieldErrors) =>
    errors[field] ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <BackButton label="Voltar ao Início" to="/" />
        </div>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
            <BookOpen className="h-7 w-7 text-accent" aria-hidden="true" />
            Legado de <span className="text-gradient">Diógenes</span>
          </Link>
        </div>

        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">Cadastro do Aluno</CardTitle>
            <CardDescription>
              Preencha seus dados para liberar todas as aulas. Não é necessário criar senha!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={(e) => validateField("fullName", e.target.value)}
                  required
                  maxLength={120}
                  placeholder="João da Silva"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  className={fieldClass("fullName")}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  onBlur={(e) => validateField("birthDate", e.target.value)}
                  required
                  min="1900-01-01"
                  max={new Date().toISOString().slice(0, 10)}
                  aria-invalid={!!errors.birthDate}
                  aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
                  className={fieldClass("birthDate")}
                />
                {errors.birthDate && (
                  <p id="birthDate-error" className="text-sm text-destructive">{errors.birthDate}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => validateField("email", e.target.value)}
                  required
                  maxLength={255}
                  placeholder="seu@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass("email")}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF (somente números)</Label>
                <Input
                  id="cpf"
                  inputMode="numeric"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
                  onBlur={(e) => validateField("cpf", e.target.value.replace(/\D/g, ""))}
                  required
                  maxLength={11}
                  placeholder="00000000000"
                  aria-invalid={!!errors.cpf}
                  aria-describedby={errors.cpf ? "cpf-error" : undefined}
                  className={fieldClass("cpf")}
                />
                {errors.cpf && (
                  <p id="cpf-error" className="text-sm text-destructive">{errors.cpf}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone (DDD + número)</Label>
                <Input
                  id="phone"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  onBlur={(e) => validateField("phone", e.target.value.replace(/\D/g, ""))}
                  required
                  maxLength={11}
                  placeholder="11999998888"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={fieldClass("phone")}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cep">CEP (somente números)</Label>
                <Input
                  id="cep"
                  inputMode="numeric"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                  onBlur={(e) => validateField("cep", e.target.value.replace(/\D/g, ""))}
                  required
                  maxLength={8}
                  placeholder="00000000"
                  aria-invalid={!!errors.cep}
                  aria-describedby={errors.cep ? "cep-error" : undefined}
                  className={fieldClass("cep")}
                />
                {errors.cep && (
                  <p id="cep-error" className="text-sm text-destructive">{errors.cep}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={(e) => validateField("city", e.target.value)}
                  required
                  maxLength={120}
                  placeholder="São Paulo"
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? "city-error" : undefined}
                  className={fieldClass("city")}
                />
                {errors.city && (
                  <p id="city-error" className="text-sm text-destructive">{errors.city}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-gold-gradient text-secondary-foreground font-semibold hover:opacity-90" disabled={loading}>
                <UserPlus className="h-4 w-4 mr-2" />
                {loading ? "Cadastrando..." : "Começar a Estudar"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              É administrador?{" "}
              <Link to="/auth" className="text-foreground hover:underline">
                Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
