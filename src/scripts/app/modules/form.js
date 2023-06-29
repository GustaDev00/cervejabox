const FormB2B = () => {
  console.log("teste 123");

  return $(".b2b_form").on("submit", function (e) {
    e.preventDefault();
    var t;
    $(this);
    1 == document.querySelector(".b2b_form").checkValidity() &&
      ((t = {
        b2b_trading_name: $("#b2b_trading_name").val(),
        b2b_company_name: $("#b2b_company_name").val(),
        b2b_company_cnpj: $("#b2b_company_cnpj").val(),
        b2b_company_cnae: $("#b2b_company_cnae").val(),
        b2b_company_state_registration: $(
          "#b2b_company_state_registration"
        ).val(),
        b2b_company_kind_of_business: $("#b2b_company_kind_of_business").val(),
        b2b_company_website: $("#b2b_company_website").val(),
        b2b_company_cep: $("#b2b_company_cep").val(),
        b2b_company_address_number: $("#b2b_company_address_number").val(),
        b2b_company_address: $("#b2b_company_address").val(),
        b2b_company_address_complement: $(
          "#b2b_company_address_complement"
        ).val(),
        b2b_company_address_neighborhood: $(
          "#b2b_company_address_neighborhood"
        ).val(),
        b2b_company_address_state: $("#b2b_company_address_state").val(),
        b2b_company_address_city: $("#b2b_company_address_city").val(),
        b2b_company_address_reference: $(
          "#b2b_company_address_reference"
        ).val(),
        b2b_company_main_contact_name: $(
          "#b2b_company_main_contact_name"
        ).val(),
        b2b_company_main_contact_email: $(
          "#b2b_company_main_contact_email"
        ).val(),
        b2b_company_main_contact_cellphone: $(
          "#b2b_company_main_contact_cellphone"
        ).val(),
        b2b_company_main_contact_comercial_phone: $(
          "#b2b_company_main_contact_comercial_phone"
        ).val(),
        b2b_company_main_contact_comercial_role: $(
          "#b2b_company_main_contact_comercial_role"
        ).val(),
        b2b_company_main_contact_newsletter: $(
          "#b2b_company_main_contact_newsletter"
        ).is(":checked"),
      }),
      $.ajax({
        headers: {
          Accept: "application/vnd.vtex.ds.v10+json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(t),
        type: "PATCH",
        url: "/api/dataentities/CB/documents/",
        success: function () {
          swal("Obrigado por nos contactar, entraremos em contato em breve.");
        },
        error: function (e) {
          console.log(e),
            swal("Algo deu errado, por favor, tente novamente mais tarde.");
        },
      }));
  });
};
export default FormB2B;
