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

// Event listener for the "Mark Attendance" button
document.getElementById("markAttendance").addEventListener("click", () => {
  const course = document.getElementById("courseStatus").value;
  const rollNumber = document.getElementById("rollNumber").value;
  const attendanceStatus = document.getElementById("attendanceStatus").value;

  // Check if the attendance already exists for the same course and roll number
  db.collection("attendance")
    .where("course", "==", course)
    .where("rollNumber", "==", rollNumber)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        // Attendance doesn't exist, add it to Firestore
        db.collection("attendance").add({
          course,
          rollNumber,
          status: attendanceStatus,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          alert("Attendance marked successfully!");
        })
        .catch((error) => {
          console.error("Error adding attendance: ", error);
        });
      } else {
        // Attendance already exists
        alert("Please select all fields.");
      }
    })
    .catch((error) => {
      console.error("Error checking attendance: ", error);
    });
});


function displayUserAttendanceData() {
  var table = document.getElementById("userAttendanceList").getElementsByTagName('tbody')[0];
  table.innerHTML = ""; // Clear existing table data

  // Fetch attendance data for the logged-in user (you might need to identify the user)
  db.collection("attendance")
      .where("rollNumber", "==", "user_roll_number_here") // Replace with the user's roll number
      .get()
      .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
              var newRow = table.insertRow(table.length);
              newRow.id = doc.id;
              newRow.insertCell(0).innerHTML = doc.data().course;
              newRow.insertCell(1).innerHTML = doc.data().status;
              newRow.insertCell(2).innerHTML = new Date(doc.data().timestamp.toDate()).toLocaleString();
          });
      })
      .catch(function (error) {
          console.error("Error getting user attendance data: ", error);
      });
}

// Initial data retrieval
displayUserAttendanceData();
