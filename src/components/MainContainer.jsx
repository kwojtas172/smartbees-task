import React from 'react';
import DataSection from './DataSection';
import MethodSection from './MethodSection';
import SummarySection from './SummarySection';

export default function MainContainer() {


    const [cart, setCart] = React.useState([
        {
            name: 'Produkt testowy nr 1',
            price: 115,
            quantity: 1,
            image: null
        }
    ])



    return (
        <main className='main'>
            <form className="form">
                <DataSection />
                <MethodSection />
                <SummarySection cart={cart} />
            </form>
        </main>
    )
}
