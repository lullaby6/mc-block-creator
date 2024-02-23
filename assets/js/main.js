function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

window.pickupBlock = false
window.mouseDown = null

window.addEventListener('mousedown', event => {
    window.mouseDown = event.button
})

window.addEventListener('mouseup', () => {
    window.mouseDown = null
})

window.addEventListener('drag', event => event.preventDefault())
window.addEventListener('dragstart', event => event.preventDefault())
window.addEventListener('drop', event => event.preventDefault())

document.addEventListener("visibilitychange", () => {
    window.mouseDown = null
})

document.addEventListener("blur", () => {
    window.mouseDown = null
})

const colors = [
    'white',
    'light_gray',
    'gray',
    'black',
    'brown',
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'cyan',
    'light_blue',
    'blue',
    'purple',
    'magenta',
    'pink',
]

const blockMaterials = [
    'wool',
    'terracotta',
    'concrete',
    'concrete_powder',
    'glazed_terracotta',
    'stained_glass',
    'shulker_box',
]

const rowTemplate = document.createElement('div');
rowTemplate.setAttribute('class', 'row flex gap-[0.02px] ly-bg-dark-border');

const pixelTemplate = document.createElement('div');
pixelTemplate.setAttribute('class', 'pixel ly-bg-light w-5 h-5');

function disableBlockPickup(){
    window.pickupBlock = false

    document.getElementById('block').classList.remove('cursor-grabbing')
}

function paintPixel(pixel){
    const blockImage = document.querySelector('.block[selected]').src
    if (blockImage == null) return
    const block = document.querySelector('.block[selected]').getAttribute('block')
    if (block == null) return

    pixel.style.backgroundImage = `url(${blockImage})`
    pixel.style.backgroundSize = 'cover'
    pixel.setAttribute('selected', block)
}

function clearPixel(pixel){
    pixel.style.backgroundImage = ``
    pixel.removeAttribute('selected')
}

function pickupPixel(pixel){
    const selectedBlock = pixel.getAttribute('selected')

    const block = document.querySelector(`.block[block="${selectedBlock}"]`)

    selectBlock(block)
}

function loadPixel(pixel) {
    pixel.addEventListener('mousedown', event => {
        if (event.button == 0) {
            if (window.pickupBlock && pixel.hasAttribute('selected')) {
                pickupPixel(pixel)
            } else {
                paintPixel(pixel)
            }
        } else if (event.button == 2) {
            clearPixel(pixel)

            disableBlockPickup()
        }
    })

    pixel.addEventListener('contextmenu', event =>
        event.preventDefault()
    )

    pixel.addEventListener('mouseover', () => {
        if (window.mouseDown == 0) {
            paintPixel(pixel)
        } else if (window.mouseDown == 2) {
            clearPixel(pixel)
        }
    })
}

function selectBlock(block){
    try {
        document.querySelector('.block[selected]').removeAttribute('selected')
    } catch (error) {}

    block.setAttribute('selected', '')

    document.getElementById('selected-block-img').src = block.src
    document.getElementById('selected-block-name').innerText = block.getAttribute('block')

    disableBlockPickup()
}

function loadBlocks(){
    const blocks = document.getElementById('blocks')

    blockMaterials.forEach(material =>
        colors.forEach(color => {
            const img = document.createElement('img')
            img.src = `./assets/images/blocks/${color}_${material}.png`
            img.setAttribute('block', `${color}_${material}`)
            img.setAttribute('class', 'block select-none w-5 h-5 ly-bg-light-hover border ly-border-light cursor-pointer [&:hover]:ring-2 [&:hover]:ly-ring-dark [&[selected]]:ring-2 [&[selected]]:ly-ring-dark')
            blocks.appendChild(img)
        }
    ))

    selectBlock(document.querySelector('.block[src="./assets/images/blocks/white_wool.png"]'))

    document.querySelectorAll('.block').forEach(block =>
        block.addEventListener('click', () => {
            selectBlock(block)
        }
    ))

    document.getElementById('search-block').addEventListener('input', event => {
        const search = event.target.value

        const blockSearch = document.getElementById('block-search')
        blockSearch.src = `./assets/images/blocks/${search}.png`
        blockSearch.setAttribute('block', `${search}`)
    })
}

