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
    const [isBadLogin, setIsBadLogin] = React.useState(null);
    const [discountCode, setDiscountCode] = React.useState('');
    const [discountCodeInfo, setDiscountCodeInfo] = React.useState('');

    const validateFormAndSend = e => {
        e.preventDefault();
        const patternText = new RegExp('^[A-Z][a-z]{2,50}$');
        const patternAddress = new RegExp('^[A-Za-z0-9 \/]{2,99}$');
        const patternEmail = new RegExp('^[A-Za-z0-9._]{2,}@[a-z]{1,}[.][a-z]{1,}$');
        const patternPostalCode = new RegExp('^[0-9]{2}[-][0-9]{3}$');
        const patternPhoneNumber = new RegExp('^[0-9]{9}$');

        setUserData({...userData, 
            emailValidate: patternEmail.test(userData.email), nameValidate: patternText.test(userData.name), surnameValidate: patternText.test(userData.surname), addressValidate: patternAddress.test(userData.address), postalCodeValidate: patternPostalCode.test(userData.postalCode), cityValidate: patternText.test(userData.city), phoneNumberValidate: patternPhoneNumber.test(userData.phoneNumber)
        });

        if(userData.emailValidate && userData.nameValidate && userData.surnameValidate && userData.addressValidate && userData.postalCodeValidate && userData.cityValidate && userData.postalCodeValidate) {

            // const data = {

            // }
            // fetch('http://localhost:3000/orders', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //       },
            //     body: JSON.stringify(data)
            // })
        }
    }

    const toLoginUser = e => {
        e.preventDefault();
        console.log(login);
        if(login.username.length > 2 && login.password.length > 2) {
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(login)
            })
            .then(response => response.json())
            .then(data => {
                if(data.response === 'user or password not found') {
                    setIsBadLogin('login i/lub hasło nieprawidłowe')
                } else {
                    setIsLogin(!isLogin);
                    setIsBadLogin(null);
                    setUserData({...userData, email: data.email, name: data.name, surname: data.surname, address: data.address, postalCode: data.postalCode, city: data.city, phoneNumber: data.phoneNumber})
                }
            })
        } else setIsBadLogin('Uzupełnij pola - login i hasło powinny zawierać co najmniej 3 znaki.')
    }

    const handleSendDiscountCode = e => {
        e.preventDefault();
        if(discountCode.length > 0) {
            console.log('działa');
            setDiscountCodeInfo('');
            const data = {code: discountCode};
            fetch('http://localhost:3000/discounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            })
            .then(resposne => resposne.json())
            .then(data => {
                if(data.response === 'code not found or is not active') {
                    setDiscountCodeInfo('Kod nieprawidłowy lub nieaktywny!')
                } else {
                    setDiscountCodeInfo('');
                    setDiscountCode(Number(data.value));
                }
            })
            .catch(err => console.log(err))
        } else {
            setDiscountCodeInfo('Wpisz kod!')
        }
    }

    React.useEffect(() => {
        const path = document.location.pathname.slice(1) || 1;
        fetch(`http://localhost:3000/${path}`)
        .then(response => response.json())
        .then(data => setCart(data))
        .catch(err => console.log(err))
    }, [])



    return (
        <main className='main'>
            <form className="form" onSubmit={e => validateFormAndSend(e)}>
                <DataSection userData={userData} setUserData={setUserData} setIsLogin={setIsLogin} isLogin={isLogin} toLoginUser={toLoginUser} login={login} setLogin={setLogin} isBadLogin={isBadLogin} />
                <MethodSection setDeliveryMethod={setDeliveryMethod} setPaymentMethod={setPaymentMethod} setDeliveryPrice={setDeliveryPrice} discountCode={discountCode} setDiscountCode={setDiscountCode} handleSendDiscountCode={handleSendDiscountCode} discountCodeInfo={discountCodeInfo}/>
                <SummarySection  cart={cart ? cart[0].products : null} deliveryPrice={deliveryPrice ? deliveryPrice : null} userData={userData} discountCode={discountCode}/>
            </form>
        </main>
    )
}
