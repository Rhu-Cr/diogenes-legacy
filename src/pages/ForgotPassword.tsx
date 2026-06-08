import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, AlertCircle, MailCheck } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { toast } from "sonner";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Informe seu e-mail" })
  .max(255, { message: "E-mail muito longo" })
  .email({ message: "Formato de e-mail inválido (ex: nome@dominio.com)" });

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(result.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      // Mostramos a mesma mensagem mesmo em erro para não vazar quais e-mails existem.
      if (error && !/rate limit/i.test(error.message)) {
        console.error("resetPasswordForEmail", error);
      }
      if (error && /rate limit/i.test(error.message)) {
        toast.error("Muitas tentativas. Aguarde alguns instantes e tente novamente.");
      } else {
        setSent(true);
        toast.success("Se o e-mail existir, enviaremos o link em instantes. 📧");
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao enviar e-mail de recuperação");
    } finally {
      setLoading(false);
    }
  };

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
            <CardTitle className="font-heading text-2xl">Recuperar Senha</CardTitle>
            <CardDescription>
              "Até o melhor programador esquece uma variável!" — Prof. Diógenes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="text-center space-y-4">
                <MailCheck className="h-12 w-12 text-accent mx-auto" aria-hidden="true" />
                <p className="text-muted-foreground">
                  Se uma conta existir para <strong className="text-foreground">{email}</strong>, você receberá um e-mail com o link para redefinir a senha.
                </p>
                <p className="text-xs text-muted-foreground">
                  O link expira em 1 hora. Verifique também a pasta de spam.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="outline" onClick={() => { setSent(false); setEmail(""); }}>
                    Enviar para outro e-mail
                  </Button>
                  <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">
                    Voltar ao login
                  </Link>
                </div>
              </div>
            ) : (
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
                      if (error) setError(undefined);
                    }}
                    aria-invalid={!!error}
                    aria-describedby={error ? "email-error" : undefined}
                    required
                  />
                  {error && (
                    <p id="email-error" className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {error}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gold-gradient text-secondary-foreground font-semibold hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar Link de Recuperação"}
                </Button>
                <div className="text-center">
                  <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">
                    Voltar ao login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
