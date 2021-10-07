import React from 'react';
import imgItem from '../images/image.svg';

export default function SummarySection({cart, deliveryPrice, userData, discountCode, deliveryMethod, paymentMethod, isMarkedRules, setIsMarkedRules, orderSummary}) {

    const [reduce, setReduce] = React.useState(0); //to calculate for each product from cart (from props)
    const [totalPrice, setTotalPrice] = React.useState(0); //to sum for reduce with discount (optional) and with delivery


    //method to calculate total price
    React.useEffect(() => {
        setReduce(cart?.reduce((prev, curr) => {
            return prev+curr.price*curr.quantity
        }, 0));
        if(isNaN(deliveryPrice)) setTotalPrice(reduce) //waiting for choice delivery method
        if(!(discountCode > 0)) setTotalPrice(reduce + deliveryPrice); //adding discount code, if 20, discount is 20%
        setTotalPrice((reduce + deliveryPrice) - (reduce + deliveryPrice)*discountCode/100) //total
    }, [cart, reduce, deliveryPrice, discountCode])

    return (
        <section className='form-section'>
            <fieldset className='form-section__col'>
                <legend className='form-section__name'>4. PODSUMOWANIE</legend>
                {cart?.map((item, index) => {
                    return (
                        <div className='summary-item' key={index}>
                            <img src={item.img? item.img :imgItem} alt={item.name} className='summary-item__img' />
                            <p className='summary-item__name'>Produkt nr {item.productId}</p>
                            <p className='summary-item__price'>{item.price.toFixed(2).replace('.', ',')} zł</p>
                            <p className='summary-item__quantity'>
                                Ilość: {item.quantity}
                            </p>
                        </div>
                    )
                })}
                <p className='form-section__line'></p>
                <div className='summary-reduced'>
                    <div className='summary-reduced__desc'>
                        <p className='summary-reduced__text'>Suma częściowa</p>
                        <p className='summary-reduced__text'>{reduce?.toFixed(2).replace('.',',')} zł</p>
                    </div>
                    {deliveryPrice ? <div className='summary-reduced__desc'>
                        <p className='summary-reduced__text'>Dostawa</p>
                        <p className='summary-reduced__text'>{deliveryPrice?.toFixed(2).replace('.',',')} zł</p>
                    </div> : null}
                    {discountCode > 0 ? <div className='summary-reduced__desc'>
                        <p className='summary-reduced__text'>Rabat</p>
                        <p className='summary-reduced__text'>{(totalPrice*discountCode/100)?.toFixed(2).replace('.',',')} zł</p>
                    </div> : null}
                    <div className='summary-reduced__desc'>
                        <p className='summary-reduced__text summary-reduced__text--bold'>Łącznie</p>
                        <p className='summary-reduced__text summary-reduced__text--bold'>{isNaN(totalPrice) ? null : totalPrice?.toFixed(2).replace('.',',')} zł</p>
                    </div>
                    <p className='form-section__line'></p>
                </div>
                <textarea className='form-section__input form-section__input--textarea' placeholder='Komentarz'/>
                <label className='form-section__label form-section__label--wrapper-choose-field'>
                <input className='form-section__input' type='checkbox' />
                    <span className='span-checkbox'>Zapisz się, aby otrzymywać newsletter</span>
                </label>
                <label className='form-section__label form-section__label--wrapper-choose-field'>
                <input className='form-section__input' type='checkbox' onClick={() => setIsMarkedRules(isMarkedRules === 'checked' ? 'unchecked' : 'checked')} />
                    <span className='span-checkbox'>Zapoznałam/em się z <a href="#null" className='form-section__link'>Regulaminem</a> zakupów</span>
                </label>
                {(!userData.emailValidate || !userData.nameValidate || !userData.surnameValidate || !userData.addressValidate || !userData.postalCodeValidate || !userData.cityValidate || !userData.phoneNumberValidate || !deliveryMethod || !paymentMethod || !isMarkedRules) ? <div className='modal_wrong-info'> {/* when some field is not validated to show this */}
                <span>Popraw dane!</span>
                {!userData.emailValidate ? <span>Wpisz poprawny e-mail.</span>: null}
                {!userData.nameValidate ? <span>Wpisz imię składające się tylko z liter (pierwsza litera musi być duża).</span>: null}
                {!userData.surnameValidate ? <span>Wpisz nazwisko składające się tylko z liter (pierwsza litera musi być duża).</span>: null}
                {!userData.addressValidate ? <span>Wpisz poprawny adres (zacznij dużą literą).</span>: null}
                {!userData.postalCodeValidate ? <span>Wpisz poprawny kod pocztowy (cyfry w formacie XX-XXX).</span>: null}
                {!userData.cityValidate ? <span>Wpisz poprawną nazwę miasta (tylko litery, pierwsza musi być duża).</span>: null}
                {!userData.phoneNumberValidate ? <span>Wpisz poprawny numer telefonu (9 cyfr).</span>: null}
                {!deliveryMethod ? <span>Wybierz metodę dostawy.</span>: null}
                {!paymentMethod ? <span>Wybierz metodę płatności.</span>: null}
                {!isMarkedRules ? <span>Zaznacz zapoznanie się z regulaminem.</span>: null}
                </div> : null}
                <button className='form-section__btn form-section__btn--primary' type='submit'>POTWIERDŹ ZAKUP</button>
            </fieldset>
            {orderSummary ? <div className='modal-summary'>
                {orderSummary}
                <button className='modal-summary__btn' onClick={() => {window.location.reload()}}>ok</button> {/* after confirmation sending form you can reload site */}
            </div> : null}
        </section>
    )
}
