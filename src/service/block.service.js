const PIXEL_SCALE = 0.3125;
const PIXEL_STEP = 0.0625;
const MAIN_START = -0.4765;
const MAIN_Y_START = 0.42175;
const SIDE_Z_START = -0.461;

const FACE_ROTATIONS = {
    south: "[0f,0f,0f,1f]",
    north: "[0f,1f,0f,0f]",
    east:  "[0f,-0.7071f,0f,0.7071f]",
    west:  "[0f,0.7071f,0f,0.7071f]",
    up:    "[-0.7071f,0f,0f,0.7071f]",
    down:  "[0.7071f,0f,0f,0.7071f]"
};

function downloadFile(filename, content, type = "text/plain") {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function GenerateJSONObject(blockData, blockType, blockID, baseBlock, activeFaces) {
    return {
        blockID: blockID || "custom_block",
        blockType: blockType,
        baseBlock: baseBlock,
        activeFaces: activeFaces,
        pixels: blockData,
        timestamp: new Date().toISOString()
    };
}

function GenerateMCFunction(blockData, blockType, blockID, baseBlock = "", activeFaces = null, seeThrough = false) {
    const UUID = crypto.randomUUID();
    let MCFunction = "";
    let facesGeometry = {};

    switch (seeThrough) {
        case false: seeThrough = 0; break;
        case true: seeThrough = 0; break;
        default: seeThrough = 0; break;
    }

    if (Array.isArray(blockData) && blockType !== "TABLE") {
        facesGeometry = { south: blockData, north: blockData, east: blockData, west: blockData, up: blockData, down: blockData };
    } else {
        switch (blockType) {
            case "SOLID":
                facesGeometry = { south: blockData, north: blockData, east: blockData, west: blockData, up: blockData, down: blockData };
                break;
            case "TABLE":
                facesGeometry = {
                    south: blockData.sides, north: blockData.sides, east: blockData.sides, west: blockData.sides,
                    up: blockData.caps, down: blockData.caps
                };
                break;
            case "UNIQUE":
                facesGeometry = blockData;
                break;
            default:
                facesGeometry = { south: blockData, north: blockData, east: blockData, west: blockData, up: blockData, down: blockData };
                break;
        }
    }

    if (baseBlock) {
        MCFunction += `setblock ~ ~ ~ ${baseBlock}\n\n`;
    }

    const markerTags = [
        "mc_block_creator.custom_block",
        `mc_block_creator.custom_block.${blockID}`,
        `mc_block_creator.custom_block.${UUID}`,
        `mc_block_creator.custom_block.${blockID}.${UUID}`,
        "mc_block_creator.custom_block.marker",
        `mc_block_creator.custom_block.marker.${blockID}`,
        `mc_block_creator.custom_block.marker.${UUID}`,
        `mc_block_creator.custom_block.marker.${blockID}.${UUID}`,
    ].join('","');

    MCFunction += `execute align xyz run summon marker ~.5 ~.5 ~.5 {Tags:["${markerTags}"]}\n\n`;

    for (const [faceName, pixels] of Object.entries(facesGeometry)) {
        if (activeFaces && activeFaces[faceName] === false) {
            continue;
        }

        if (!pixels || !Array.isArray(pixels)) continue;

        const rotation = FACE_ROTATIONS[faceName] || FACE_ROTATIONS.south;

        for (let i = 0; i < pixels.length; i++) {
            const pixelBlockId = pixels[i];
            if (!pixelBlockId || pixelBlockId === "air" || pixelBlockId.trim() === "") continue;

            const row = Math.floor(i / 16);
            const col = i % 16;
            const h = MAIN_START + (col * PIXEL_STEP);
            const v = MAIN_Y_START - (row * PIXEL_STEP);
            const z_side = SIDE_Z_START + (col * PIXEL_STEP);

            let x = 0, y = 0, z = 0;
            switch (faceName) {
                case "south": x = h; y = v; z = 0.5; break;
                case "north": x = -h; y = v; z = -0.5; break;
                case "east":  x = -0.5; y = v; z = -z_side; break;
                case "west":  x = 0.5; y = v; z = z_side; break;
                case "up":    x = h; y = 0.5; z = -v; break;
                case "down":  x = h; y = -0.5; z = v; break;
            }

            const x_f = x.toFixed(5);
            const y_f = y.toFixed(5);
            const z_f = z.toFixed(5);

            const pixelTags = [
                "mc_block_creator.custom_block",
                `mc_block_creator.custom_block.${blockID}`,
                `mc_block_creator.custom_block.${UUID}`,
                `mc_block_creator.custom_block.${blockID}.${UUID}`,
                "mc_block_creator.custom_block.text_display",
                `mc_block_creator.custom_block.text_display.${blockID}`,
                `mc_block_creator.custom_block.text_display.${UUID}`,
                `mc_block_creator.custom_block.text_display.${blockID}.${UUID}`,
            ].join('","');

            MCFunction += `execute align xyz run summon text_display ~.5 ~.5 ~.5 {billboard:"fixed",default_background:0b,shadow:0b,see_through:${seeThrough}b,alignment:"center",Tags:["${pixelTags}"],brightness:{sky:15,block:15},transformation:{left_rotation:${rotation},right_rotation:[0f,0f,0f,1f],translation:[${x_f}f,${y_f}f,${z_f}f],scale:[${PIXEL_SCALE}f,${PIXEL_SCALE}f,${PIXEL_SCALE}f]},text:{"sprite":"block/${pixelBlockId}"},background:16383998}\n`;
        }
    }

    MCFunction += `\nexecute as @e[tag=mc_block_creator.custom_block.text_display.${UUID}] run ride @s mount @n[tag=mc_block_creator.custom_block.marker.${UUID}]`;
    return MCFunction;
}

async function CopyMCFunction(blockData, blockType, blockID, baseBlock = "", activeFaces) {
    try {
        await navigator.clipboard.writeText(GenerateMCFunction(blockData, blockType, blockID, baseBlock, activeFaces));
    } catch (err) {
        console.error("Error copying mcfunction", err);
    }
}

function ExportMCFunction(blockData, blockType, blockID, baseBlock = "", activeFaces) {
    const content = GenerateMCFunction(blockData, blockType, blockID, baseBlock, activeFaces);
    const filename = `${blockID || "block"}.mcfunction`;
    downloadFile(filename, content, "text/plain");
}

async function CopyJSON(blockData, blockType, blockID, baseBlock = "", activeFaces) {
    const data = GenerateJSONObject(blockData, blockType, blockID, baseBlock, activeFaces);
    try {
        await navigator.clipboard.writeText(JSON.stringify(data, null, 4));
    } catch (err) {
        console.error("Error copying JSON", err);
    }
}

function ExportJSON(blockData, blockType, blockID, baseBlock = "", activeFaces) {
    const data = GenerateJSONObject(blockData, blockType, blockID, baseBlock, activeFaces);
    const filename = `${blockID || "block"}.json`;
    downloadFile(filename, JSON.stringify(data, null, 4), "application/json");
}

function ValidateBlockJSON(json) {
    if (!json || typeof json !== 'object') throw new Error("JSON Inválido");
    return json;
}

export {
    GenerateMCFunction,
    CopyMCFunction,
    ExportMCFunction,
    CopyJSON,
    ExportJSON,
    ValidateBlockJSON
};