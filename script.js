// ========== 1. Carrossel de Imagens com Fade Suave ==========
let slideIndex = 0;
let slides;

function showSlides() {
  slides.forEach((slide, index) => {
    slide.style.opacity = (index === slideIndex) ? "1" : "0";
  });
  slideIndex = (slideIndex + 1) % slides.length;
}

window.addEventListener("load", () => {
 const isMobile = window.innerWidth <= 768;
slides = document.querySelectorAll(`.slide.${isMobile ? "mobile" : "desktop"}`);

  slides.forEach((slide, i) => {
    slide.style.position = "absolute";
    slide.style.top = 0;
    slide.style.left = 0;
    slide.style.width = "100%";
    slide.style.height = "300px";
    slide.style.transition = "opacity 1s ease-in-out";
    slide.style.opacity = (i === 0) ? "1" : "0";
  });

  setInterval(showSlides, 3000);
});

// ========== 3. Pop-up "Faça já seu pedido!" ==========
function abrirPedido() {
  alert("Faça já o seu pedido! 😍");
  document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
}

// ========== 5. Botão "Voltar ao Topo" ==========
const btnTopo = document.getElementById("btnTopo");
window.addEventListener("scroll", () => {
  btnTopo.style.display = window.scrollY > 200 ? "block" : "none";
});
btnTopo?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========== 7. Filtro de Produtos ==========
function filtrarCategoria(categoria) {
  const produtos = document.querySelectorAll(".doce");
  produtos.forEach(produto => {
    produto.classList.remove("oculto");
    if (categoria !== "todos" && !produto.classList.contains(categoria)) {
      produto.classList.add("oculto");
    }
  });
}

// ========== Carrinho de Compras Simples ==========
let carrinho = [];

// Adiciona sabores ao carrinho com nome + sabores
function adicionarSabores(produto, containerId) {
  const checkboxes = document.querySelectorAll(`#${containerId} input[type='checkbox']:checked`);
  const sabores = Array.from(checkboxes).map(cb => cb.value);

  if (sabores.length === 0) {
    alert("Selecione pelo menos um sabor.");
    return;
  }

  // Monta o nome formatado: Produto (Sabor1, Sabor2...)
  const entrada = `${produto} (${sabores.join(", ")})`;

  // Adiciona ao carrinho
  carrinho.push(entrada);

  // Atualiza visualmente o campo (textarea ou input)
  const campoProdutos = document.getElementById("produtosSelecionados");
  if (campoProdutos) {
    campoProdutos.value = carrinho.join("\n");
  }

  alert(`🛒 Adicionado ao carrinho: ${entrada}`);
}

  // Rola suavemente até a seção de pedido, se desejar:
  // document.getElementById("contato").scrollIntoView({ behavior: "smooth" });

// ========== 13. Alerta de envio de formulário ==========
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContato");
  if (form) form.addEventListener("submit", validarFormulario);
});

function enviarParaWhatsApp() {
  const nome = document.getElementById('nome').value.trim();
  const produtos = document.getElementById('produtosSelecionados').value.trim();
  const detalhes = document.getElementById('pedido').value.trim();

  if (!nome || !produtos) {
    alert("Por favor, preencha seu nome e selecione ao menos um produto.");
    return;
  }

  const mensagem = `🍰 *Pedido Lindo Doce* 🍰\n\n👩 Nome: ${nome}\n\n🧁 Produtos:\n${produtos}\n\n📌 Detalhes adicionais:\n${detalhes || "Nenhum"}`;

  const numeroWhatsApp = "5588982348793"; // Substitua pelo seu número com DDI + DDD
  const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

function copiarEIrParaInstagram() {
  const nome = document.getElementById('nome').value.trim();
  const produtos = document.getElementById('produtosSelecionados').value.trim();
  const detalhes = document.getElementById('pedido').value.trim();

  if (!nome || !produtos) {
    alert("Por favor, preencha seu nome e selecione ao menos um produto.");
    return;
  }

  const mensagem = `🍰 *Pedido Lindo Doce* 🍰\n\n👩 Nome: ${nome}\n\n🧁 Produtos:\n${produtos}\n\n📌 Detalhes adicionais:\n${detalhes || "Nenhum"}`;

  // Copia a mensagem para a área de transferência
  navigator.clipboard.writeText(mensagem)
    .then(() => {
      alert("Mensagem copiada! Agora você será redirecionado para o Instagram.");
      const usuarioInstagram = "lorany.sza"; // sem @
      window.open(`https://instagram.com/${usuarioInstagram}`, "_blank");
    })
    .catch(err => {
      alert("Erro ao copiar a mensagem. Tente manualmente.");
      console.error(err);
    });
}