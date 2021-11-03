/**
 * @param {string} tagname
 * @param {Object} data 
 * @param {string} appendTo 
 * @param {Function} callback 
 */
//TODO support onclick functions
export default function Create(tagname, data, appendTo, callback, events) {
    let element = document.createElement(tagname)

    Object.keys(data).forEach(entry => {
        if (entry === 'style') {
            Object.entries(data[entry]).forEach(styleEntry => {
                element.style[styleEntry[0]] = styleEntry[1]
            })
        } else {
            element[entry] = data[entry];
        }
    })

    if (callback && typeof (callback) === "function") {
        callback()
    }

    if (events) {
        console.log(events)
        events.map(entry => {
            if (entry.element !== null) {
                entry.element.addEventListener(entry.type, () => {
                    entry.function()
                })
            } else {
                element.addEventListener(entry.type, () => {
                    entry.function()
                })
            }
        })

        // document.addEventListener('keydown', (e)=>{
        //     if(e.key == 'esc'){

        //     }
        // })
    }

    document.getElementById(appendTo).appendChild(element)
}