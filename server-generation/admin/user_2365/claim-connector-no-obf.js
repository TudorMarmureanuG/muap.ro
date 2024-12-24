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
    const correctUsername = 'user_2365';
    const correctPassword = '2365';
    const correctCode = '582091';
    if (username === correctUsername && password === correctPassword && code === correctCode) {
        document.getElementById('claimMessage').innerHTML = `<span style="color: green;">Success! Your Product Key is: <strong>TP0KB-RE34R-ADR7P-OJ9LS-F7KHY</strong></span><br><p><i><small>Multiapp Standard Edition</small></i></p>`;
        document.getElementById('claimForm').style.display = 'none';
    } else {
        document.getElementById('claimMessage').innerHTML = `<span style="color: red;">Invalid credentials or code. Please try again.</span>`;
    }
});