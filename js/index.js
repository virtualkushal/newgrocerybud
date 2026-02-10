$(document).ready(function () {

  // VARIABLES
  let allRegData = JSON.parse(localStorage.getItem("allRegData")) || [];
  let editIndex = null;

  // Form & Input
  let regForm = $(".register-form");
  let nameInput = regForm.find("input");

  // Table Body
  let regList = $(".reg-list");

  // Submit Button
  let submitBtn = regForm.find("button[type='submit']");

  // Modal
  let modal = new bootstrap.Modal(document.getElementById("myModal"));

  // SHOW DATA FUNCTION
  function getRegData() {
    regList.html("");

    $.each(allRegData, function (index, data) {
      regList.append(`
        <tr>
          <td>${index + 1}</td>
          <td class="item-name">${data.name}</td>
          <td>
            <button class="edit-btn btn btn-sm btn-primary" data-index="${index}">
              Edit
            </button>

            <button class="delete-btn btn btn-sm btn-danger" data-index="${index}">
              Delete
            </button>
          </td>
        </tr>
      `);
    });

    localStorage.setItem("allRegData", JSON.stringify(allRegData));
  }

  // ADD / UPDATE ITEM
  regForm.submit(function (e) {
    e.preventDefault();

    let nameValue = nameInput.val().trim().toUpperCase();

    // Only empty error swal
    if (nameValue === "") {
      swal("Error!", "Item cannot be empty!", "error");
      return;
    }

    // UPDATE MODE
    if (editIndex !== null) {
      allRegData[editIndex].name = nameValue;
      editIndex = null;
      submitBtn.text("Submit");
    }
    // ADD MODE
    else {
      allRegData.push({
        name: nameValue,
      });
    }

    // Save Data
    localStorage.setItem("allRegData", JSON.stringify(allRegData));

    // Reset Form
    regForm[0].reset();

    // Close Modal
    modal.hide();

    // Refresh Table
    getRegData();
  });

  // DELETE SINGLE ITEM (No swal)
  $(document).on("click", ".delete-btn", function () {
    let index = $(this).data("index");

    allRegData.splice(index, 1);

    localStorage.setItem("allRegData", JSON.stringify(allRegData));

    getRegData();
  });

  // Delete All Items (Only swal here)
  $("#clearAllBtn").click(function () {

    if (allRegData.length === 0) return;

    swal({
      title: "Delete All Items?",
      text: "This will clear your entire grocery list!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        allRegData = [];
        localStorage.removeItem("allRegData");
        getRegData();
      }
    });

  });

  // EDIT ITEM
  $(document).on("click", ".edit-btn", function () {
    editIndex = $(this).data("index");

    nameInput.val(allRegData[editIndex].name);

    submitBtn.text("Update");

    modal.show();
  });

  // INITIAL LOAD
  getRegData();

});
