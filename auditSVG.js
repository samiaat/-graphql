// Function to update the audit ratio circle
function updateAuditRatio(auditRatio) {
    const circle = document.getElementById('circle');
    const auditNumber = document.getElementById('audit-number');

    console.log('auditNumber Element:', auditRatio); // Verify it's the correct element

    // Ensure the audit ratio is rounded to one decimal place
    const roundedRatio = Math.round(auditRatio * 10) / 10;

    // Calculate the stroke-dasharray value for the circle (audit ratio in percentage)
    const ratioPercentage = (auditRatio / 1) * 100;
    const strokeDasharrayValue = `${ratioPercentage}, 100`;

    // Update the SVG circle stroke-dasharray value
    circle.setAttribute('stroke-dasharray', strokeDasharrayValue);

    // Update the text inside the circle
    auditNumber.textContent = auditRatio >= 1 ? roundedRatio.toFixed(1) : roundedRatio;
  }

  // Example usage of updateAuditRatio function
    // You can replace this with the actual audit ratio fetched from your backend
  updateAuditRatio(auditRatio);