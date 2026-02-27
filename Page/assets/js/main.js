/* ============================================================
   FUNÇÃO PARA CARREGAR PARTES DO SITE (HEADER/FOOTER)
   ============================================================ */
   async function carregarParte(idDoElemento) {
    const espacoOndeVaiOConteudo = document.querySelector(idDoElemento);
    
    // Se não achar o lugar no HTML, para a função aqui
    if (espacoOndeVaiOConteudo == null) {
      return;
    }
  
    // Pega o link que está escrito no HTML (data-partial)
    const linkDoArquivo = espacoOndeVaiOConteudo.getAttribute("data-partial");
  
    try {
      // Faz a requisição para o arquivo
      const resposta = await fetch(linkDoArquivo);
      
      // Se der erro no link (404), avisa no console
      if (resposta.ok == false) {
        console.log("Erro ao carregar: " + linkDoArquivo);
        return;
      }
  
      // Transforma a resposta em texto/html
      const textoHtml = await resposta.text();
      espacoOndeVaiOConteudo.innerHTML = textoHtml;
  
      // --- Coisas específicas que acontecem DEPOIS de carregar ---
      
      // Se for o rodapé, precisamos colocar o ano atual
      if (idDoElemento == "#site-footer") {
        const espacoAno = document.querySelector("#year");
        if (espacoAno) {
          espacoAno.textContent = "2026"; // Colocando o ano direto
        }
        // Chama a função da newsletter que criamos abaixo
        configurarNewsletter();
      }
    } catch (erro) {
      console.error("Deu algum erro estranho: " + erro);
    }
  }
  
  /* ============================================================
     CONFIGURAÇÃO DA NEWSLETTER
     ============================================================ */
  function configurarNewsletter() {
    const formularioNl = document.querySelector("#newsletter-form");
    const campoEmail = document.querySelector("#nl-email");
    const textoAviso = document.querySelector("#nl-feedback");
  
    if (formularioNl) {
      formularioNl.addEventListener("submit", function(event) {
        event.preventDefault(); // Não deixa a página recarregar
  
        if (campoEmail.value == "") {
          textoAviso.textContent = "Digite um e-mail!";
        } else {
          textoAviso.textContent = "Sucesso! Enviado. ✅";
          campoEmail.value = ""; // Limpa o campo
        }
      });
    }
  }
  
  /* ============================================================
     BOTÃO DE ALERTA (AÇÃO GLOBAL)
     ============================================================ */
  function configurarBotoes() {
    const botoes = document.querySelectorAll("[data-action='mostrar-alerta']");
    
    for (let i = 0; i < botoes.length; i++) {
      botoes[i].addEventListener("click", function() {
        alert("Obrigado por visitar nossa Landing Page! 🎉");
      });
    }
  }
  
  /* ============================================================
     FORMULÁRIO DE CONTATO
     ============================================================ */
  function configurarContato() {
    const formContato = document.querySelector("#contato-form");
    const avisoContato = document.querySelector("#contato-feedback");
  
    if (formContato) {
      formContato.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Pega os valores um por um
        const nome = document.querySelector("#nome").value;
        const email = document.querySelector("#email").value;
        const msg = document.querySelector("#mensagem").value;
  
        if (nome == "" || email == "" || msg == "") {
          avisoContato.textContent = "Preencha tudo, por favor.";
        } else {
          avisoContato.textContent = "Mensagem enviada! ✉️";
          formContato.reset();
        }
      });
    }
  }
  
  /* ============================================================
     O "BOOT" (INÍCIO DE TUDO)
     ============================================================ */
  // Quando a página carregar...
  window.onload = async function() {
    // Carrega as partes uma por uma
    await carregarParte("#site-header");
    await carregarParte("#site-footer");
  
    // Depois que carregou tudo, ativa os botões e formulários
    configurarBotoes();
    configurarContato();
  };