const counter =  document.getElementById('counter');
const maxCounter = document.getElementById('maxCounter');

let num, maxCount;

async function getCount() {
    const url = `/count`;
    const response = await fetch(url, { 
        method: 'GET',   
    });
    const data = await response.json();
    return data;
}

async function setValues() {
    const result = await getCount();
    num = result[0]["count"];
    maxCount = result[0]["max_count"];
    document.getElementById('counter').textContent = num;
    document.getElementById('maxCounter').textContent = maxCount;
}

window.onload = async () => {
    await setValues();
};

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