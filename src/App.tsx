import { useEffect } from "react"
import { ItemCard } from "./components/Item";

function App() {



  useEffect(() => {
    console.log(import.meta.env.VITE_GAG_STOCK);

  }, [])

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[600px] w-full">

        {/* <ItemCard
          itemType="Gear"
          itemName="Grandmaster Sprinkler"
          itemImageUrl="/stocks_image/gears/Grandmaster_Sprinkler.webp"
        /> */}
        <ItemCard
          itemType="Seed"
          itemName="Carrot"
          itemImageUrl="/stocks_image/seeds/Carrot.webp"
        />
      </div>
    </div>
  )
}

export default App
