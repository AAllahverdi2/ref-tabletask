document.getElementById('fileInput').addEventListener('change', handleFileUpload);
document.getElementById('saveButton').addEventListener('click', saveDataToServer);

class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}

let persons = [];

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            processFileContent(text);
        };
        reader.readAsText(file);
    }
}

function processFileContent(text) {
    const lines = text.split('\n');
    lines.forEach(line => {
        const [firstName, lastName, age] = line.split(',');
        if (firstName && lastName && age) {
            const person = new Person();
            Reflect.set(person, 'firstName', firstName.trim());
            Reflect.set(person, 'lastName', lastName.trim());
            Reflect.set(person, 'age', parseInt(age.trim()));
            persons.push(person);
        }
    });
    updateTable();
}

function updateTable() {
    const tableBody = document.getElementById('dataTable').querySelector('tbody');
    tableBody.innerHTML = '';
    persons.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${person.firstName}</td><td>${person.lastName}</td><td>${person.age}</td>`;
        tableBody.appendChild(row);
    });
    document.getElementById('saveButton').style.display = persons.length > 0 ? 'block' : 'none';
}

function saveDataToServer() {
    fetch('http://localhost:3000/persons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persons)
    }).then(response => {
        if (response.ok) {
            alert('gonderildi');
            persons = [];
            updateTable();
        } else {
            alert('jsona gonderilemedi');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('jsona gonderilemedi');
    });
}

function testPostRequest() {
    fetch('http://localhost:3000/persons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: 'Test',
            lastName: 'User',
            age: 99
        })
    }).then(response => {
        if (response.ok) {
            alert('jsona gonderildi');
        } else {
            alert('jsona gonderilemedi');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('jsona gonderilemedi');
    });
}

