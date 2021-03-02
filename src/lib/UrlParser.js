function filterValue(v) {
    return v.split('#')[0]
}

export default function requestParams() {
    const result = {};
    const href = decodeURI(document.location.href);    
    const paramStartPos = href.indexOf('?');
    if (paramStartPos < 0) {
        return result;
    }
    const params = href.substring(paramStartPos + 1).split('&');
    params.map(p => {
        const args = p.split('=');
        if (args.length == 2) {
            result[args[0]] = filterValue(args[1]);
        }
    });
    return result;
}