// Load Dom before running Jquery
$(function() {
  // Variables
  var icons = $(".icons");
  var basicInfoButton = $(".basic-info-next-button");
  var namePattern = new RegExp("^[a-zA-Z' .-]{1,50}$");
  var emailPattern = new RegExp("^[a-zA-Z0-9._-]*[@][a-zA-Z]*.[a-zA-Z]{2,6}$");

  var name_val_err = "untouched";

  // variable to store email validation errors
  var email_val_err = "untouched";
  var date_val_err = "untouched";

  var studentName = $("#student-name");
  var studentEmail = $("#student-email");
  var studyBeforeRadioButton = $("input:radio[name=study-before-radio]");
  var studySelectBox = $(".studyselectbox");
  var basicinfoCheckBox = $(".basic-info-check");
  var applyCheckBox = $(
    "body > section.main-content > div > div > div.col-md-3 > div.apply > div > label > input"
  );
  var firstPagestudentInfo = $(".student-info");
  var secondPageForm = $(".secondPageForm");
  var thirdPageForm = $(".thirdPageForm");
  var secondpageSelectInfoBox = $(".selectcourse-info");
  var stepInfo = $(".step-info");
  var firstPageWarning = $(".firstPageWarning");

  var date_input = $("#date");
  var course_select_box = document.getElementById("course-select-box");

  course_select_box.addEventListener("change", function(e) {
    //console.log(e.currentTarget.value);
    $("#select-course-check").click();
  });

  // HIDE ALL element
  icons.hide();
  studySelectBox.hide();
  secondPageForm.hide();
  thirdPageForm.hide();
  secondpageSelectInfoBox.hide();
  firstPageWarning.hide();

  // Validation
  // studentName.on("keyup", validation);
  studentName.on("blur", validation);
  // studentName.on("keyup", test_student_name);
  // studentEmail.on("keyup", emailValidation);
  studentEmail.on("blur", emailValidation);

  function validation() {
    // console.log(this.value);
    if (namePattern.test(this.value)) {
      $(".ok-icon").show();
      $(".error-icon").hide();
      name_val_err = "";
    } else {
      $(".error-icon").show();
      name_val_err = "error";
    }
  }

  function emailValidation() {
    if (emailPattern.test(this.value)) {
      $(".email-ok-icon").show();
      $(".email-error-icon").hide();
      email_val_err = "";
    } else {
      $(".email-error-icon").show();
      email_val_err = "error";
    }
  }

  studyBeforeRadioButton.on("change", function() {
    if ($(this).val() === "yes") {
      studySelectBox.show();
    }
    if ($(this).val() === "no") {
      studySelectBox.hide();
    }
  });

  basicInfoButton.on("click", progress);

  function progress(e) {
    if (
      email_val_err === "error" ||
      email_val_err === "untouched" ||
      name_val_err === "untouched" ||
      name_val_err === "error" ||
      date_val_err === "untouched" ||
      date_val_err === "error"
    ) {
      e.preventDefault();
      firstPageWarning.show();
      //console.log(totalErrors);
    } else {
      e.preventDefault();
      firstPagestudentInfo.hide();
      secondPageForm.show();
      stepInfo.hide();
      secondpageSelectInfoBox.show();
      applyCheckBox.click();
    }
  }

  $(".secondPagePrevious").on("click", function(e) {
    e.preventDefault();
    firstPagestudentInfo.show();
    secondPageForm.hide();
    stepInfo.show();
    secondpageSelectInfoBox.hide();
    $(".finish").removeClass("color-red-border");
  });

  $(".secondPageNext").on("click", function(e) {
    e.preventDefault();
    secondpageSelectInfoBox.hide();
    secondPageForm.hide();
    thirdPageForm.show();
    $(".info-heading").hide();
    $(".finish").addClass("color-red-border");
  });

  $(".thirdPagePrevious").on("click", function(e) {
    e.preventDefault();
    thirdPageForm.hide();
    secondPageForm.show();
    $(".info-heading").show();
    secondpageSelectInfoBox.show();
  });

  date_input.datepicker({
    onSelect: function(dateText, inst) {
      //console.log(dateText);
      if (dateText === "") {
        date_val_err = "error";
      } else {
        date_val_err = "";
      }
    }
  });
  // Datepick function using jquery UI
  $("#date").datepicker();

  // mobile menu functionality
  $(".mobile-menu").on("click", function() {
    $(".menubar-mobile").slideToggle();
  });
});
