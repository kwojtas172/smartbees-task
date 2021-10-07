/* eslint-disable no-useless-escape */
import React from 'react';
import DataSection from './DataSection';
import MethodSection from './MethodSection';
import SummarySection from './SummarySection';


const url = 'https://smartbees-api.herokuapp.com'; //url for fetch

export default function MainContainer() {


    const [cart, setCart] = React.useState([{}]); //cart, default null, filled after fetch
    const [deliveryMethod, setDeliveryMethod] = React.useState(true); //delivery method from 2. section of form
    const [deliveryPrice, setDeliveryPrice] = React.useState(null); //delivery price from 2. section of form
    const [paymentMethod, setPaymentMethod] = React.useState(true); //payment method from 3. section of form
    const [userData, setUserData] = React.useState(
        {
            email: '', name: '', surname: '', country: 'Polska', address: '', postalCode: '', city: '', phoneNumber: '', emailValidate: true, nameValidate: true, surnameValidate: true, addressValidate: true, postalCodeValidate: true, cityValidate: true, phoneNumberValidate: true
        }
    ); //obj for dara user (fields from 1. section of form) - fields with suffix to use for validate form
    const [isLogin, setIsLogin] = React.useState(false); //true shows login modal, false to hide login modal
    const [login, setLogin] = React.useState({username: '', password: ''}); //obj for send to login
    const [isBadLogin, setIsBadLogin] = React.useState(null); //hide or show wrong info for unsuccesfull login
    const [discountCode, setDiscountCode] = React.useState(0); //filled after fetch from db - to use to calculate discount (eg. value 20 means 20% of discount)
    const [discountCodeInfo, setDiscountCodeInfo] = React.useState(''); //hide or show wrong info for send diascount code (when a less character or code is inactive or not found)
    const [isMarkedRules, setIsMarkedRules] = React.useState('unchecked'); //checked or unchecked - checkbox with read rules
    const [orderSummary, setOrderSummary] = React.useState(''); //true to show succesfull sending form with order to API

    //method to validate and sending complete form with order
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

        if(userData.emailValidate && userData.nameValidate && userData.surnameValidate && userData.addressValidate && userData.postalCodeValidate && userData.cityValidate && userData.phoneNumberValidate && typeof deliveryMethod === 'string' && typeof paymentMethod === 'string' && isMarkedRules === 'checked') {

            const data = {
                user: {
                   name: userData.name,
                   surname: userData.surname,
                   email: userData.email,
                   address: userData.address,
                   phoneNumber: userData.phoneNumber,
                   postalCode: userData.postalCode,
                   city: userData.city 
                },
                order: {
                    deliveryMethod, paymentMethod, deliveryPrice, discountCode, products: cart[0].products ? cart[0].products : null
                }
            };

            fetch(`${url}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.insertedId) {
                    setOrderSummary(`Dziękujemy za złożenie zamówienia. Nr zamówienia to: ${data.insertedId}!`);

                } else setOrderSummary('Ups, coś poszło nie tak, spróbuj ponownie.');
            })
            .catch(err => console.log(err))


        } else {
            if(typeof deliveryMethod !== 'string') setDeliveryMethod(false);
            if(typeof paymentMethod !== 'string') setPaymentMethod(false);
            if(isMarkedRules !== 'checked') setIsMarkedRules(false)


        }
    }

    //method to login (after success fetch some field from 1. section of form will be automatic fill) login: johndoe99, password: 123
    const toLoginUser = e => {
        e.preventDefault();
        console.log(login);
        if(login.username.length > 2 && login.password.length > 2) {
            fetch(`${url}/users`, {
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

    //method for fetch discount after input
    const handleSendDiscountCode = e => {
        e.preventDefault();
        if(discountCode.length > 0) {
            setDiscountCodeInfo('');
            const data = {code: discountCode};
            fetch(`${url}/discounts`, {
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

    //method is working after mounted component - fetch basic data (cart from /carts), '/' will redirect to '/1', possibile pathes: '/1' - '/5'
    React.useEffect(() => {
        const path = document.location.pathname.slice(1) || 1;
        fetch(`${url}/${path}`)
        .then(response => response.json())
        .then(data => setCart(data))
        .catch(err => console.log(err))
    }, [])



    return (
        <main className='main'>
            <form className="form" onSubmit={e => validateFormAndSend(e)}>
                <DataSection userData={userData} setUserData={setUserData} setIsLogin={setIsLogin} isLogin={isLogin} toLoginUser={toLoginUser} login={login} setLogin={setLogin} isBadLogin={isBadLogin} />
                <MethodSection setDeliveryMethod={setDeliveryMethod} setPaymentMethod={setPaymentMethod} setDeliveryPrice={setDeliveryPrice} discountCode={discountCode} setDiscountCode={setDiscountCode} handleSendDiscountCode={handleSendDiscountCode} discountCodeInfo={discountCodeInfo}/>
                <SummarySection  cart={cart ? cart[0].products : null} deliveryPrice={deliveryPrice ? deliveryPrice : null} userData={userData} discountCode={discountCode} deliveryMethod={deliveryMethod} paymentMethod={paymentMethod} isMarkedRules={isMarkedRules} setIsMarkedRules={setIsMarkedRules} orderSummary={orderSummary}/>
            </form>
        </main>
    )
}
