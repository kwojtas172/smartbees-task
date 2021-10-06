import React from 'react';
import DataSection from './DataSection';
import MethodSection from './MethodSection';
import SummarySection from './SummarySection';

export default function MainContainer() {


    const [cart, setCart] = React.useState(null);
    const [deliveryMethod, setDeliveryMethod] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [deliveryPrice, setDeliveryPrice] = React.useState(null)


    React.useEffect(() => {
        const path = document.location.pathname.slice(1) || 1;
        fetch(`http://localhost:3000/${path}`)
        .then(response => response.json())
        .then(data => setCart(data));
    }, [])



    return (
        <main className='main'>
            <form className="form">
                <DataSection />
                <MethodSection setDeliveryMethod={setDeliveryMethod} setPaymentMethod={setPaymentMethod} setDeliveryPrice={setDeliveryPrice} />
                <SummarySection  cart={cart ? cart[0].products : null} deliveryPrice={deliveryPrice ? deliveryPrice : null}/>
            </form>
        </main>
    )
}
