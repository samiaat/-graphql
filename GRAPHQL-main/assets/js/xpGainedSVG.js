function updateXPChart(totalUpBytes, totalDownBytes) {
    
    const totalUpKB = (totalUpBytes / 1000).toFixed(2);
    const totalDownKB = (totalDownBytes / 1000).toFixed(2);
    console.log('Total Up KB:', totalUpKB);
    console.log('Total Down KB:', totalDownKB);

    const svgWidth = 400;
    const svgHeight = 200; 
    const barHeight = 40;
    const maxBarWidth = svgWidth - 100;  

   
    const totalXP = Math.max(totalUpKB, totalDownKB); 
    const upBarWidth = (totalUpKB / totalXP) * maxBarWidth;
    const downBarWidth = (totalDownKB / totalXP) * maxBarWidth;

    const svg = `
        <svg width="${svgWidth}" height="${svgHeight}">
            <!-- Indicator for XP Received -->
            <rect x="20" y="10" width="20" height="20" fill="#FFD700" />
            <text x="50" y="25" font-size="14" fill="whitesmoke">XP Received</text>

            <!-- Indicator for XP Given -->
            <rect x="20" y="40" width="20" height="20" fill="#b197fc" />
            <text x="50" y="55" font-size="14" fill="whitesmoke" font-color="whitesmoke">XP Given</text>

            <!-- XP Received Bar -->
            <rect x="50" y="80" width="${upBarWidth}" height="${barHeight}" fill="#FFD700" />
            <text x="${upBarWidth / 2 + 50}" y="105" font-size="14" text-anchor="middle" fill="grey">${totalUpKB} KB</text>

            <!-- XP Given Bar -->
            <rect x="50" y="140" width="${downBarWidth}" height="${barHeight}" fill="#b197fc" />
            <text x="${downBarWidth / 2 + 50}" y="165" font-size="14" text-anchor="middle" fill="grey">${totalDownKB} KB</text>
        </svg>
    `;

    document.getElementById('xp-reci').innerHTML = svg;
}
