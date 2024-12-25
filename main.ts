// Declare the global html2pdf function to avoid TypeScript errors
declare const html2pdf: any;

// Function to add education entry dynamically
function addEducation() {
    const container = document.getElementById('education-entries') as HTMLDivElement;
    const entry = document.createElement('div');
    entry.className = 'input-group';
    entry.innerHTML = `
        <input type="text" placeholder="Degree" required />
        <input type="text" placeholder="Institution" required />
        <input type="text" placeholder="Graduation Year" required />
        <button onclick="this.parentElement.remove()">Remove</button>
    `;
    container.appendChild(entry);
}

// Function to add work experience entry dynamically
function addWork() {
    const container = document.getElementById('work-entries') as HTMLDivElement;
    const entry = document.createElement('div');
    entry.className = 'input-group';
    entry.innerHTML = `
        <input type="text" placeholder="Job Title" required />
        <input type="text" placeholder="Company" required />
        <input type="text" placeholder="Duration" required />
        <button onclick="this.parentElement.remove()">Remove</button>
    `;
    container.appendChild(entry);
}

// Function to add skills dynamically
function addSkill() {
    const skillInput = document.getElementById('skill-input') as HTMLInputElement;
    const skillsContainer = document.getElementById('skills-container') as HTMLDivElement;

    if (skillInput.value.trim()) {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            ${skillInput.value}
            <button onclick="this.parentElement.remove()">×</button>
        `;
        skillsContainer.appendChild(skillTag);
        skillInput.value = ''; // Clear input after adding
    }
}

// Function to toggle skills section visibility
function toggleSkillsVisibility() {
    const skillsSection = document.querySelector('.section:last-of-type') as HTMLDivElement;
    skillsSection.style.display = skillsSection.style.display === 'none' ? 'block' : 'none';
}

// Function to generate resume
function generateResume() {
    // Collect Personal Information
    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const city = (document.getElementById('city') as HTMLInputElement).value.trim();

    // Collect Education
    const educationEntries = Array.from(
        document.querySelectorAll('#education-entries .input-group input:nth-child(1)')
    ).map(input => (input as HTMLInputElement).value);

    // Collect Work Experience
    const workEntries = Array.from(
        document.querySelectorAll('#work-entries .input-group input:nth-child(1)')
    ).map(input => (input as HTMLInputElement).value);

    // Collect Skills
    const skills = Array.from(
        document.querySelectorAll('#skills-container .skill-tag')
    ).map(skill => skill.textContent?.replace('×', '').trim());

    // Collect Social Media
    const linkedin = (document.getElementById('linkedin') as HTMLInputElement).value.trim();
    const facebook = (document.getElementById('facebook') as HTMLInputElement).value.trim();
    const instagram = (document.getElementById('instagram') as HTMLInputElement).value.trim();

    // Validate required fields
    if (!name || !email || !phone || !city) {
        alert('Please fill in all required personal information fields');
        return;
    }

    // Generate Preview
    const previewName = document.getElementById('preview-name') as HTMLElement;
    const previewEmail = document.getElementById('preview-email') as HTMLElement;
    const previewPhone = document.getElementById('preview-phone') as HTMLElement;
    const previewCity = document.getElementById('preview-city') as HTMLElement;
    const previewEducation = document.getElementById('preview-education') as HTMLElement;
    const previewWork = document.getElementById('preview-work') as HTMLElement;
    const previewSkills = document.getElementById('preview-skills') as HTMLElement;
    const socialLinks = document.querySelector('.social-links') as HTMLElement;
    const resumePreview = document.getElementById('resume-preview') as HTMLDivElement;
    const formContainer = document.getElementById('form-container') as HTMLDivElement;

    // Clear previous content
    previewEducation.innerHTML = '';
    previewWork.innerHTML = '';
    previewSkills.innerHTML = '';
    socialLinks.innerHTML = '';

    // Populate Personal Info
    previewName.textContent = name;
    previewEmail.textContent = `Email: ${email}`;
    previewPhone.textContent = `Phone: ${phone}`;
    previewCity.textContent = `City: ${city}`;

    // Populate Education
    educationEntries.forEach(education => {
        const educationItem = document.createElement('p');
        educationItem.textContent = education;
        previewEducation.appendChild(educationItem);
    });

    // Populate Work Experience
    workEntries.forEach(work => {
        const workItem = document.createElement('p');
        workItem.textContent = work;
        previewWork.appendChild(workItem);
    });

    // Populate Skills
    skills?.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill?.toString() || null;
        previewSkills.appendChild(skillTag);
    });

    // Populate Social Media Links
    const socialMediaLinks = [
        { platform: 'LinkedIn', url: linkedin, icon: 'fab fa-linkedin',  },
        { platform: 'Facebook', url: facebook, icon: 'fab fa-facebook' },
        { platform: 'Instagram', url: instagram, icon: 'fab fa-instagram' }
    ];

    socialMediaLinks.forEach(social => {
        if (social.url) {
            const link = document.createElement('a');
            link.href = social.url;
            link.target = '_blank';
            const icon = document.createElement('i');
            icon.className = social.icon;
            link.appendChild(icon);
            socialLinks.appendChild(link);
        }
    });

    // Show Preview and Hide Form
    resumePreview.style.display = 'block';
    formContainer.style.display = 'none';
}

// Function to edit resume (return to form)
function editResume() {
    const resumePreview = document.getElementById('resume-preview') as HTMLDivElement;
    const formContainer = document.getElementById('form-container') as HTMLDivElement;

    resumePreview.style.display = 'none';
    formContainer.style.display = 'block';
}

// Function to download resume as PDF
function downloadResume() {
    const resumePreview = document.getElementById('resume-preview') as HTMLDivElement;
    html2pdf().from(resumePreview).save('resume.pdf');
}

// Function to get shareable link (placeholder implementation)
function getShareableLink() {
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    if (!email) {
        alert('Please enter an email to generate a shareable link');
        return;
    }

    const shareableURL = `${window.location.origin}${window.location.pathname}?email=${encodeURIComponent(email)}`;

    // Copy to clipboard
    navigator.clipboard.writeText(shareableURL).then(() => {
        alert('Shareable link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy link: ', err);
        prompt('Copy this link:', shareableURL);
    });
}

// Event listener for page load to handle prefilling from URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    if (email) {
        console.log('Shareable link accessed with email:', email);
    }
});