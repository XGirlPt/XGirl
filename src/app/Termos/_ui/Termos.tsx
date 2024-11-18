"use client";
import { useState, useEffect } from "react";

function Termos({}) {
  return (
    <div className="text-gray-200 bg-gray-800 mx-4 my-10 md:mt-20 md:mx-auto max-w-5xl p-8 rounded-lg shadow-2xl font-sans space-y-12">
      {/* Título principal */}
      <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-100 mb-12 border-b-4 border-gray-600 pb-4">
        Termos e Condições Gerais de Uso e Aviso Legal
      </h1>

      {/* Seções */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          1. OBJETO
        </h2>
        <p className="leading-relaxed text-gray-300">
          Este aviso legal regula o uso do site XGirl.pt, propriedade de XGirl, LDA.
        </p>
        <p className="leading-relaxed text-gray-300">
          O acesso e a navegação no site atribuem automaticamente a condição de USUÁRIO e implicam a aceitação plena e sem reservas de todos os termos e condições publicadas neste aviso legal. O PROPRIETÁRIO DO SITE pode modificar estas condições sem prévio aviso, sendo as alterações publicadas e notificadas assim que possível.
        </p>
        <p className="leading-relaxed text-gray-300">
          Recomenda-se que o USUÁRIO leia atentamente este conteúdo antes de usar os serviços e informações disponibilizados pelo site.
        </p>
        <p className="leading-relaxed text-gray-300">
          O USUÁRIO compromete-se a utilizar o site em conformidade com as leis, boa-fé, ordem pública, práticas de mercado e este Aviso Legal, sendo responsável perante o PROPRIETÁRIO DO SITE ou terceiros por quaisquer danos decorrentes do não cumprimento dessa obrigação.
        </p>
        <p className="leading-relaxed text-gray-300">
          Qualquer uso não autorizado pode resultar na suspensão do acesso e uso do site.
        </p>
      </section>

      {/* Seção 2 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          2. IDENTIFICAÇÃO
        </h2>
        <p className="leading-relaxed text-gray-300">
          <strong className="text-gray-200">Nome legal:</strong> XGirl.pt, LDA.<br />
          <strong className="text-gray-200">NIF:</strong> 123456789<br />
          <strong className="text-gray-200">Endereço:</strong> Rua da Liberdade, 123, 1.º andar, Bairro Central, Lisboa, Portugal.<br />
          <strong className="text-gray-200">E-mail de contato:</strong> info@xgirl.pt
        </p>
      </section>

      {/* Seção 3 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          3. COMUNICAÇÕES
        </h2>
        <p className="leading-relaxed text-gray-300">
          Os meios de contato são:<br />
          <strong className="text-gray-200">Telefone:</strong> +351 910253456<br />
          <strong className="text-gray-200">E-mail:</strong> info@xgirl.pt
        </p>
        <p className="leading-relaxed text-gray-300">
          Todas as comunicações entre USUÁRIO e PROPRIETÁRIO DO SITE serão consideradas válidas quando feitas por qualquer um dos meios mencionados acima.
        </p>
      </section>

      {/* Seção 4 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          4. CONDIÇÕES DE ACESSO E USO
        </h2>
        <p className="leading-relaxed text-gray-300">
          O acesso ao site e aos seus serviços é gratuito. No entanto, alguns serviços podem exigir o preenchimento prévio de formulários de registro.
        </p>
        <p className="leading-relaxed text-gray-300">
          O USUÁRIO declara que todas as informações fornecidas são verdadeiras e autênticas, sendo o único responsável por qualquer informação falsa ou imprecisa.
        </p>
        <p className="leading-relaxed text-gray-300">
          O USUÁRIO compromete-se a utilizar de forma adequada os conteúdos e serviços do site, abstendo-se de:
        </p>
        <ul className="list-disc list-inside ml-6 text-gray-300 space-y-2">
          <li>Divulgar conteúdos que sejam ilegais, violentos, pornográficos, discriminatórios ou contrários à lei e à ordem pública.</li>
          <li>Inserir vírus ou programas que possam danificar os sistemas do site ou de terceiros.</li>
          <li>Tentar acessar áreas restritas dos sistemas do site ou de terceiros e extrair dados não autorizados.</li>
          <li>Violar direitos de propriedade intelectual ou industrial.</li>
          <li>Usurpar a identidade de outros usuários.</li>
          <li>Distribuir, reproduzir ou modificar conteúdos sem autorização expressa.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">4.1 RESTRIÇÕES DE IDADE</h2>
        <p>O site XGirl.pt destina-se exclusivamente a maiores de 18 anos. É expressamente proibido o acesso e uso do site por menores. O PROPRIETÁRIO DO SITE reserva-se o direito de solicitar documentos de identificação para verificar a idade dos usuários e poderá bloquear ou remover perfis que não comprovem a maioridade.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">4.2 LIMITAÇÃO DE RESPONSABILIDADE</h2>
        <p>O conteúdo do site tem caráter informativo e não garante acesso ininterrupto ou livre de erros. O PROPRIETÁRIO DO SITE não se responsabiliza por:</p>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li>Falta de acesso ao site ou precisão dos conteúdos.</li>
          <li>Presença de vírus ou elementos prejudiciais.</li>
          <li>Uso incorreto do site por parte dos usuários.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">4.3 PROCEDIMENTOS EM CASO DE ATIVIDADES ILÍCITAS</h2>
        <p>Caso algum USUÁRIO ou terceiro perceba atividades ilegais no site, deve informar o PROPRIETÁRIO DO SITE por meio de uma notificação específica, identificando-se adequadamente.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">4.4 POLÍTICA DE PUBLICAÇÃO E CONTROLE</h2>
        <p>Para atender aos regulamentos de sistemas de pagamento e segurança, a idade dos usuários que publicam conteúdo no site é verificada. Publicações serão revisadas (24-72 horas) e, caso necessário, o usuário deverá comprovar sua maioridade por meio de documentos (RG, passaporte, CNH).</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">4.5 MOTIVOS PARA CANCELAMENTO DE CONTA</h2>
        <p>O PROPRIETÁRIO DO SITE poderá cancelar a conta de um usuário por:</p>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li>Comportamento inadequado.</li>
          <li>Publicação de conteúdo proibido (como menores de idade, violência, drogas, etc.).</li>
          <li>Solicitação do próprio usuário.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">5. PROPRIEDADE INTELECTUAL E INDUSTRIAL</h2>
        <p>Os direitos de propriedade intelectual e industrial do site XGirl.pt e de seus conteúdos pertencem ao PROPRIETÁRIO DO SITE. É proibida a reprodução, distribuição e uso dos conteúdos para fins comerciais sem autorização prévia.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">6. AÇÕES LEGAIS, LEGISLAÇÃO APLICÁVEL E JURISDIÇÃO</h2>
        <p>
          O PROPRIETÁRIO DO SITE reserva-se o direito de tomar as ações legais apropriadas pelo uso indevido do site. As relações entre o usuário e o provedor serão regidas pelas leis portuguesas. Qualquer disputa será submetida aos tribunais competentes de Lisboa, Portugal.
        </p>
        <p>Nota Final: Recomenda-se que os usuários respeitem as políticas e procedimentos descritos para garantir uma experiência segura e respeitosa.</p>
      </section>
    </div>
  );
}

export default Termos;
