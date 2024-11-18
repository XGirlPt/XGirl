"use client";
import { useState } from "react";
import emailjs from "emailjs-com"; // Importando o EmailJS
import Image from "next/image";

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
    <div className="text-gray-200 bg-gray-900  mt-6 rounded-lg shadow-lg w-full max-w-xl mx-auto px-4 py-6 font-sans space-y-4">
      <section className="bg-gray-800 rounded-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-pink-800 mb-4">Contato</h1>
        <h2 className="text-sm font-light text-center text-gray-400 mb-6">
          Tem alguma dúvida? Envie-nos uma mensagem e responderemos em até 24 horas.
        </h2>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Seu e-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2"
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
              className="block p-2 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 shadow-sm focus:ring-pink-500 focus:border-pink-500"
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
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-2 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Deixe sua mensagem..."
              required
            ></textarea>
          </div>
  
          <button
            type="submit"
            className="py-2 md:py-3 text-sm font-medium text-center text-white rounded-lg bg-pink-800 w-full hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300"
          >
            Enviar Mensagem
          </button>
        </form>
  
        <p className="mt-6 text-center text-gray-400 text-sm">
          Obrigado por entrar em contato com a XGirl.pt!
        </p>
      </section>
    </div>
  );
  

}

export default Contacto;
