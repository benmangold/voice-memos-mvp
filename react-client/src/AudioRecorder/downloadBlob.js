// trigger a browser file download of binary data
import axios from 'axios';

export default function downloadBlob(blob, filename) {
    var url = window.URL.createObjectURL(blob);
    var click = document.createEvent('Event');
    // click.initEvent('click', true, true);
    var link = document.createElement('A');
    link.href = url;
    link.download = filename;
    // link.dispatchEvent(click);
    // link.click();
    // debugger;

    
    var myBlob = new Blob(["This is my blob content"], {type : "text/plain"});
    console.log(blob);
    
    // here unnecessary - just for testing if it can be read from local storage
    // localStorage.myfile = myBlob;
    
    var fd = new FormData();
    fd.append('upl', blob, 'blobby.wav');
    
    fetch('/memos/blob',
    {
        method: 'post',
        body: fd
    }); 


    // let data = new FormData();
    // data.append('file', blob);
    
    // // debugger;
    
    // // post blob to server 
    // axios.post('/memos/blob', {data: data, enctype: 'multipart/form-data'}).then((response) => {
    //     console.log('Successful Post!')
    //   }).catch((error) => {
    //     console.log('Error Posting')
    //     console.log(error)
    //   })
    

    return link;
}
