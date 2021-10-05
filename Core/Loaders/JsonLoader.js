//json loader class

export default class JsonLoader{
    constructor(){

    }

    static Load(path){
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "json";
            xhr.open('GET', path, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };
            xhr.send();
        });
    }
}