var index = {
    form: {
        send: function (element, event) {
            event.preventDefault();

            var formName = element.name;
            var form = document.forms[formName];

            $.ajax({
                data: {
                    contact_form_name: form["contact-form-name"].value,
                    contact_form_email: form["contact-form-email"].value,
                    contact_form_phone: form["contact-form-phone"].value,
                    contact_form_query: form["contact-form-query"].value
                },
                type: "POST",
                url: "../php/sender.php",
                beforeSend: function (jqXHR, settings) {
                    form["submit"].disabled = true;
                },
                complete: function (jqXHR, textStatus) {
                    form["submit"].disabled = false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error("Hubo un problema al procesar su solicitud", "Error");
                },
                success: function (data, textStatus, jqXHR) {
                    toastr.success("Se envió su solicitud correctamente", "Éxito");
                }
            })

            return false;
        }
    }
}