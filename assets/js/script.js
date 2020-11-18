$(document).ready(() => {
  // Save Button;
  $(".saveBtn").on("click", function () {
    // - Description & Time values;
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    // - Save to Local Storage;
    localStorage.setItem(time, text);
  });
});
