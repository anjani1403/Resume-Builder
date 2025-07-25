function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return false;
    }

    updateResumePreview();
    document.getElementById('resumePreview').style.display = 'block';
    document.getElementById('resumePreview').scrollIntoView({ behavior: 'smooth' });

    return false;
}

function validateForm() {
    
    const requiredFields = [
        'fullName',
        'email',
        'phone',
        'address',
        'skills',
        'hobbies'
    ];

    for (const field of requiredFields) {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            element.focus();
            return false;
        }
    }

   
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

   
    const phone = document.getElementById('phone').value;
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }

   
    const educationEntries = document.querySelectorAll('.education-entry');
    for (const entry of educationEntries) {
        const inputs = entry.querySelectorAll('input');
        for (const input of inputs) {
            if (!input.value.trim()) {
                alert('Please fill in all education fields');
                input.focus();
                return false;
            }
        }
    }


    const photo = document.getElementById('photo');
    if (!photo.files || photo.files.length === 0) {
        alert('Please select a photo');
        return false;
    }

    return true;
}


function addEducation() {
    const educationFields = document.getElementById('educationFields');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <input type="text" class="degree" placeholder="Degree/Certificate" required>
        <input type="text" class="institution" placeholder="Institution" required>
        <input type="number" class="year" placeholder="Year of Completion" 
               min="1900" max="2024" required>
        <input type="text" class="grade" placeholder="Grade/Percentage" required>
        <button type="button" onclick="removeEducation(this)">Remove</button>
    `;
    educationFields.appendChild(newEntry);
}

function removeEducation(button) {
    button.parentElement.remove();
}


document.getElementById('photo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photoPreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});


function updateResumePreview() {
    
    document.getElementById('previewName').textContent = 
        document.getElementById('fullName').value;
    document.getElementById('previewEmail').textContent = 
        document.getElementById('email').value;
    document.getElementById('previewPhone').textContent = 
        document.getElementById('phone').value;
    document.getElementById('previewAddress').textContent = 
        document.getElementById('address').value;

    
    const photoFile = document.getElementById('photo').files[0];
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('resumePhoto').src = e.target.result;
        };
        reader.readAsDataURL(photoFile);
    }

    
    const educationContainer = document.getElementById('previewEducation');
    educationContainer.innerHTML = '';
    document.querySelectorAll('.education-entry').forEach(entry => {
        const degree = entry.querySelector('.degree').value;
        const institution = entry.querySelector('.institution').value;
        const year = entry.querySelector('.year').value;
        const grade = entry.querySelector('.grade').value;

        const educationElement = document.createElement('div');
        educationElement.className = 'education-item';
        educationElement.innerHTML = `
            <h4>${degree}</h4>
            <p>${institution} | ${year}</p>
            <p>Grade: ${grade}</p>
        `;
        educationContainer.appendChild(educationElement);
    });

    
    const skillsContainer = document.getElementById('previewSkills');
    const skills = document.getElementById('skills').value.split(',')
        .map(skill => skill.trim())
        .filter(skill => skill);
    skillsContainer.innerHTML = `
        <ul>
            ${skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;


    const hobbiesContainer = document.getElementById('previewHobbies');
    const hobbies = document.getElementById('hobbies').value.split(',')
        .map(hobby => hobby.trim())
        .filter(hobby => hobby);
    hobbiesContainer.innerHTML = `
        <ul>
            ${hobbies.map(hobby => `<li>${hobby}</li>`).join('')}
        </ul>
    `;
}

function previewResume() {
    
    const name = document.getElementById('previewName').textContent;
    const email = document.getElementById('previewEmail').textContent;
    const phone = document.getElementById('previewPhone').textContent;
    const address = document.getElementById('previewAddress').textContent;
    const photoSrc = document.getElementById('resumePhoto').src;

    const educationItems = Array.from(document.querySelectorAll('#previewEducation .education-item')).map(item => {
        return `<div class="education-item">${item.innerHTML}</div>`;
    }).join('');

    const skillsItems = Array.from(document.querySelectorAll('#previewSkills ul li')).map(item => {
        return `<li>${item.textContent}</li>`;
    }).join('');

    const hobbiesItems = Array.from(document.querySelectorAll('#previewHobbies ul li')).map(item => {
        return `<li>${item.textContent}</li>`;
    }).join('');

    const resumeHTML = `
        <html>
        <head>
            <title>Resume Preview</title>
            <style>
                body { 
                    font-family: 'Poppins', sans-serif; 
                    margin: 0; 
                    padding: 20px; 
                    color: #333; 
                    background: #f7f9fb; 
                }
                h1, h2, h3 { color: #2c3e50; }
                h1 { text-align: center; color: #2c3e50; text-decoration: underline; margin-bottom: 30px; }
                
                .resume-container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                }

                .resume-header {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    margin-bottom: 30px;
                }

                .photo-container {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 3px solid #3498db;
                }

                .photo-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .personal-info {
                    flex: 1;
                }

                .personal-info h2 {
                    font-size: 1.8em;
                    margin-bottom: 5px;
                    color: #4a5331;
                }

                .personal-info p {
                    font-size: 1em;
                    margin: 5px 0;
                }

                .resume-section {
                    margin-bottom: 20px;
                }

                .resume-section h3 {
                    font-size: 1.5em;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 5px;
                    margin-bottom: 15px;
                }

                .education-item {
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    background: #f9fafc;
                }

                ul {
                    padding: 0;
                    list-style-type: none;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                li {
                    background: #e0f7fa;
                    padding: 8px 12px;
                    border-radius: 20px;
                    font-size: 0.9em;
                    color: #2c3e50;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 600px) {
                    .resume-header {
                        flex-direction: column;
                        align-items: center;
                    }

                    .photo-container {
                        margin-bottom: 15px;
                    }

                    .personal-info {
                        text-align: center;
                    }
                }
            </style>
        </head>
        <body>
            <div class="resume-container">
                <h1>Professional Resume</h1>
                <div class="resume-header">
                    <div class="photo-container">
                        <img src="${photoSrc}" alt="Profile Photo">
                    </div>
                    <div class="personal-info">
                        <h2>${name}</h2>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Address:</strong> ${address}</p>
                    </div>
                </div>
                
                <div class="resume-section">
                    <h3>Education</h3>
                    ${educationItems}
                </div>

                <div class="resume-section">
                    <h3>Skills</h3>
                    <ul>${skillsItems}</ul>
                </div>

                <div class="resume-section">
                    <h3>Hobbies</h3>
                    <ul>${hobbiesItems}</ul>
                </div>
            </div>
        </body>
        </html>
    `;

    // Open a new window and write the content
    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(resumeHTML);
    newWindow.document.close();
}

