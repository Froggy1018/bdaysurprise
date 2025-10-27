/*
inputValue.addEventListener('submit', function (event){
    event.preventDefault();

    const inputValue = document.getElementById("input-field").value;
    const correctPassword=["Daria", "daria"];

    if (inputValue === correctPassword) {
        window.location.href = "messages.html";
    } else {
        window.location.href = "uhoh.html";
    }

})
*/

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input-field');
    const submitBtn = document.getElementById('submit');

    if (!input) return; // nothing to do if input isn't present

    // Single place that checks the password and redirects
    function checkPassword() {
        const val = input.value ? input.value.trim() : '';
        const expected = 'daria'; // change this value if you want a different password

        if (val.toLowerCase() === expected) {
            window.location.href = 'wishes.html';
        } else {
            window.location.href = 'uhoh.html';
        }
    }

    // Click on submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', function (e) {
            e.preventDefault();
            checkPassword();
        });
    }

    // Pressing Enter inside the input
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkPassword();
        }
    });
});