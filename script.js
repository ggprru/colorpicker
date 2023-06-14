cols = document.querySelectorAll('.cont')


let update = (isInitial) => {
    let colors = isInitial ? getColorHash() : []

    cols.forEach((col, index)=>{
        let isLocked = col.querySelector('i').classList.contains('fa-lock') 
        let sub_t = col.querySelector('.sub_title')
        let btn = col.querySelector('i')
        
        if (isLocked){
            colors.push(sub_t.textContent)
            return
        }
        
        let randomColor = isInitial 
        ? colors[index] 
            ? colors[index] 
            : chroma.random()
        : chroma.random()
        if (!isInitial){
            colors.push(randomColor)
        }

        sub_t.textContent = randomColor
        col.style.background = randomColor

        setTextColor(sub_t, randomColor)
        setTextColor(btn, randomColor)
    })
    updateColorHash(colors)
}

function copyToClickboard(text){
    return navigator.clipboard.writeText(text)
}

document.addEventListener('keydown',(event)=>{
    event.preventDefault()
    if (event.code.toLowerCase() ==='space'){
        update()
    }
})
document.addEventListener('click', event => {
    if (event.target.tagName === 'I'){
        event.target.classList.toggle('fa-lock')
        event.target.classList.toggle('fa-lock-open')
    } else if (event.target.tagName === 'BUTTON'){
        
        event.target.children[0].classList.toggle('fa-lock')
        event.target.children[0].classList.toggle('fa-lock-open')
    } else if (event.target.tagName === 'H2'){
        copyToClickboard(event.target.textContent.toUpperCase())
        popupShow(event.target.parentElement.querySelector('.popup'))
    }
})

function updateColorHash(colors = []){
    document.location.hash = colors.map(col => col.toString().substring(1)).join('-')
}

function getColorHash(){
    if (document.location.hash.length > 1){
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

function setTextColor(text, color){
    let luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function popupShow(popup){
    popup.classList.add('show')
    setTimeout(()=>{
        popup.classList.remove('show')
    }, 1500)
}

update(true)
