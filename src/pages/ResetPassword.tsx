import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { toast } from "sonner";

const passwordSchema = z
  .string()
  .min(8, { message: "A senha deve ter ao menos 8 caracteres" })
  .max(72, { message: "A senha deve ter no máximo 72 caracteres" })
  .regex(/[A-Za-z]/, { message: "A senha deve conter ao menos uma letra" })
  .regex(/[0-9]/, { message: "A senha deve conter ao menos um número" });

type Status = "loading" | "ready" | "invalid";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase entrega o token no fragmento da URL e dispara PASSWORD_RECOVERY.
    const hash = window.location.hash;
    const search = window.location.search;
    const hasRecoveryHash = hash.includes("type=recovery") || hash.includes("access_token");
    const hasError = hash.includes("error") || search.includes("error");

    if (hasError) {
      setStatus("invalid");
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (hasRecoveryHash && session)) {
        setStatus("ready");
      }
    });

    // Verifica sessão já existente (caso o evento já tenha sido emitido antes do mount).
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && hasRecoveryHash) {
        setStatus("ready");
      } else if (!hasRecoveryHash) {
        // Sem token de recuperação na URL
        setTimeout(() => {
          setStatus((s) => (s === "loading" ? "invalid" : s));
        }, 1500);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = passwordSchema.safeParse(password);
    const next: typeof errors = {};
    if (!result.success) next.password = result.error.issues[0].message;
    if (password !== confirm) next.confirm = "As senhas não coincidem";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Senha atualizada com sucesso! 🎉");
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (err: any) {
      const msg = (err?.message || "").toLowerCase();
      if (msg.includes("same") || msg.includes("different")) {
        toast.error("A nova senha precisa ser diferente da anterior.");
      } else if (msg.includes("pwned")) {
        toast.error("Esta senha aparece em vazamentos públicos. Escolha outra.");
      } else if (msg.includes("session") || msg.includes("expired") || msg.includes("token")) {
        toast.error("Link expirado. Solicite um novo e-mail de recuperação.");
        setStatus("invalid");
      } else {
        toast.error(err?.message || "Não foi possível redefinir a senha.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-16">
        <Card className="shadow-card max-w-md w-full">
          <CardContent className="p-8 text-center space-y-3">
            <Loader2 className="h-8 w-8 text-accent mx-auto animate-spin" aria-hidden="true" />
            <p className="text-muted-foreground">Validando link de recuperação…</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-16">
        <Card className="shadow-card max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <AlertCircle className="h-10 w-10 text-destructive mx-auto" aria-hidden="true" />
            <div>
              <p className="font-heading text-lg text-foreground">Link inválido ou expirado</p>
              <p className="text-sm text-muted-foreground mt-1">
                Solicite um novo e-mail de recuperação para continuar.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild className="bg-gold-gradient text-secondary-foreground font-semibold">
                <Link to="/forgot-password">Solicitar novo link</Link>
              </Button>
              <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">
                Voltar ao login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <BackButton label="Voltar" to="/auth" />
        </div>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
            <BookOpen className="h-7 w-7 text-accent" aria-hidden="true" />
            Legado de <span className="text-gradient">Diógenes</span>
          </Link>
        </div>
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">Definir Nova Senha</CardTitle>
            <CardDescription>
              "Toda boa refatoração começa com uma senha forte!" — Prof. Diógenes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="password">Nova Senha</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
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
                ) : (
                  <p id="password-hint" className="text-xs text-muted-foreground">
                    Mínimo 8 caracteres, com letras e números.
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirmar Senha</Label>
                <Input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    if (errors.confirm) setErrors((p) => ({ ...p, confirm: undefined }));
                  }}
                  aria-invalid={!!errors.confirm}
                  aria-describedby={errors.confirm ? "confirm-error" : undefined}
                  required
                />
                {errors.confirm && (
                  <p id="confirm-error" className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.confirm}
                  </p>
                )}
                {confirm && !errors.confirm && password === confirm && (
                  <p className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Senhas coincidem
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-gold-gradient text-secondary-foreground font-semibold hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Redefinir Senha"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
