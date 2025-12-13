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
        }),
}));

export default useBlockStore;