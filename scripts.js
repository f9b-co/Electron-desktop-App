let returnOrder = 1;

async function doFetch(endpoint) {
    try {
        const resp = await fetch("https://restcountries.eu/rest/v2/" + endpoint, {Method: 'GET', Cache: 'no-store'});
        console.log("https://restcountries.eu/rest/v2/" + endpoint)
        if (resp.ok) {
            return await resp.json();
        } else {
            return `error fetching endpoint: /${endpoint}`;
        }
    } catch (err) {
        console.log(err);
    }
}

function display(data, selector) {
    const container = document.querySelector(selector);
    container.innerHTML = "Return order= " + returnOrder + "</br>";
    data.forEach(e => {container.innerHTML += "<span>| " + e + " |</span>"});
    container.classList.add('be-bold');
    returnOrder++;
}

async function fetchA() {
    const resp = await doFetch('regionalbloc/eu?fields=name;capital');
    const data = [];
    resp.forEach(o => data.push(o.name+"/"+o.capital));
    display(data, '#component-a');
}

async function fetchB(name) {
    const resp = await doFetch('name/'+name+'?fields=name;alpha2Code;region');
    const data = [];
    resp.forEach(o => data.push(o.name+"/"+o.alpha2Code+"/"+o.region));
    display(data, '#component-b');
}

async function fetchC(capital) {
    const resp = await doFetch('capital/'+capital+'?fields=name');
    const data = [];
    resp.forEach(o => data.push(o.name));
    display(data, '#component-c');
}

async function fetchD(et) {
    const resp = await doFetch('lang/'+et+'?fields=name');
    const data = [];
    resp.forEach(o => data.push(o.name));
    display(data, '#component-d');
}

function fetchAndDisplayData() {
    fetchA();
    fetchB('france');
    fetchC('paris');
    fetchD('fr');
    returnOrder = 1;
}