import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, LogIn, UserPlus, AlertCircle } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { toast } from "sonner";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Informe seu e-mail" })
  .max(255, { message: "E-mail muito longo" })
  .email({ message: "Formato de e-mail inválido (ex: nome@dominio.com)" });

const passwordSchema = z
  .string()
  .min(8, { message: "A senha deve ter ao menos 8 caracteres" })
  .max(72, { message: "A senha deve ter no máximo 72 caracteres" })
  .regex(/[A-Za-z]/, { message: "A senha deve conter ao menos uma letra" })
  .regex(/[0-9]/, { message: "A senha deve conter ao menos um número" });

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Informe sua senha" }),
});

const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type FieldErrors = { email?: string; password?: string };

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const friendlyError = (msg: string) => {
    const m = msg.toLowerCase();
    if (m.includes("invalid login")) return "E-mail ou senha incorretos.";
    if (m.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar.";
    if (m.includes("user already registered") || m.includes("already registered"))
      return "Este e-mail já está cadastrado. Faça login.";
    if (m.includes("password") && m.includes("pwned"))
      return "Esta senha aparece em vazamentos públicos. Escolha outra.";
    if (m.includes("rate limit")) return "Muitas tentativas. Aguarde alguns instantes.";
    return msg;
  };

  const validate = (): boolean => {
    const schema = isLogin ? loginSchema : signupSchema;
    const result = schema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        toast.success("Bem-vindo de volta! O Prof. Diógenes está feliz em vê-lo! 🎓");
        navigate("/dashboard");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Conta criada! Bem-vindo à plataforma. 🚀");
          navigate("/dashboard");
        } else {
          toast.success("Conta criada! Verifique seu e-mail para confirmar. 📧");
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      toast.error(friendlyError(error?.message || "Ocorreu um erro"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
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
            <CardTitle className="font-heading text-2xl">
              {isLogin ? "Entrar na Plataforma" : "Criar Conta"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? '"Cada login é um novo commit na sua jornada!" — Prof. Diógenes'
                : '"Todo grande programa começa com o primeiro Hello World!" — Prof. Diógenes'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : "password-hint"}
                  required
                />
                {errors.password ? (
                  <p id="password-error" className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.password}
                  </p>
                ) : !isLogin ? (
                  <p id="password-hint" className="text-xs text-muted-foreground">
                    Mínimo 8 caracteres, com letras e números.
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full bg-gold-gradient text-secondary-foreground font-semibold hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  "Processando..."
                ) : isLogin ? (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Entrar
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Criar Conta
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
              </button>
            </div>

            {isLogin && (
              <div className="mt-2 text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
