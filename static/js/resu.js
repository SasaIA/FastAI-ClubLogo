function previewFile(){
    var preview = document.getElementById('img'); 
    var file    = document.getElementById('uploaded').files[0]; 
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}
function updateimg(){
    url = document.getElementById('url').value;
    document.getElementById('img').src = url;
}
function chooseCallback(){
    var uploaded =  document.getElementById('uploaded').files[0];
    if(uploaded){
        doPostCallback(uploaded);
    } else {
        doGetCallback();
    }
}
function doPostCallback(uploaded){
    console.log(uploaded);
    fetch("/classify", {
        method: "POST",
        body: uploaded
    }).then(res => {
        return res.json().then(obj=> {
            console.log("deeep",obj);
            var top_prediction = obj.predictions[0][0];
            set_label(top_prediction);
        })
    });
}
function doGetCallback() {
    imgUrl = document.getElementById('url').value;
    var xmlhttp = new XMLHttpRequest();
    var url = "/classify?url=" + encodeURIComponent(imgUrl);
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
            var obj = JSON.parse(xmlhttp.responseText);
            var top_prediction = obj.predictions[0][0];
            console.log(obj);
            set_label(top_prediction);
            console.log("calling set label with", top_prediction);
            }
        }
    };
    xmlhttp.send(null);
}
function set_label(tp){
    console.log("running set label with", tp);
    document.getElementById('results').textContent = tp;
}