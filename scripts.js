let returnOrder = 1;

async function doFetch(endpoint) {
    try {
        const resp = await fetch("https://restcountries.eu/rest/v2/" + endpoint, {Method: 'GET', Cache: 'no-store'});
        console.log("https://restcountries.eu/rest/v2/" + endpoint)
        if (resp.ok) {
            return await resp.text();
        } else {
            return `error fetching endpoint: /${endpoint}`;
        }
    } catch (err) {
        console.log(err);
    }
}

function display(data, selector) {
    const container = document.querySelector(selector);
    container.innerHTML = "Return order = " + returnOrder + "<p>" + data + "</p>";
    container.classList.add('be-bold');
    returnOrder++;
}

async function fetchA() {
    const data = await doFetch('regionalbloc/eu?fields=name'); //?fields=name;capital
    display(data, '#component-a');
}

async function fetchB(name) {
    const data = await doFetch('name/'+name+'?fields=name;alpha2Code;region');
    display(data, '#component-b');
}

async function fetchC(capital) {
    const data = await doFetch('capital/'+capital+'?fields=name');
    display(data, '#component-c');
}

async function fetchD(et) {
    const data = await doFetch('lang/'+et+'?fields=name');
    display(data, '#component-d');
}

function fetchAndDisplayData() {
    fetchA();
    fetchB('france');
    fetchC('paris');
    fetchD('fr');
    returnOrder = 1;
}