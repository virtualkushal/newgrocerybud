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

    if (nameValue === "") {
      swal("Error!", "Item cannot be empty!", "error");
      return;
    }

    // UPDATE MODE
    if (editIndex !== null) {
      allRegData[editIndex].name = nameValue;
      editIndex = null;

      submitBtn.text("Submit");
      swal("Updated!", "Item updated successfully!", "success");
    }
    // ADD MODE
    else {
      allRegData.push({
        name: nameValue,
      });

      swal("Added!", "New item added successfully!", "success");
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

  
  // DELETE ITEM
  
  $(document).on("click", ".delete-btn", function () {
    let index = $(this).data("index");

    allRegData.splice(index, 1);

    localStorage.setItem("allRegData", JSON.stringify(allRegData));

    swal("Deleted!", "Item removed successfully!", "warning");

    getRegData();
  });

  
  // EDIT ITEM
  
  $(document).on("click", ".edit-btn", function () {
    editIndex = $(this).data("index");

    // Put value inside input
    nameInput.val(allRegData[editIndex].name);

    // Change button text
    submitBtn.text("Update");

    // Show Modal
    modal.show();
  });

  
  // INITIAL LOAD
  
  getRegData();

});
