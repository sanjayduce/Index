let leaveBalances = {
    casual: 5,
    medical: 10
};

document.getElementById("leave-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const leaveType = document.getElementById("leave-type").value;
    const leaveDays = parseInt(document.getElementById("leave-days").value);
    const messageElement = document.getElementById("message");

    // Check if enough leave days are available
    if (leaveDays > leaveBalances[leaveType]) {
        messageElement.textContent = `You do not have enough ${leaveType} leave days.`;
        messageElement.style.color = "#dc3545"; // Red color for error
        return;
    }

    // Deduct leave days
    leaveBalances[leaveType] -= leaveDays;
    updateLeaveBalanceDisplay();

    // Success message
    messageElement.textContent = `Leave applied successfully for ${leaveDays} ${leaveType} days.`;
    messageElement.style.color = "#28a745"; // Green color for success
});

function updateLeaveBalanceDisplay() {
    document.getElementById("casual-leave-balance").textContent = leaveBalances.casual;
    document.getElementById("medical-leave-balance").textContent = leaveBalances.medical;
}
