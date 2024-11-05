"use client";
import { useState, useEffect } from "react";

function Privacidade({}) {
  return (
    <div className="text-gray-400 bg-gray-900 dark:bg-gray-800 mx-36 p-8 rounded-lg shadow-lg font-sans space-y-12">
      <h1 className="text-center text-4xl font-bold mb-12 border-b border-gray-700 pb-4">Política de Privacidade</h1>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">1. INFORMAÇÕES GERAIS</h2>
        <p>Na <strong>Xgirl.pt</strong>, temos um profundo compromisso com a sua privacidade e a transparência.</p>
        <p>
          Neste documento, apresentamos de forma detalhada como tratamos os seus dados pessoais e todas as informações relacionadas. Atuamos em conformidade com o <strong>REGULAMENTO (UE) 2016/679</strong>, de 27 de abril de 2016, que estabelece normas para a proteção das pessoas físicas no que diz respeito ao tratamento dos seus dados pessoais, assim como com a <strong>Lei Orgânica 3/2018</strong>, de 5 de dezembro, que trata da Proteção de Dados Pessoais e garante direitos digitais.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">2. INFORMAÇÕES BÁSICAS SOBRE PROTEÇÃO DE DADOS</h2>
        <p>
          <strong>Responsável pelo Tratamento:</strong> <strong>Xgirl.pt</strong><br />
          <strong>Finalidade do Tratamento:</strong> Gestão administrativa, contábil e tributária, além do envio de comunicações comerciais sobre nossos produtos e serviços.<br />
          <strong>Direitos:</strong> Você possui o direito de acessar, corrigir e excluir seus dados, além de outros direitos que podem ser consultados nas informações adicionais.<br />
          <strong>Origem dos Dados:</strong> Informações fornecidas diretamente pelo titular.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">3. IDENTIFICAÇÃO</h2>
        <p>
          <strong>Nome legal:</strong> Xgirl.pt, LDA.<br />
          <strong>NIF:</strong> 123456789<br />
          <strong>Endereço:</strong> Avenida da Liberdade, n.º 100, 4.º andar, Lisboa, Portugal.<br />
          <strong>E-mail de contato:</strong> info@xgirl.pt
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">4. COMUNICAÇÕES</h2>
        <p>
          Os meios de contato são:<br />
          <strong>Telefone:</strong> +351 910253456<br />
          <strong>E-mail:</strong> info@xgirl.pt
        </p>
        <p>Todas as comunicações entre o USUÁRIO e o PROPRIETÁRIO DO SITE serão consideradas válidas quando feitas por qualquer um dos meios mencionados acima.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">5. DIREITOS DOS TITULARES DE DADOS</h2>
        <p>Na <strong>Xgirl.pt</strong>, estamos comprometidos em proteger os direitos de privacidade e proteção de dados dos nossos usuários, conforme o Regulamento Geral de Proteção de Dados (RGPD). Esta política descreve os direitos que os indivíduos na União Europeia (UE) possuem em relação aos seus dados pessoais e os procedimentos que implementamos para facilitar o exercício desses direitos.</p>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li><strong>Direito de Acesso:</strong> Você tem o direito de saber se os seus dados pessoais estão sendo tratados.</li>
          <li><strong>Direito à Retificação:</strong> Você pode solicitar a correção de dados pessoais que sejam inexatos.</li>
          <li><strong>Direito ao Apagamento:</strong> Você tem o direito de solicitar a eliminação dos seus dados pessoais em determinadas situações.</li>
          <li><strong>Direito à Restrição do Tratamento:</strong> Você pode solicitar a limitação do tratamento dos seus dados.</li>
          <li><strong>Direito à Portabilidade dos Dados:</strong> Você tem o direito de receber seus dados pessoais em um formato estruturado e de uso comum.</li>
          <li><strong>Direito de Oposição:</strong> Você pode se opor ao tratamento dos seus dados pessoais com base em interesses legítimos.</li>
        </ul>
        <p>Todas as solicitações relacionadas aos direitos acima serão reconhecidas prontamente e tratadas dentro de 30 dias.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">6. CATEGORIAS DE DADOS PROCESSADOS</h2>
        <p>Os dados pessoais que processamos incluem:</p>
        <ul className="list-disc list-inside ml-6 space-y-2">
          <li>Dados de identificação</li>
          <li>Endereços postais e eletrônicos</li>
          <li>Informações comerciais</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">7. COMO OBTIVEMOS OS SEUS DADOS?</h2>
        <p>Os dados pessoais que processamos são fornecidos diretamente pela parte interessada.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">8. LEIS E LINKS RELEVANTES</h2>
        <p>
          <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679" className="text-blue-400">Regulamento Geral de Proteção de Dados (RGPD)</a><br />
          <a href="https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations_en" className="text-blue-400">Direitos dos cidadãos da UE no GDPR</a>
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">9. NOTA FINAL</h2>
        <p>Agradecemos a confiança depositada em nós ao fornecer seus dados pessoais e garantimos nosso compromisso em proteger sua privacidade conforme a legislação aplicável.</p>
      </section>
    </div>
  );
}

export default Privacidade;
