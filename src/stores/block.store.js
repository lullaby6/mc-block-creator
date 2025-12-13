import { FACES } from "@/config";
import { create } from "zustand";

const useBlockStore = create((set) => ({
    block: "diamond_block",
    setBlock: (newBlock) => set({ block: newBlock }),

    pixels: Array.from({ length: 256 }).map(() => "air"),
    setPixels: (newPixels) => set({ pixels: newPixels }),
    resetPixels: () =>
        set({ pixels: Array.from({ length: 256 }).map(() => "air") }),
    setPixel: (index, value) => set((state) => {
        if (Array.isArray(state.pixels)) {
            const newPixels = [...state.pixels]

            newPixels[index] = value

            return {
                pixels: newPixels
            }
        } else {
            const newPixels = {...state.pixels}

            state.selectedFaces.forEach(face => {
                newPixels[face][index] = value
            })

            return {
                pixels: newPixels
            }
        }
    }),
    fillPixels: (value) => set((state) => {
        if (Array.isArray(state.pixels)) {
            const newPixels = [...state.pixels].map(() => value)

            return {
                pixels: newPixels
            }
        } else {
            const newPixels = {...state.pixels}

            state.selectedFaces.forEach(face => {
                newPixels[face] = [...newPixels[face]].map(() => value)
            })

            return {
                pixels: newPixels
            }
        }
    }),

    baseBlock: "air",
    setBaseBlock: (newBaseBlock) => set({ baseBlock: newBaseBlock }),

    blockID: "custom_block",
    setBlockID: (newblockID) => set({ blockID: newblockID }),

    blockType: "SOLID",
    setBlockType: (newBlockType) => set(state => {
        let newPixels;

        switch (newBlockType) {
            case "SOLID":
                newPixels = Array.from({ length: 256 }).map(() => "air")

                break;

            case "TABLE":
                newPixels = {}

                FACES.forEach(face => {
                    newPixels[face] = Array.from({ length: 256 }).map(() => "air")
                })

                break;

            default:
                newPixels = Array.from({ length: 256 }).map(() => "air")

                break;
        }

        return { blockType: newBlockType, pixels: newPixels }
    }),

	activeFaces: {
        south: true,
        north: true,
        east: true,
        west: true,
        up: true,
        down: true,
    },
    setActiveFaces: (newActiveFaces) => set({ activeFaces: newActiveFaces }),

    setActiveFace: (face, value) =>
        set((state) => ({ activeFaces: { ...state.activeFaces, [face]: value } })),

    tool: "PENCIL",
    setTool: (newTool) => set({ tool: newTool }),

    selectedFaces: [],
    setSelectedFaces: (newSelectedFaces) => set({ selectedFaces: newSelectedFaces }),

    reset: () =>
        set({
            block: "diamond_block",
            pixels: Array.from({ length: 256 }).map(() => "air"),
            baseBlock: "air",
            blockID: "custom_block",
            blockType: "SOLID",
            activeFaces: {
                south: true,
                north: true,
                east: true,
                west: true,
                up: true,
                down: true,
            },
            tool: "PENCIL",
            selectedFaces: []
        }),
}));

export default useBlockStore;