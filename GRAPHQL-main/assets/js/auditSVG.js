// Function to update the audit ratio circle
function updateAuditRatio(auditRatio) {
    const circle = document.getElementById('circle');
    const auditNumber = document.getElementById('audit-number');
    const auditText = document.getElementById('audit-text');

    const roundedRatio = Math.round(auditRatio * 10) / 10;

    const ratioPercentage = (auditRatio / 1) * 100;
    const strokeDasharrayValue = `${ratioPercentage}, 100`;
    circle.setAttribute('stroke-dasharray', strokeDasharrayValue);

    
    auditNumber.textContent = auditRatio >= 1 ? roundedRatio.toFixed(1) : roundedRatio;
    if (auditRatio < 1) {
      auditText.style.display = 'block';
    } else {
      auditText.style.display = 'none';
    }
  }

  