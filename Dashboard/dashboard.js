const firebaseConfig = {
    apiKey: "AIzaSyDisp6zGEeZxcleRiiBNTvmiPoJslANrT8",
    authDomain: "mini-hackthon-1b4f7.firebaseapp.com",
    projectId: "mini-hackthon-1b4f7",
    storageBucket: "mini-hackthon-1b4f7.appspot.com",
    messagingSenderId: "696214377099",
    appId: "1:696214377099:web:ffb837c760eca55f6cba8e"
  };


firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


  


var selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null) {
            // Insert new record to Firebase Firestore
            db.collection("Details").add(formData)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    displayData(); // Update displayed data
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        } else {
            // Update an existing record in Firebase Firestore
            db.collection("Details").doc(selectedRow.id).update(formData)
                .then(function () {
                    console.log("Document updated");
                    displayData(); // Update displayed data
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                });
        }
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["Timing"] = document.getElementById("Timing").value;
    formData["Schedule"] = document.getElementById("Schedule").value;
    formData["TeacherName"] = document.getElementById("TeacherName").value;
    formData["Section"] = document.getElementById("Section").value;
    formData["Course"] = document.getElementById("Course").value;
    formData["batch"] = document.getElementById("batch").value;

    return formData;
}

function resetForm() {
    document.getElementById("Timing").value = "";
    document.getElementById("Schedule").value = "";
    document.getElementById("TeacherName").value = "";
    document.getElementById("Section").value = "";
    document.getElementById("Course").value = "";
    document.getElementById("batch").value = "";

    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("Timing").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Schedule").value = selectedRow.cells[1].innerHTML;
    document.getElementById("TeacherName").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Section").value = selectedRow.cells[3].innerHTML;
    document.getElementById("Course").value = selectedRow.cells[4].innerHTML;
    document.getElementById("batch").value = selectedRow.cells[5].innerHTML;

}

function onDelete(td) {
    if (confirm('Are you sure to delete this record?')) {
        var row = td.parentElement.parentElement;
        db.collection("Details").doc(row.id).delete()
            .then(function () {
                console.log("Document deleted");
                displayData(); // Update displayed data
            })
            .catch(function (error) {
                console.error("Error deleting document: ", error);
            });
        resetForm();
    }
}

function validate() {
    var isValid = true;
    if (document.getElementById("fullName").value === "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

function displayData() {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    table.innerHTML = ""; // Clear existing table data

    db.collection("Details").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var newRow = table.insertRow(table.length);
            newRow.id = doc.id;
            newRow.insertCell(0).innerHTML = doc.data().Timing;
            newRow.insertCell(1).innerHTML = doc.data().Schedule;
            newRow.insertCell(2).innerHTML = doc.data().TeacherName;
            newRow.insertCell(3).innerHTML = doc.data().Section;
            newRow.insertCell(4).innerHTML = doc.data().Course;
            newRow.insertCell(5).innerHTML = doc.data().batch;
            newRow.insertCell(6).innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
        });
    }).catch(function (error) {
        console.error("Error getting documents: ", error);
    });
}

// Initial data retrieval
displayData();

function displayAttendanceData() {
    var table = document.getElementById("attendanceList").getElementsByTagName('tbody')[0];
    table.innerHTML = ""; // Clear existing table data

    db.collection("attendance").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var newRow = table.insertRow(table.length);
            newRow.id = doc.id;
            newRow.insertCell(0).innerHTML = doc.data().rollNumber;
            newRow.insertCell(1).innerHTML = doc.data().course;
            newRow.insertCell(2).innerHTML = doc.data().status;
            newRow.insertCell(3).innerHTML = new Date(doc.data().timestamp.toDate()).toLocaleString();
        });
    }).catch(function (error) {
        console.error("Error getting attendance data: ", error);
    });
}

// Initial data retrieval
displayAttendanceData();
