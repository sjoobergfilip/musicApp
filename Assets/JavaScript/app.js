
//The text you will search
const searchFieldText = document.querySelector('#formSearchText'); 
//Show result under search
const musicSearchEl = document.querySelector('#musicResult');
//WHen I submit
const formSearch = document.querySelector('#musicSearch');

const clearMusic = document.querySelector('#clear')

// Clear
let clearResult = 0;

formSearch.addEventListener('submit', e =>{

    console.log(clearResult)

    if(clearResult !== 0){
        musicSearchEl.innerHTML = "";
    }

    e.preventDefault();
    const urlSearch = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchFieldText.value}`;

    const getMusic = async () => {
        const response = await fetch(urlSearch, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "2840ee81ecmsha6d19635125141ap16982fjsn1e3d497e0d31"
            }
        });
        if (!response.ok){
            throw new Error("The respone was not OK!")
        }
        const musicResult = await response.json();
        console.log(musicResult)
    
        //lopa över alla resultat
        musicResult.data.forEach(data => {
            const musicHtml = `
                        <div class="card" style="width: 18rem;">
                            <img src="${data.album.cover_medium}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.artist.name}</h5>
                                    <h5 class="card-title"><i class="fas fa-music"></i> ${data.title}</h5>
                                    <h5 class="card-title"><i class="fas fa-record-vinyl"></i> ${data.album.title}</h5>
                                </div>
                             </div>
                        `;
                    musicSearchEl.innerHTML += musicHtml;
        });
        clearResult+=1;
        console.log(clearResult)
        
    };
    getMusic()
        .catch(err=>{
            musicSearchEl.innerHTML = `
            <div class="alert alert-warning">
                    ${err}
            </div>
            
            `;
        });

});

clearMusic.addEventListener('click', e =>{
    
    musicSearchEl.innerHTML = "";
    searchFieldText.value = "";

});




