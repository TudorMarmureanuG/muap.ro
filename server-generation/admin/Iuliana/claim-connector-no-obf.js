function openClaimModal() {
    document.getElementById('claimModal').style.display = 'block';
    document.getElementById('claimMessage').innerText = '';
    document.getElementById('claimForm').reset();
}
function closeClaimModal() {
    document.getElementById('claimModal').style.display = 'none';
}
document.getElementById('claimForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const code = document.getElementById('code').value.trim();
    const correctUsername = 'suport_it';
    const correctPassword = 'dedeman';
    const correctCode = '794551';
    if (username === correctUsername && password === correctPassword && code === correctCode) {
        document.getElementById('claimMessage').innerHTML = `<span style="color: green;">Success! Your Product Key is: <strong>NO67B-REG4W-A26PR-LS1F1-DRM67</strong></span><br><p><i><small>Multiapp Enterprise Edition</small></i></p>`;
        document.getElementById('claimForm').style.display = 'none';
    } else {
        document.getElementById('claimMessage').innerHTML = `<span style="color: red;">Invalid credentials or code. Please try again.</span>`;
    }
});