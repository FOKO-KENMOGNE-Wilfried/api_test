
var getJSON = async (url) => {
    return new Promise((resolve, reject) => {
        var xhr = new window.XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(xhr.responseText);
                } else {
                    reject(xhr)
                }
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    })
};

var fetch_data =  async (url) => {
    try {
        var rep = await getJSON(url);
        var data = JSON.parse(rep);
    } catch (error) {
        console.log("Erreur de recuperation", error);
    }
    return data;
}
   

var getData = async () => {
    var data = await fetch_data('http://geekpress.fr/wp-json/wp/v2/users');
    return data
}

var getArticle = async () => {
    var data = await fetch_data('http://geekpress.fr/wp-json/wp/v2/posts?per_page=100');
    return data
}

let Title = `
    <h1>Les auteurs</h1>
`

Promise.all([ getData(), getArticle()]).then((datas) => {

    let data1 = datas[0];
    let id_table = [];
    let data2 = datas[1];
    let article_number;

    for(let i= 0; i< data1.length; i++){
        id_table[i] = data1[i].id;
    }
    console.log(id_table);
    let container  =  document.getElementById("section");

    let data_name = data1.map((data1) => {
        
        article_number = data2.filter(data2 => data2.author === data1.id).length;
        return`
        <article>
        <div>
        <h2 id="auteur${data1.id}">${data1.name}</h2>
                <img alt="Nothing" id="avatar${data1.id}" src=${data1.avatar_urls[96]}>
                </div>
                <p id="description${data1.id}">
                <strong id="nb0">Nombre d'article : ${article_number}</strong>
                </p>
                </article>
                `;

            }).join("");
            
            console.log(data_name);
            container.innerHTML = Title+data_name;
        
})