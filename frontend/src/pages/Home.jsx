import { Banner } from '../components/Banner'
import { Hero } from '../components/Hero'
import { PopularProducts } from '../components/PopularProducts'

export const Home = () => {
    return (
        <>
            <Hero />
            <PopularProducts />
            <Banner />
        </>
    )
}
