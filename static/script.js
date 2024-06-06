
const counter =  document.getElementById('counter');
const maxCounter = document.getElementById('maxCounter');

var num = 0; // this should be fetch - initial value from db
var maxCount = num;

counter.textContent = num;
maxCounter.textContent = num;

function updateCounter(){
    num = num + 1
    counter.textContent = num

    if (num > maxCount){
        maxCount += 1
        maxCounter.textContent = maxCount
    }
}

function resetCounter(){
    num = 0
    counter.textContent = num
    return num
}