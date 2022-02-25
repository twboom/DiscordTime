export function getTimeStamp(time, style) {
    time = new Date(time);
    time = Math.floor(time.getTime() / 1000)

    return `<t:${time}:${style}>`
};

export function getDiscordMessageContent(timestamp) {
    timestamp = timestamp.replace('<', '').replace('>', ''); // Filter out the brackets
    timestamp = timestamp.replace('t:', ''); // Filter out the leading indicator
    timestamp = timestamp.split(':'); // Split into components
    const { year, month, date, hours, minutes, seconds, monthName, dayName } = formatTime(new Date(parseInt(timestamp[0]) * 1000));
    let style = timestamp[1];
    if (style === undefined) { style = 'f' }; // Set default style if not declared

    if (style !== 'R') { // All absolute times
        let message;
        switch (style) {
            case 't':
                message = `${hours}:${minutes}`;
                break;

            case 'T':
                message = `${hours}:${minutes}:${seconds}`;
                break;
            
            case 'd':
                message = `${date}/${month}/${year}`;
                break;

            case 'D':
                message = `${date} ${monthName} ${year}`;
                break;

            case 'f':
                message = `${date} ${monthName} ${year} ${hours}:${minutes}`;
                break;

            case 'F':
                message = `${dayName}, ${date} ${monthName} ${year} ${hours}:${minutes}:${seconds}`;
        };

        const html = `<span id="d-timestamp">${message}</span>`;

        return html;
    } else if (style === 'R') { // Relative time
        const now = new Date();

        let message = 'Not yet implemented....'

        return message
    } else {
        return 'Something went wrong...'
    };
};

export function formatTime(inputDate) {
    const year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;
    if (month.toString().length === 1) { month = '0' + month };
    let date = inputDate.getDate();
    if (date.toString().length === 1) { date = '0' + date };
    let hours = inputDate.getHours();
    if (hours.toString().length === 1) { hours = '0' + hours };
    let minutes = inputDate.getMinutes();
    if (minutes.toString().length === 1) { minutes = '0' + minutes };
    let seconds = inputDate.getSeconds();
    if (seconds.toString().length === 1) { seconds = '0' + seconds };

    const monthName = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ][inputDate.getMonth()];

    const dayName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ][inputDate.getMonth()];

    return { year, month, date, hours, minutes, seconds, monthName, dayName };
};