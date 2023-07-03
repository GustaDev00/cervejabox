const newsletter = () => {
  const whatsappInput = document.querySelector(".newsletterNews input.whats");
  const form = document.querySelector(".newsletterNews");
  if (!form) return;

  whatsappInput.addEventListener("input", formatWhatsapp);

  function formatWhatsapp() {
    let value = whatsappInput.value;

    value = value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, "$1 $2-$3");
    }

    whatsappInput.value = value;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector(".newsletterNews input.email");
    const whats = document.querySelector(".newsletterNews input.whats");
    if (!email.value || !whats.value) return;

    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.vtex.ds.v10+json",
        "Content-Type": "application/json",
      },
      body: `{"email":"${email.value}","whats":"${whats.value}"}`,
    };

    fetch("/api/dataentities/WN/documents", options)
      .then((response) => response.json())
      .then((result) => {
        swal("Obrigado, seus dados foram salvos com sucesso!");
        form.reset();
      })
      .catch((error) => {
        swal("Ops, parece que algo deu errado");
        console.error("Erro ao enviar os dados para a API:", error);
      });
  });
};
export default newsletter;
