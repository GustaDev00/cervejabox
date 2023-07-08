import VMasker from "vanilla-masker";
const newsletter = () => {
  const whatsappInput = document.querySelector(".newsletterNews input.whats");
  const form = document.querySelector(".newsletterNews");
  if (!form) return;

  VMasker(whatsappInput).maskPattern("(99) 99999-9999");

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
