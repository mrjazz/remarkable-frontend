// function search(text, highlights) {
//     return text.split(new RegExp(highlights.split(' ').join('|'), 'g')).reduce((res, cur,x) => {        
//         return res ? res + x + cur : cur;
//     }, '');
// }

function closerText(text, parts, starts) {
    return parts
        .map(p => [text.indexOf(p, starts), p])
        .filter(p => p[0] > 0)
        .sort((a, b) => a[0] - b[0]);
}

export default function search(text, highlights, fn) {
    const parts = highlights.split(' ');
    let startPos = 0;
    let counter = 0;
    while (true) {
        const res = closerText(text, parts, startPos);
        if (res.length == 0) {
            break;
        }
        const found = res[0];
        const replaceStr = fn(found[1], ++counter);        
        startPos = found[0] + replaceStr.length;
        text = text.substr(0, found[0]) + replaceStr + text.substr(found[0] + found[1].length);
    }
    return text;
}

// console.log(closerText('acbde', ['b', 'c']))
// console.log(search('abbcd aa bbb cc', 'bb cc', (s, i) => `<span id="${i}">${s}</span>`));