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
    const correctUsername = 'user_3145';
    const correctPassword = '3145';
    const correctCode = '137110';
    if (username === correctUsername && password === correctPassword && code === correctCode) {
        document.getElementById('claimMessage').innerHTML = `<span style="color: green;">Success! Your Product Key is: <strong>R46BX-JHR2J-PG7ER-24QFG-MWKVR</strong></span><br><p><i><small>Multiapp Enterprise Edition</small></i></p>`;
        document.getElementById('claimForm').style.display = 'none';
    } else {
        document.getElementById('claimMessage').innerHTML = `<span style="color: red;">Invalid credentials or code. Please try again.</span>`;
    }
});