
import Slider from "../components/Slider"
import Section1 from "../components/Section1"
import ListProduct from '../components/ListProduct'
import Section3 from "../components/Section3"
import { useEffect } from "react"


const Home = () => {
    useEffect(() => {
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const idAccount = localStorage.getItem("idAccount");
        const role = localStorage.getItem("role");
        
    }, [])
    return (
        <div>
            <Slider />
            <main>
                <Section1 />
                <ListProduct />
                <Section3 />

            </main>
        </div>
    )
}

export default Home