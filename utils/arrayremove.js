const  arrayRemove = function(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}
module.exports = arrayRemove;