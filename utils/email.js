const emails = await weeklyNotification.map(email => {
    return {
        email: email.userEmail,
        plantName: email.plantName
    }
})
console.log(emails)