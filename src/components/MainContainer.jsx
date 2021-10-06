/* eslint-disable no-useless-escape */
import React from 'react';
import DataSection from './DataSection';
import MethodSection from './MethodSection';
import SummarySection from './SummarySection';

export default function MainContainer() {


    const [cart, setCart] = React.useState(null);
    const [deliveryMethod, setDeliveryMethod] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [deliveryPrice, setDeliveryPrice] = React.useState(null);
    const [userData, setUserData] = React.useState(
        {
            email: '', name: '', surname: '', country: 'Polska', address: '', postalCode: '', city: '', phoneNumber: '', emailValidate: true, nameValidate: true, surnameValidate: true, addressValidate: true, postalCodeValidate: true, cityValidate: true, phoneNumberValidate: true
        }
    );
    const [isLogin, setIsLogin] = React.useState(false);
    const [login, setLogin] = React.useState({username: '', password: ''});

    const validateForm = e => {
        e.preventDefault();
        const patternText = new RegExp('^[A-Z][a-z]{2,50}$');
        const patternAddress = new RegExp('^[A-Za-z0-9 \/]{2,99}$');
        const patternEmail = new RegExp('^[A-Za-z0-9._]{2,}@[a-z]{1,}[.][a-z]{1,}$');
        const patternPostalCode = new RegExp('^[0-9]{2}[-][0-9]{3}$');
        const patternPhoneNumber = new RegExp('^[0-9]{9}$');
        setUserData({...userData, 
            emailValidate: patternEmail.test(userData.email), nameValidate: patternText.test(userData.name), surnameValidate: patternText.test(userData.surname), addressValidate: patternAddress.test(userData.address), postalCodeValidate: patternPostalCode.test(userData.postalCode), cityValidate: patternText.test(userData.city), phoneNumberValidate: patternPhoneNumber.test(userData.phoneNumber)
        });
    }

    const toLoginUser = e => {
        e.preventDefault();
        setIsLogin(!isLogin);
    }

    React.useEffect(() => {
        const path = document.location.pathname.slice(1) || 1;
        fetch(`http://localhost:3000/${path}`)
        .then(response => response.json())
        .then(data => setCart(data));
    }, [])



    return (
        <main className='main'>
            <form className="form" onSubmit={e => validateForm(e)}>
                <DataSection userData={userData} setUserData={setUserData} setIsLogin={setIsLogin} isLogin={isLogin} toLoginUser={toLoginUser} login={login} setLogin={setLogin}/>
                <MethodSection setDeliveryMethod={setDeliveryMethod} setPaymentMethod={setPaymentMethod} setDeliveryPrice={setDeliveryPrice} />
                <SummarySection  cart={cart ? cart[0].products : null} deliveryPrice={deliveryPrice ? deliveryPrice : null} userData={userData}/>
            </form>
        </main>
    )
}
