$(document).ready(function() {
    // create subnets
    var subnets = [];
    var sub10 = create10Subnet();
    var foundIPs = [];
    var foundIPsPort = []
    subnets.push(sub10);
    // run through all subnets
    var test = 0;
    subnets.forEach(function(subnet) {
        subnet.forEach(function(tip) {
            test++
            hit(tip, 80, function(ip) {
                foundIPs.push(ip);
                console.log("Found IPs: " + foundIPs);
                console.log("Searching for open ports")
                for (var i = 0; i <= 65535; i++) {
                    hit(tip, i, function(ip) {
                        foundIPsPort.push(ip);
                        console.log("Found open port:" + i);
                    });
                }
            });
        });
    });
    console.log("Tested: " + test + " IP's.");
});

function hit(ip, port, callback) {
    $.ajax({
        url: "http://" + ip + ":" + port,
        success: function() {
            return callback(ip) // found
        },
        error: function(request, error) {
            if (error != "timeout") {
                return callback(ip);
            }
        },
        timeout: 3000 // set timeout to 3 seconds
    }).then(function(data) {
       $('.greeting-id').append(data.id);
       $('.greeting-content').append(data.content);
    });
}

function create10Subnet() {
    var res = []
    for (var i = 0; i <= 8; i++) {
        for(var l = 1; l <= 255; l++) {
            res.push("10.0." + i + "." + l);
        }
    }
    console.log("created: " + res.length);
    return res;
}

function create172Subnet() {

}

function create192Subnet() {

}

function create169Subnet() {

}
