"use client";
import { useState } from "react";
import emailjs from "emailjs-com"; // Importando o EmailJS

function Contacto() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    const templateParams = {
      from_email: email,  // Certifique-se que o nome da variável no template do EmailJS é o mesmo
      subject: subject,
      message: message,
    };

    emailjs.send('service_dbp2kn8', 'template_hghiro9', templateParams, 'xinftXeZEUNtgiQHk')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Mensagem enviada com sucesso!');
        // Limpa os campos após envio
        setEmail("");
        setSubject("");
        setMessage("");
      }, (err) => {
        console.error('FAILED...', err);
        alert('Falha no envio da mensagem. Tente novamente mais tarde.');
      });
  };

  return (
    <div className="text-gray-200 bg-black p-10 rounded-lg shadow-lg font-sans mx-auto max-w-2xl space-y-12">
      <section className="bg-gray-900 dark:bg-gray-800 rounded-lg p-8">
        <div className="py-8 px-4">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-pink-800">
            Entre em Contato
          </h2>
          <p className="mb-8 lg:mb-12 font-light text-center text-gray-400 sm:text-xl">
            Tem alguma dúvida? Quer fazer uma reserva ou simplesmente enviar uma mensagem? Estamos aqui para ajudar!
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                Seu e-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
                placeholder="seuemail@exemplo.com"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">
                Assunto
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="block p-3 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 shadow-sm focus:ring-pink-500 focus:border-pink-500"
                placeholder="Como podemos ajudá-lo?"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
                Sua mensagem
              </label>
              <textarea
                id="message"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Deixe sua mensagem..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-pink-800 w-full hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contacto;
