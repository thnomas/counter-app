const counter =  document.getElementById('counter');
const maxCounter = document.getElementById('maxCounter');

var num = 0; // this should be fetch - initial value from db
var maxCount = num;

counter.textContent = num;
maxCounter.textContent = num;

function updateDb(num, maxCount){
    const url = `http://localhost:5000/count`;
    const data = {
        count: num,
        max_count: maxCount
    }
    fetch(url, { 
        method: 'PUT', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(response => console.log(JSON.stringify(response)))
};

function updateCounter(){
    num = num + 1
    counter.textContent = num

    if (num > maxCount){
        maxCount += 1
        maxCounter.textContent = maxCount    
    }
    updateDb(num, maxCount)
}

function resetCounter(){
    num = 0
    maxCount = maxCount
    counter.textContent = num
    updateDb(num, maxCount)
    return num
}