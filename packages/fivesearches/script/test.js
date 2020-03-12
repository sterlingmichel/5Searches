var something = {
    send_request: function (data, callback) { // analogue of chrome.extension.sendRequest
        var request = document.createTextNode(JSON.stringify(data));

        request.addEventListener("something-response", function (event) {
            request.parentNode.removeChild(request);

            if (callback) {
                var response = JSON.parse(request.nodeValue);
                callback(response);
            }
        }, false);

        document.head.appendChild(request);

        var event = document.createEvent("HTMLEvents");
        event.initEvent("something-query", true, false);
        request.dispatchEvent(event);
    },
    callback: function (response) {
        return alert("response: " + (response ? response.toSource() : response));
    }
};




//var readyStateCheckInterval = setInterval(function () {
//    if (document.readyState === "complete") {
//        clearInterval(readyStateCheckInterval);
//        something.send_request("THis is now...", something.callback);
//        console.warn(1111);
//    } 
//}, 10);





var plugins = navigator.plugins;

//console.log("===", plugins);