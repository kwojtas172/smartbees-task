import React from 'react';
import inpostIcon from '../images/inpost.svg';
import dpdIcon from '../images/dpd.svg';
import payuIcon from '../images/payU.svg';
import cashIcon from '../images/wallet.svg';
import bankIcon from '../images/bank.svg';

export default function MethodSection() {
    return (
        <section className='form-section'>
            <fieldset className='form-section__col'>
                <legend className='form-section__name'>2. METODA DOSTAWY</legend>
                <label className='form-section__label'>
                    <input className='form-section__input' type='radio' value='inpost' name='Inpost' />
                    <img src={inpostIcon} alt='inpost-icon' className='form-section__img' />
                    <span>Paczkomaty 24/7</span>
                    <span>10,99 zł</span>
                </label>
                <label className='form-section__label'>
                    <input className='form-section__input' type='radio' value='inpost' name='Inpost' />
                    <img src={dpdIcon} alt='dpd-icon' className='form-section__img' />
                    <span>Kurier DPD</span>
                    <span>18,00 zł</span>
                </label>
                <label className='form-section__label'>
                    <input className='form-section__input' type='radio' value='inpost' name='Inpost' />
                    <img src={dpdIcon} alt='dpd-icon' className='form-section__img' />
                    <span>Kurier DPD pobranie</span>
                    <span>22,00 zł</span>
                </label>
            </fieldset>
            <fieldset className='form-section__col'>
                <legend className='form-section__name'>3. METODA PŁATNOŚCI</legend>
                <label className='form-section__label'>
                    <input className='form-section__input' type='radio' value='inpost' name='Inpost' />
                    <img src={payuIcon} alt='payu-icon' className='form-section__img' />
                    <span>PayU</span>
                </label>
                <label className='form-section__label'>
                    <input className='form-section__input' type='radio' value='inpost' name='Inpost' />
                    <img src={cashIcon} alt='cash-icon' className='form-section__img' />
                    <span>Płatność przy odbiorze</span>
                </label>
                <label className='form-section__label'>
                    <input className='form-section__input' type='radio' value='inpost' name='Inpost' />
                    <img src={bankIcon} alt='bank-icon' className='form-section__img' />
                    <span>Przelew bankowy - zwykły</span>
                </label>
                <button className='form-section__btn form-section__btn--secondary'>Dodaj kod rabatowy</button>
            </fieldset>
        </section>
    )
}
