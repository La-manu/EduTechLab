
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");
  const msgFeedback = document.getElementById("msgFeedback");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // **IMPEDIR QUE A PÁGINA RECARREGUE**

    const dadosForm = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      mensagem: document.getElementById("mensagem").value
    };

    try {
      const res = await fetch("http://127.0.0.1:3000/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosForm)
      });

      const data = await res.json();

      // Mostrar mensagem de sucesso
      msgFeedback.textContent = data.message || "Formulário enviado com sucesso!";
      msgFeedback.className = "sucesso";
      msgFeedback.style.display = "block";

      // Rolar para a mensagem
      msgFeedback.scrollIntoView({ behavior: "smooth", block: "start" });

      form.reset();

      // Mensagem fica visível por 10 segundos
      setTimeout(() => { msgFeedback.style.display = "none"; }, 10000);

    } catch (err) {
      console.error(err);
      msgFeedback.textContent = "Erro ao enviar formulário.";
      msgFeedback.className = "erro";
      msgFeedback.style.display = "block";
      msgFeedback.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { msgFeedback.style.display = "none"; }, 10000);
    }
  });
});