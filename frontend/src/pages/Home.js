
import Slider from "../components/Slider"
import Section1 from "../components/Section1"
import ListProduct from '../components/ListProduct'
import Section3 from "../components/Section3"


const Home = () => {

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