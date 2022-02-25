import { formatTime, getDiscordMessageContent, getTimeStamp } from "./parser.js";

const datetime = document.getElementById('datetime');
const style = document.getElementById('style');
const output = document.getElementById('output');
const preview = document.getElementById('d-message-content');

const session = {};

function handleInput() {
    const timeStamp = getTimeStamp(datetime.value, style.value);
    session.timeStamp = timeStamp;
    output.innerText = timeStamp
    preview.innerHTML = getDiscordMessageContent(timeStamp);
};

function copyToClipbord() {
    if (!navigator.clipboard) {
        return
    };

    navigator.clipboard.writeText(session.timeStamp)
        .then(_ => { console.log('Copied to clipboard') }, err => { console.error('Could not copy to clipboard', err) });
};

// Main function
function main() {
    const now = formatTime(new Date());

    let datetimeString = `${now.year}-${now.month}-${now.date}`;
    datetimeString += 'T';
    datetimeString += `${now.hours}:${now.minutes}:${now.seconds}`

    datetime.value = datetimeString;

    document.getElementById('d-time-component').innerText = `${now.hours}:${now.minutes}`
    
    datetime.addEventListener('input', handleInput);
    style.addEventListener('input', handleInput);
    handleInput();

    document.getElementById('copy').addEventListener('click', copyToClipbord);
};

main();