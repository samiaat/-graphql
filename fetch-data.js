/*async function fetchData() {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        // Handle case where token is not found (user is not authenticated)
        alert('Token not found. Please log in.');
        return;
    }

    try {
        // Fetch data from your GraphQL API endpoint
        const response = await fetch('https://zone01normandie.org/api/graphql-engine/v1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
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
                                path : amount
                            }
                            progressesByPath {
                                succeeded
                                count          
                                object {
                                    attrs
                                }
                            }
                            transactions(
                                order_by: { amount: desc }
                                limit: 1
                                where: { type: { _eq: "level" }, path: { _like: "/bahrain/bh-module%" } }
                                ) {
                                    amount
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
            // Display fetched data on the profile page
            const profileDataElement = document.getElementById('user-info');
            const profileheader = document.getElementById('welcome');
            const auditRatioElement = document.getElementById('auditRatio');
            const progressElement = document.getElementById('progress');

            const level = data.data.user[0].transactions[0].amount;

            // Extract and round the auditRatio
            const rawAuditRatio = data.data.user[0].auditRatio;
            const roundedAuditRatio = Math.round(rawAuditRatio * 10) / 10; // Round to 1 decimal place

            profileheader.innerHTML = `
                <h2>Welcome, ${data.data.user[0].login} !</h2>
            `;

            
            profileDataElement.innerHTML = `
                    <div class="profile-info">
                    <h3><span class="key">Email:</span> <span class="value">${data.data.user[0].email}</span></h3>
                    <h3><span class="key">First Name:</span> <span class="value">${data.data.user[0].firstName}</span></h3>
                    <h3><span class="key">Last Name:</span> <span class="value">${data.data.user[0].lastName}</span></h3>
                    <h3><span class="key">Campus:</span> <span class="value">${data.data.user[0].campus}</span></h3>
                    <h3><span class="key">From:</span> <span class="value">${data.data.user[0].attrs.addressCity}</span></h3>
                    </div>
            `;

            let passCount = 0;
            let failCount = 0;

            // Process data
            data.data.user[0].progressesByPath.forEach(project => {
                if (project.succeeded == true) { // if succeeded is true
                    passCount++; // its a pass
                } else {
                    failCount++; // otherwise, its a fail
                }
            });

            console.log('Pass count:', passCount);
            console.log('Fail count:', failCount);

            const totalCount = passCount + failCount; // calculate total count to calc the percentage
            const passPercentage = (passCount / totalCount) * 360;
            const failPercentage = (failCount / totalCount) * 360;

            console.log('Your current level:', level);

            const totalUp = data.data.user[0].totalUp || 0;  // XP gained
            const totalDown = data.data.user[0].totalDown || 0;  // XP spent

                     
            updateAuditRatio(roundedAuditRatio); // Use the function to update the ratio
            updateFailPassRatio(passCount, failCount);
            //updateSVGChart(passPercentage, failPercentage); // Update SVG chart with percentages
            updateProgress(level);
            updateXPChart(totalUp, totalDown);
            
        } else {
            // Handle error response from API
            alert('Error fetching data from API: ' + data.errors.join(", "));
        }
    } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error:', error);
        // alert('Error fetching data. Please try again later. ' + error);
    }

    //updateFailPassRatio(passCount, failCount);
}*/
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

                let passCount = 0;
                let failCount = 0;

                userData.progressesByPath.forEach(project => {
                    if (project.succeeded) passCount++;
                    else failCount++;
                });

                const totalCount = passCount + failCount;
                const passPercentage = (passCount / totalCount) * 360;
                const failPercentage = (failCount / totalCount) * 360;

                const totalUp = userData.totalUp || 0;
                const totalDown = userData.totalDown || 0;

                console.log('Pass count:', passCount);
                console.log('Fail count:', failCount);
                console.log('Level:', level);

                updateAuditRatio(roundedAuditRatio);
                updateFailPassRatio(passCount, failCount);
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