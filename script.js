function loadTabe() {
    const tbody = document.getElementById("tbody");
    fetch("php/display.php")
        .then((response) => response.json())
        .then((data) => {
            var tr = '';
            if (data['empty']) {
                tr += `<tr><td style = 'color: red; font-weight: bold; font-size: 1.5rem' colspan = '8' align = 'center'>No Records Found</td></tr>`;
            } else {
                for (var i in data) {
                    tr += `<tr style = 'overflow: hidden;'><td align = 'center' class  = 'row'>${data[i].rollno}</td>
                                        <td align = 'center' class  = 'row'>${data[i].name}</td>
                                        <td align = 'center' class  = 'row'>${data[i].mobileno}</td>
                                        <td align = 'center' class  = 'row'>${data[i].course}</td>
                                        <td align = 'center'class  = 'row'>${data[i].semester}</td>
                                        <td align = 'center'class  = 'row'>${data[i].email}</td>
                                        <td align = 'center' class  = 'row'><button type="button" class = 'edit' id="Edit_btn" style = 'display: flex;' onclick = "modify('${data[i].rollno}', '${data[i].name}', '${data[i].mobileno}', '${data[i].course}', '${data[i].semester}', '${data[i].email}')"><i class="bi bi-pencil-square" style = 'margin-right: 3px;font-size: medium'></i>Edit</button></td>
                                        <td align = 'center' class  = 'row'><button type="button" class = 'delete' id="del_btn" style = 'display: flex;' onclick = "del('${data[i].rollno}')"><i class="bi bi-trash-fill" style = 'margin-right: 3px;font-size: medium'></i>Delete</button></td></tr>`;
                }
                tbody.innerHTML = tr;
            }
        })
}

loadTabe();

function insert() {
    const rollno = document.getElementById("rollno").value;
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobileno").value;
    const course = document.getElementById("course").value;
    const semester = document.getElementById("semester").value;
    const email = document.getElementById("email").value;

    if (rollno === '' || name === '' || mobile === '' || course === '' || semester === '' || email === '') {
        alert("Please Fill All Fields");
    } else {
        var formdata = {
            "rollno": rollno,
            "name": name,
            "mobileno": mobile,
            "course": course,
            "semester": semester,
            "email": email
        }
        var jsondata = JSON.stringify(formdata);
        fetch("php/insert.php", {
            method: "POST",
            body: jsondata,
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.insert === 'success') {
                    alert("Data Inserted Successfully");
                    loadTabe();
                } else {
                    alert("Data Not Inserted Successfully");
                    loadTabe();
                }
            })
            .catch(() => alert("Can't Insert Data"))
    }
}

function modify(rollno, name, mobile, course, semester, email) {
    document.getElementById("edit").style.display = "flex";

    document.getElementById("upd_rollno").value = rollno;
    document.getElementById("upd_name").value = name;
    document.getElementById("upd_mobileno").value = mobile;
    document.getElementById("upd_course").value = course;
    document.getElementById("upd_semester").value = semester;
    document.getElementById("upd_email").value = email;

    document.getElementById("close_btn").addEventListener("click", () => {
        document.getElementById("edit").style.display = "none";
    })
}

function update() {
    const rollno = document.getElementById("upd_rollno").value;
    const name = document.getElementById("upd_name").value;
    const mobile = document.getElementById("upd_mobileno").value;
    const course = document.getElementById("upd_course").value;
    const semester = document.getElementById("upd_semester").value;
    const email = document.getElementById("upd_email").value;

    if (rollno === '' || name === '' || mobile === '' || course === '' || semester === '' || email === '') {
        alert("Please Fill All Fields");
    } else {
        var formdata = {
            "rollno": rollno,
            "name": name,
            "mobileno": mobile,
            "course": course,
            "semester": semester,
            "email": email
        }
        var jsondata = JSON.stringify(formdata);
        fetch("php/update.php", {
            method: "PUT",
            body: jsondata,
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.update === 'success') {
                    alert("Data Updated Successfully");
                    document.getElementById("edit").style.display = "none";
                    loadTabe();
                } else {
                    alert("Data Not Updated Successfully");
                    document.getElementById("edit").style.display = "none";
                    loadTabe();
                }
            })
            .catch(() => alert("Can't Update Data"))
    }
}

function del(rollno) {
    fetch("php/delete.php?del=" + rollno, {
        method: "DELETE"
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.Delete === 'success') {
                alert("Data Deleted Successfully");
                loadTabe();
            } else {
                alert("Data Not Deleted Successfully");
                loadTabe();
            }
        })
        .catch(() => {
            alert("Can't Delete Data");
        })
}

function search() {
    var search = document.getElementById("search").value;
    const tbody = document.getElementById("tbody");
    fetch("php/search.php?search=" + search)
        .then((response) => response.json())
        .then((data) => {
            var tr = '';
            if (data['empty']) {
                tr += `<tr><td style = 'color: red; font-weight: bold; font-size: 1.5rem' colspan = '8' align = 'center'>No Records Found</td></tr>`;
            } else {
                for (var i in data) {
                    tr += `<tr><td align = 'center' class  = 'row'>${data[i].rollno}</td>
                                        <td align = 'center' class  = 'row'>${data[i].name}</td>
                                        <td align = 'center' class  = 'row'>${data[i].mobileno}</td>
                                        <td align = 'center' class  = 'row'>${data[i].course}</td>
                                        <td align = 'center'class  = 'row'>${data[i].semester}</td>
                                        <td align = 'center'class  = 'row'>${data[i].email}</td>
                                        <td align = 'center' class  = 'row'><button type="button" class = 'edit' id="Edit_btn" style = 'display: flex;' onclick = "modify('${data[i].rollno}', '${data[i].name}', '${data[i].mobileno}', '${data[i].course}', '${data[i].semester}', '${data[i].email}')"><i class="bi bi-pencil-square" style = 'margin-right: 3px;font-size: medium'></i>Edit</button></td>
                                        <td align = 'center' class  = 'row'><button type="button" class = 'delete' id="del_btn" style = 'display: flex;' onclick = "del('${data[i].rollno}')"><i class="bi bi-trash-fill" style = 'margin-right: 3px;font-size: medium'></i>Delete</button></td></tr>`;
                }
                tbody.innerHTML = tr;
            }
        })
}

function generatePDF() {
    const table = document.getElementById("student-table");

    html2pdf()
        .from(table)
        .set({
            margin: 1,
            filename: 'Student_List.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save();
}
