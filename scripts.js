var dictName = "words_alpha/words_alpha.txt";
function g(x){
	return document.getElementById(x);
}
window.onerror = function (message, url, lineNo){
    alert('Error: ' + message + '\n' + 'Line Number: ' + lineNo);
    return true;
};
function permutations(array, r) {                                                  
    // Algorythm copied from Python `itertools.permutations`.                      
    var n = array.length;                                                          
    if (r === undefined) {                                                         
        r = n;                                                                     
    }                                                                              
    if (r > n) {                                                                   
        return;                                                                    
    }                                                                              
    var indices = [];                                                              
    for (var i = 0; i < n; i++) {                                                  
        indices.push(i);                                                           
    }                                                                              
    var cycles = [];                                                               
    for (var i = n; i > n - r; i-- ) {                                             
        cycles.push(i);                                                            
    }                                                                              
    var results = [];                                                              
    var res = [];                                                                  
    for (var k = 0; k < r; k++) {                                                  
        res.push(array[indices[k]]);                                               
    }                                                                              
    results.push(res);                                                             
                                                                                   
    var broken = false;                                                            
    while (n > 0) {                                                                
        for (var i = r - 1; i >= 0; i--) {                                         
            cycles[i]--;                                                           
            if (cycles[i] === 0) {                                                 
                indices = indices.slice(0, i).concat(                              
                    indices.slice(i+1).concat(
                        indices.slice(i, i+1)));             
                cycles[i] = n - i;                                                 
                broken = false;                                                    
            } else {                                                               
                var j = cycles[i];                                                 
                var x = indices[i];                                                
                indices[i] = indices[n - j];                          
                indices[n - j] = x;                                   
                var res = [];
                for (var k = 0; k < r; k++) {                        
                    res.push(array[indices[k]]);                                   
                }                                                                  
                results.push(res);                                                 
                broken = true;                                                     
                break;                                                             
            }                                                                      
        }                                                                          
        if (broken === false) {                                                    
            break;                                                                 
        }                                                                          
    }                                                                              
    return results;                                                                
} 
window.onload = function(){
	try{
		busy = false;
		readTextFile(dictName);
		//alert("ready");
	g("gen").onclick = function(){
		if(busy){
			return;
		}
		busy = true;
		g('out').innerHTML = "<span style='color:red;'>Calculating...</span><br>";
		//alert("calc");
		var n = g("n").value;
		var lets = g("lets").value;
		var ps = permutations(lets,n);
		//alert(ps);
		np = [];
		s="";
		var i = 0 
		//alert(ps.length);
		tin = setInterval(function(){
			if(i==ps.length){busy=false;clearInterval(tin);return;}
			var w = "";
			for(var c=0;c<ps[i].length;c++)w+=ps[i][c];
			if(ps.find(function(element,index,array){return element == w;})){i++;return}
			if(!exists(w)){i++;return}
			g('out').innerHTML += w+"<br>";
			i++;
		},0.001);
		//g('out').innerHTML = s;
	}
	}
	catch(e){
		alert(e);
	}
}
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}
dict = {};
words = [];
function readTextFile(file)
{
	alert("Dictionary about to load");
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                words = allText.toLowerCase().split("\r\n");//.split("\r\n");
				//for(var i=0;i<words.length;i++)dict[words[i]]=true;
	alert(exists("aahing")?"Ready":"Problem...");
            }
        }
    }
    rawFile.send(null);
}

function exists(w){
	
	for(var i=0;i<words.length;i++){
		if(words[0] > w[0])return;
		/*if(words[0] == w[0]){
			if(words[1] > w[1])return;
			if(words[1] == w[1]){
				if(words[2] > w[2])return;
			}
		}*/
		if(words[i] == w)return true;
	}
}
