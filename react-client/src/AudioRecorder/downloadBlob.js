// trigger a browser file download of binary data
import axios from 'axios';

export default function downloadBlob(blob, filename) {
    var url = window.URL.createObjectURL(blob);
    // var click = document.createEvent('Event');
    // click.initEvent('click', true, true);
    var link = document.createElement('A');
    link.href = url;
    // link.download = filename;
    // link.dispatchEvent(click);
    // link.click();

    var fd = new FormData();
    fd.append('upl', blob, 'blobby.wav');
    
    fetch('/memos/blob', { method: 'post', body: fd })

    return link;
}
