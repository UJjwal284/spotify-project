export async function getData(endpoint, method, body) {
    const token = 'BQCxphuwLk6uChqhlFJJyg6in3Dnmeu7gBVzaeqOE7YbCEqqpLZwQZmz4hB84RbUWY9USfF96GQPb6oFu9dUPEtZqI-yNwNXLABESvTSAyG2imRBxf2-MWCDQo2y-twPSDH0SivWn6YvckQMTeJAcjiO5P_u2iUx5LIhurIf5g9Yt-j1IN-aOcYzvDy6NIuCp3XPvs3b23neFyAmB_Jt7H807aBdsj4eGbUSIUsQQuf1vo1G2DJ6Mfls3_YO8IVfHdJWukIhURvOSxAT65S0euX4EhcqDOn1nTVUGgf7J9X4wma2emkqtzzUARD9p2ZZPOdkFaXRCla7e-lhXdY1Rtod-TyaRH3lu4K-71mHeHq9F4I';
    return await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }, method, body: JSON.stringify(body)
    })
}