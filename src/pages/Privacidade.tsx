import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacidade = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao site
        </Link>

        <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground">
          <p>A LS Holdings, pessoa jurídica de direito privado, com sede em Florianópolis/SC, está comprometida com a proteção da privacidade e dos dados pessoais de seus usuários, clientes e parceiros, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">1. Dados Coletados</h2>
          <p>Podemos coletar os seguintes dados pessoais:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Dados de navegação (cookies, endereço IP, páginas visitadas)</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8">2. Finalidade do Tratamento</h2>
          <p>Os dados pessoais coletados são utilizados para:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Atendimento de solicitações e contato</li>
            <li>Envio de comunicações institucionais</li>
            <li>Melhoria dos nossos serviços e experiência do usuário</li>
            <li>Cumprimento de obrigações legais e regulatórias</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8">3. Compartilhamento de Dados</h2>
          <p>Seus dados pessoais não serão compartilhados com terceiros, exceto quando necessário para cumprimento de obrigações legais, por determinação judicial ou com prestadores de serviço essenciais ao funcionamento da empresa, sempre mediante compromisso de confidencialidade.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">4. Segurança dos Dados</h2>
          <p>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acessos não autorizados, destruição, perda, alteração ou qualquer forma de tratamento inadequado.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">5. Direitos do Titular</h2>
          <p>Você possui os seguintes direitos em relação aos seus dados pessoais:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Confirmar a existência de tratamento de dados</li>
            <li>Acessar, corrigir ou solicitar a exclusão dos dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
            <li>Solicitar a portabilidade dos dados</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8">6. Cookies</h2>
          <p>Este site pode utilizar cookies para melhorar a experiência de navegação. Você pode configurar seu navegador para recusar cookies, embora isso possa limitar algumas funcionalidades do site.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">7. Contato</h2>
          <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo e-mail: <a href="mailto:atendimento@lsholdings.com.br" className="text-primary hover:underline">atendimento@lsholdings.com.br</a>.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">8. Atualizações</h2>
          <p>Esta política pode ser atualizada periodicamente. Recomendamos a consulta regular desta página para manter-se informado.</p>

          <p className="text-xs text-muted-foreground/60 mt-12">Última atualização: Março de 2026.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacidade;
