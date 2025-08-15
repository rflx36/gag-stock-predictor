

export type ItemType = "Seed" | "Gear" | "Egg";


export interface ItemData {
    name: string,
    stock: number,
    unix: number | string,
    type: ItemType
}

export interface SavedItemData {
    unix_validation: number | string,
    item_list: Array<ItemData>
}

