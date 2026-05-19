import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";

interface StudentProfile {
  id: string;
  full_name: string;
  age: number;
  email: string;
  cpf: string;
  created_at: string;
}

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    const run = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error || !data) {
        setIsAdmin(false);
        setChecking(false);
        toast.error("Acesso restrito à área administrativa.");
        navigate("/dashboard");
        return;
      }
      setIsAdmin(true);
      const { data: profiles, error: pErr } = await supabase
        .from("profiles")
        .select("id, full_name, age, email, cpf, created_at")
        .order("created_at", { ascending: false });
      if (pErr) {
        toast.error("Erro ao carregar alunos.");
      } else {
        setStudents(profiles ?? []);
      }
      setChecking(false);
    };
    run();
  }, [user, navigate]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Verificando permissões...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.full_name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.cpf.includes(q)
    );
  });

  const formatCpf = (cpf: string) =>
    cpf.length === 11 ? `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}` : cpf;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <BackButton label="Voltar ao Dashboard" to="/dashboard" />
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-accent/10">
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">Área Administrativa</h1>
              <p className="text-muted-foreground">Alunos cadastrados na plataforma</p>
            </div>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <Users className="h-5 w-5 text-accent" />
                Alunos ({filtered.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Buscar por nome, e-mail ou CPF..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-md"
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome completo</TableHead>
                      <TableHead>Idade</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>CPF</TableHead>
                      <TableHead>Cadastro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Nenhum aluno encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium">{s.full_name || "—"}</TableCell>
                          <TableCell>{s.age || "—"}</TableCell>
                          <TableCell>{s.email}</TableCell>
                          <TableCell className="font-mono text-sm">{formatCpf(s.cpf)}</TableCell>
                          <TableCell>
                            {new Date(s.created_at).toLocaleDateString("pt-BR")}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
