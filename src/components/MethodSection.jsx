import React from 'react';
import inpostIcon from '../images/inpost.svg';
import dpdIcon from '../images/dpd.svg';
import payuIcon from '../images/payU.svg';
import cashIcon from '../images/wallet.svg';
import bankIcon from '../images/bank.svg';

export default function MethodSection({setDeliveryMethod, setPaymentMethod, setDeliveryPrice}) {

    const [inputIsChecked, setInputIchChecked] = React.useState(
        {
            inpost: false,
            dpd: false,
            dpdCash: false
        }
    )

    const lockInputRadio = e => {
        const copyInputIsChecked = {
            inpost: false,
            dpd: false,
            dpdCash: false
        };
        setInputIchChecked({...copyInputIsChecked, [e.target.value]: true});
        setDeliveryMethod(e.target.value);
        setDeliveryPrice(Number(e.target.dataset.price))
        setPaymentMethod('');
    }

    return (
        <section className='form-section'>
            <fieldset className='form-section__col'>
                <legend className='form-section__name'>2. METODA DOSTAWY</legend>
                <label className='form-section__label'>
                    <input onClick={e=>lockInputRadio(e)} className='form-section__input' type='radio' name='delivery' value='inpost' data-price='10.99'/>
                    <img src={inpostIcon} alt='inpost-icon' className='form-section__img' />
                    <span>Paczkomaty 24/7</span>
                    <span className='form-section__span-price'>10,99 zł</span>
                </label>
                <label className='form-section__label'>
                    <input onClick={e=>lockInputRadio(e)} className='form-section__input' type='radio' name='delivery' value='dpd' data-price='18'/>
                    <img src={dpdIcon} alt='dpd-icon' className='form-section__img' />
                    <span>Kurier DPD</span>
                    <span className='form-section__span-price'>18,00 zł</span>
                </label>
                <label className='form-section__label'>
                    <input onClick={e=>lockInputRadio(e)} className='form-section__input' type='radio' value='dpdCash' name='delivery' data-price='22'/>
                    <img src={dpdIcon} alt='dpd-icon' className='form-section__img' />
                    <span>Kurier DPD pobranie</span>
                    <span className='form-section__span-price'>22,00 zł</span>
                </label>
            </fieldset>
            <fieldset className='form-section__col'>
                <legend className='form-section__name'>3. METODA PŁATNOŚCI</legend>
                {!inputIsChecked.dpdCash ? <label className='form-section__label'>
                    <input onClick={e => setPaymentMethod(e.target.value)} className='form-section__input' type='radio' value='payU' name='payment'/>
                    <img src={payuIcon} alt='payu-icon' className='form-section__img' />
                    <span>PayU</span>
                </label> : null}
                {!(inputIsChecked.inpost || inputIsChecked.dpd) ? <label className='form-section__label'>
                    <input onClick={e => setPaymentMethod(e.target.value)} className='form-section__input' type='radio' value='cash' name='payment' />
                    <img src={cashIcon} alt='cash-icon' className='form-section__img' />
                    <span>Płatność przy odbiorze</span>
                </label>: null}
                {!inputIsChecked.dpdCash ? <label className='form-section__label'>
                    <input onClick={e => setPaymentMethod(e.target.value)} className='form-section__input' type='radio' value='bank' name='payment' />
                    <img src={bankIcon} alt='bank-icon' className='form-section__img' />
                    <span>Przelew bankowy - zwykły</span>
                </label> : null}
                <button className='form-section__btn form-section__btn--secondary'>Dodaj kod rabatowy</button>
            </fieldset>
        </section>
    )
}
