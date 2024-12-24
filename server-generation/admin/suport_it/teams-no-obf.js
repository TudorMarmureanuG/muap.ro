const teamMembers = [
    {
        name: "Tudor Marmureanu",
        status: "Online",
        image: "./images/profile-2.jpeg"
    },
    {
        name: "WickedKey_194",
        status: "Offline",
        image: "./images/profile-3.jpg"
    },
    {
        name: "Block_Chain",
        status: "Offline",
        image: "./images/profile-4.jpg"
    }
];

// Funcție pentru a genera structura HTML
function generateTeamStatus() {
    const container = document.getElementById('team-status');

    teamMembers.forEach(member => {
        // Crearea div-ului pentru fiecare membru
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('IDD');

        // Crearea elementului pentru imaginea de profil
        const profilePhotoDiv = document.createElement('div');
        profilePhotoDiv.classList.add('profile-photo');
        const img = document.createElement('img');
        img.src = member.image;
        img.alt = member.name;
        profilePhotoDiv.appendChild(img);

        // Crearea div-ului pentru informații
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');

        const nameElement = document.createElement('h3');
        nameElement.textContent = member.name;

        const statusElement = document.createElement('small');
        statusElement.classList.add('text-muted');
        statusElement.textContent = member.status;

        infoDiv.appendChild(nameElement);
        infoDiv.appendChild(statusElement);

        // Adăugarea imaginii și a informațiilor în div-ul principal
        memberDiv.appendChild(profilePhotoDiv);
        memberDiv.appendChild(infoDiv);

        // Adăugarea div-ului membrului în container
        container.appendChild(memberDiv);
    });
}

// Apelarea funcției pentru a genera conținutul
generateTeamStatus();