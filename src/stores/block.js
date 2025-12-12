import { create } from "zustand";

const useBlockStore = create((set) => ({
    block: "diamond_block",
    setBlock: (newBlock) => set({ block: newBlock }),

    pixels: Array.from({ length: 256 }).map(() => "air"),
    setPixels: (newPixels) => set({ pixels: newPixels }),
    resetPixels: () =>
        set({ pixels: Array.from({ length: 256 }).map(() => "air") }),

    baseBlock: "air",
    setBaseBlock: (newBaseBlock) => set({ baseBlock: newBaseBlock }),

    blockID: "custom_block",
    setBlockID: (newblockID) => set({ blockID: newblockID }),

    blockType: "SOLID",
    setBlockType: (newBlockType) => set({ blockType: newBlockType }),

    faces: {
        south: true,
        north: true,
        east: true,
        west: true,
        up: true,
        down: true,
    },
    setFaces: (newFaces) => set({ faces: newFaces }),

    setFace: (face, value) =>
        set((state) => ({ faces: { ...state.faces, [face]: value } })),

    reset: () =>
        set({
            block: "diamond_block",
            pixels: Array.from({ length: 256 }).map(() => "air"),
            baseBlock: "air",
            blockID: "custom_block",
            blockType: "SOLID",
            faces: {
                south: true,
                north: true,
                east: true,
                west: true,
                up: true,
                down: true,
            },
        }),
}));

export default useBlockStore;