function loadSettings(){
    const gridCheckbox = document.getElementById('grid')

    let gridStorage = localStorage.getItem('grid')
    if (gridStorage == 'false') {
        gridCheckbox.checked = false

        block.style.gap = '0'
        document.querySelectorAll('.row').forEach(row => {
            row.style.gap = '0'
        })
        localStorage.setItem('grid', 'false')
    }

    gridCheckbox.addEventListener('click', event => {
        if (event.target.checked) {
            block.style.gap = '0.02px'
            document.querySelectorAll('.row').forEach(row => {
                row.style.gap = '0.02px'
            })
            localStorage.setItem('grid', 'true')
        } else {
            block.style.gap = '0'
            document.querySelectorAll('.row').forEach(row => {
                row.style.gap = '0'
            })
            localStorage.setItem('grid', 'false')
        }
    })

    const pngCheckbox = document.getElementById('png')
    pngCheckbox.addEventListener('click', event => {
        if (event.target.checked) {
            document.querySelectorAll('.pixel').forEach(pixel => {
                if (pixel.classList.contains('even')) {
                    pixel.classList.add('even:bg-[#bfbfbf]')
                } else if (pixel.classList.contains('odd')) {
                    pixel.classList.add('odd:bg-[#bfbfbf]')
                }
            })
            localStorage.setItem('png', 'true')
        } else {
            document.querySelectorAll('.pixel').forEach(pixel => {
                pixel.classList.remove('even:bg-[#bfbfbf]')
                pixel.classList.remove('odd:bg-[#bfbfbf]')
            })
            localStorage.setItem('png', 'false')
        }
    })

    let pngStorage = localStorage.getItem('png')
    if (pngStorage == 'false') {
        pngCheckbox.checked = false
    }

    let mode = "even"
    document.querySelectorAll('.row').forEach(row => {
        row.querySelectorAll('.pixel').forEach(pixel => {
            pixel.classList.add(mode)
            if (pngStorage != 'false') {
                pixel.classList.add(`${mode}:bg-[#bfbfbf]`)
            }
        })
        if (mode == "even") {
            mode = "odd"
        } else {
            mode = "even"
        }
    })
}

function load(){
    const block = document.getElementById('block')

    for (let i = 0; i < 16; i++) {
        const rowClone = rowTemplate.cloneNode(true);
        block.appendChild(rowClone);

        for (let j = 0; j < 16; j++) {
            const pixelClone = pixelTemplate.cloneNode(true);
            rowClone.appendChild(pixelClone);
        }
    }

    document.querySelectorAll('.pixel').forEach(loadPixel)

    document.getElementById('block-copy').addEventListener('click', () => {
        disableBlockPickup()

        navigator.clipboard.writeText(genBlockCommand())
    })

    document.getElementById('block-clear').addEventListener('click', () => {
        document.querySelectorAll('.pixel[selected]')
            .forEach(
                clearPixel
            )

        disableBlockPickup()
    })

    document.getElementById('download-mcfunction').addEventListener('click', () => {
        disableBlockPickup()

        download('custom_block.mcfunction', genBlockCommand())
    })

    document.getElementById('block-pickup').addEventListener('click', () => {
        window.pickupBlock = true
        block.classList.add('cursor-grabbing')
    })

    document.getElementById('block-fill').addEventListener('click', () => {
        document.querySelectorAll('.pixel').forEach(paintPixel)
    })

    loadBlocks()
    loadSettings()
}

document.addEventListener('DOMContentLoaded', load)

function genBlockCommand(){
    const blockID = crypto.randomUUID()

    let output = "";

    document.querySelectorAll('.pixel[selected]').forEach(pixel => {
        var rows = Array.from(pixel.parentNode.parentNode.children);
        var row = rows.indexOf(pixel.parentNode);
        var columns = Array.from(pixel.parentNode.children);
        var column = columns.indexOf(pixel);

        var block = pixel.getAttribute('selected');

        output += `
execute align xyz positioned ~ ~ ~-.005 run summon block_display ~ ~ ~ {Tags:["block_creator.block_display.${blockID}"],transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[${0 + (0.0625 * column)}f,${0 + (0.0625 * row)}f,${0}f],scale:[0.0625f,0.0625f,0.01f]},block_state:{Name:"minecraft:${block}"}}\n
execute align xyz positioned ~ ~ ~-.005 run summon block_display ~ ~ ~ {Tags:["block_creator.block_display.${blockID}"],transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[${0 + (0.0625 * column)}f,${0 + (0.0625 * row)}f,${1}f],scale:[0.0625f,0.0625f,0.01f]},block_state:{Name:"minecraft:${block}"}}\n

execute align xyz positioned ~-.005 ~ ~ run summon block_display ~ ~ ~ {Tags:["block_creator.block_display.${blockID}"],transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[${0}f,${0 + (0.0625 * row)}f,${0 + (0.0625 * column)}f],scale:[0.01f,0.0625f,0.0625f]},block_state:{Name:"minecraft:${block}"}}\n
execute align xyz positioned ~-.005 ~ ~ run summon block_display ~ ~ ~ {Tags:["block_creator.block_display.${blockID}"],transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[${1}f,${0 + (0.0625 * row)}f,${0 + (0.0625 * column)}f],scale:[0.01f,0.0625f,0.0625f]},block_state:{Name:"minecraft:${block}"}}\n

execute align xyz positioned ~ ~ ~ run summon block_display ~ ~ ~ {Tags:["block_creator.block_display.${blockID}"],transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[${0 + (0.0625 * column)}f,${0}f,${0 + (0.0625 * row)}f],scale:[0.0625f,0.01f,0.0625f]},block_state:{Name:"minecraft:${block}"}}\n
execute align xyz positioned ~ ~1 ~ run summon block_display ~ ~ ~ {Tags:["block_creator.block_display.${blockID}"],transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[${0 + (0.0625 * column)}f,${0}f,${0 + (0.0625 * row)}f],scale:[0.0625f,0.01f,0.0625f]},block_state:{Name:"minecraft:${block}"}}\n
`
    })

    return output
}