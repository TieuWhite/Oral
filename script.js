const Ass3 = document.getElementById('Ass3');
const Ass5 = document.getElementById('Ass5');
const Ass6 = document.getElementById('Ass6');
const date = new Date();

Ass3.innerHTML = `
    <div>Module 1 Technical Interview</div>
    <div>Learner name: Hien</div>
    <div>Date: <span id='date'>${date}</span></div><br>

    <input id='input' placeholder="Search"> <button id='searchBtn'>Search</button>
`


const input = document.getElementById('input')
const searchBtn = document.getElementById('searchBtn')


async function fetchJob(currentPage, q) {
    try {
        const BASE_URL = 'https://frcz3-8080.csb.app/jobs';
        if (q) {
            url = `${BASE_URL}?q=${q}&_limit=10`;
        }
        else {
            url = `${BASE_URL}/?_page=${currentPage}&_limit=10`
        }
        res = await fetch(url);
        jobData = await res.json();
        console.clear();
        console.log(`jobs`,jobData);
        return jobData;
    }
    catch (error) {
        console.error (error);
    }
}

async function renderJob(currentPage = 1, q = '') {
    const Ass6 = document.getElementById('Ass6');
    const Ass5 = document.getElementById('Ass5');
    const jobData = await fetchJob(currentPage, q);
    try {
        Ass5.innerHTML = '';
        jobData.forEach(job => {
            const jobItem = document.createElement(`div`);
            jobItem.textContent = job.title;
            jobItem.classList.add('job-item');
    
            Ass5.appendChild(jobItem);
        });
        Ass6.innerHTML = '';
        const prev = document.createElement('div');
        prev.textContent = ('prev')
        prev.classList.add('prev')
        prev.onclick = () => {
            if (currentPage > 1) {
            currentPage--;
            renderJob(currentPage,'');
            }
        }

        const P = document.createElement('div');
        P.textContent = currentPage;

        const next = document.createElement('div');
        next.textContent = ('next');
        next.classList.add('next');
        next.onclick = () => {
            currentPage++;
            renderJob(currentPage,'');
        }
        
        Ass6.appendChild(prev);
        Ass6.appendChild(P);
        Ass6.appendChild(next);

    }
    catch (error) {
        console.error (error);
    }
}

// Search

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const q = input.value.trim();
      renderJob(1, q);
    }
});

searchBtn.addEventListener('click', () => {
    const q = input.value.trim();
    renderJob(1, q);
});

renderJob()
