'use client'
import { redirect } from "next/navigation"

const Home = () => {
    return (
        <>
            <>You are logged in</>
            <div>
                <button onClick={()=>redirect("/dashboard")}>Go to Dashboard</button>
            </div>
        </>
    )
}
export default Home;