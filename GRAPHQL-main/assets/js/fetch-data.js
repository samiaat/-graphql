
async function fetchData() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Token not found. Please log in.');
        return;
    }

    try {
        const response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: `
                    query {
  user {
    campus
    login
    email
    firstName
    lastName
    auditRatio
    totalUp
    totalDown
    xps {
      path: amount
    }
    progressesByPath {
      succeeded
      count
      object {
        attrs
      }
    }
    transactions(
      where: { type: { _eq: "level" } }
      order_by: { amount: desc }
      limit: 1
    ) {
      amount
      createdAt
      path
    }
    attrs
  }
}

                `,
            }),
        });

        const data = await response.json();
        console.log('GraphQL response data:', data);

        if (response.ok && !data.errors) {
            const userData = data.data.user[0];

            if (userData) {
                const level = userData.transactions[0]?.amount || 'N/A';
                console.log(userData.transactions[0])               
                const rawAuditRatio = userData.auditRatio || 0;
                const roundedAuditRatio = Math.round(rawAuditRatio * 10) / 10;

                const profileDataElement = document.getElementById('user-info');
                const profileheader = document.getElementById('welcome');
                const auditRatioElement = document.getElementById('auditRatio');
                const progressElement = document.getElementById('progress');

                profileheader.innerHTML = `<h2>Welcome, ${userData.login} !</h2>`;
                profileDataElement.innerHTML = `
                    <div class="profile-info">
                        <h3><span class="key">Email:</span> <span class="value">${userData.email}</span></h3>
                        <h3><span class="key">First Name:</span> <span class="value">${userData.firstName}</span></h3>
                        <h3><span class="key">Last Name:</span> <span class="value">${userData.lastName}</span></h3>
                        <h3><span class="key">Campus:</span> <span class="value">${userData.campus}</span></h3>
                    </div>
                `;
                const totalUp = userData.totalUp || 0;
                const totalDown = userData.totalDown || 0;

                console.log('Level:', level);
                updateAuditRatio(roundedAuditRatio);
                updateProgress(level);
                updateXPChart(totalUp, totalDown);
            } else {
                console.error('No user data found');
                alert('No user data found.');
            }
        } else {
            alert('Error fetching data from API: ' + (data.errors ? data.errors.join(", ") : 'Unknown error'));
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


// Call fetchData function when the profile page loads
fetchData();