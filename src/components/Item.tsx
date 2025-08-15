import { useEffect, useState } from "react";
import type { ItemType, SavedItemData } from "../types";
import { getCurrentUnixTimestamp } from "../utils/unixConverter";





export const ItemCard = (props: { itemType: ItemType, itemName: string, itemImageUrl: string }) => {
    const [isDockedList, setIsDockedList] = useState(false);
    const [itemData, setItemData] = useState<SavedItemData | null>(null)
    const [loaded, setLoaded] = useState(false);


    const loadLocalData = () => {
        const localData = localStorage.getItem(props.itemName);

        if (!localData) {
            updateLocalData();
            return;
        }

        const parsedData = JSON.parse(localData);

        if (parsedData.unix_validation >= getCurrentUnixTimestamp()) {
            setItemData(parsedData);
            setLoaded(true)
        }
        else {
            updateLocalData();
        }


    }

    const updateLocalData = async () => {
        const apiUrl = import.meta.env.VITE_GAG_STOCK;
        const encodedName = encodeURIComponent(props.itemName)
        const requestQuery = `${apiUrl}stock?type=${props.itemType}&name=${encodedName}&amount=1`;
        try {
            const result = await fetch(requestQuery).then(response => response.json());

            if (!result.ok) {
                throw new Error(`ERROR status: ${result.status}`);
            }

            const mapped = result.map((item: any) => {
                return {
                    name: item.Name,
                    type: item.Type,
                    unix: item.Unix,
                    stock: item.Stock
                }
            })

            const newLocalData = {
                unix_validation: mapped[mapped.length - 1]?.unix,
                item_list: mapped
            }

            localStorage.setItem(props.itemName, JSON.stringify(newLocalData));
            setItemData(newLocalData);
            setLoaded(true);


        }
        catch (error) {
            console.error("An error occured", error);
            throw error;
        }
    }


    useEffect(() => {
        loadLocalData();
    }, [])


    return (
        <>
            <div className="w-full h-[100px] flex rounded-[15px] bg-[#1b1b1b] p-[5px] gap-[5px] font-figtree text-white">
                <div className="rounded-[10px] bg-[#222222] w-[90px] h-[90px]">
                    <img src={props.itemImageUrl} className="w-full h-full" />
                </div>
                <div className="w-[calc(100%-105px)] flex flex-col justify-between">
                    <p>{props.itemName}</p>
                    {
                        loaded ?
                            <div className="w-full">
                                <p>Next Stock in:</p>
                                <div className="w-full rounded-[10px] bg-[#222222] h-[30px] grid items-center">
                                    <p>{ }</p>
                                </div>
                            </div>
                            :
                            <p>Loading</p>
                    }

                </div>
            </div>
        </>
    )
}