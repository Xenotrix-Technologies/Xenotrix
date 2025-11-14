$("#contact-form").on("submit", function (e) {
  e.preventDefault();

  $(".loading").show();
  $(".sent-message").hide();
  $(".error-message").hide();

  $.ajax({
    url: "https://xenotrix.in/forms/contact.php",
    type: "POST",
    data: $(this).serialize(),
    success: function (response) {
      $(".loading").hide();

      if (response.trim() === "success") {
        $(".sent-message").fadeIn();
        $("#contact-form")[0].reset();
      } else {
        $(".error-message").fadeIn().text(response);
      }
    },
    error: function () {
      $(".loading").hide();
      $(".error-message").fadeIn().text("Server error. Check PHP file.");
    }
  });
});
