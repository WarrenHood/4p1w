var dictName = "wl.txt";
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
function reps(w,c){
	try{
	var t=0;
	for(var i=0;i<w.length;i++)t+= (w[i]==c?1:0);
	return t;
	}
	catch(e){
		
		alert("err: \nword="+w+"\ni="+i);
	}
}
window.onload = function(){
		//alert(reps("aabc","a"));
		//tarr = [1,2, 3,4];
		//tarr.splice(0,1);
		//alert(JSON.stringify(tarr));
		readTextFile(dictName);
		//alert("ready");
		g("gen").onclick = function(){
		
		g('out').innerHTML = "<span style='color:red;'>Calculating...</span><br>";
		//alert("calc");
		var n = g("n").value;
		var lets = g("lets").value;
		var coun = {};
		for(var ci=0;ci<lets.length;ci++)coun[lets[ci]] = reps(lets,lets[ci]);
		cnams = [];
		for(var wd=0;wd<words.length;wd++)if(words[wd].length != n){words.splice(wd,1);wd--;}
		var i=0;
		while(i<words.length){
			for(var ki=0;ki<words[i].length;ki++){
				var k = words[i][ki];
				//alert( reps(words[i],k)+" > "+coun[k]+" "+words[i]);
				if(reps(words[i],k) > reps(lets,k)){
					//alert(true);
					words.splice(i,1);
					i = i-1;
					break;
					alert(i);
					}
					
			}
			i++;
		}
	for(var wd=0;wd<words.length;wd++)g("out").innerHTML+=(words.length>0?words[wd]:"No results")+"<br>";
	readTextFile(dictName);
	g("out").innerHTML+="<span style='color:green;'>Done</span>";
	};
};
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
function readTextFile(file){
	//alert("Dictionary about to load");
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                words = allText.toLowerCase().split(" ");
				//for(var i=0;i<words.length;i++)dict[words[i]]=true;
	//alert(exists("aahing")?"Ready":"Problem...");
            }
        }
    }
    rawFile.send(null);
}

function exists(w){
	
	for(var i=alphas[w[0]];i<words.length;i++){
		if(words[i][0] > w[0])return;
		if(words[i][0] == w[0]){
			if(words[i][1] > w[1])return;
			if(words[i][1] == w[1]){
				if(words[i][2] > w[2])return;
			}
		}
		if(words[i] == w)return true;
	}
}
