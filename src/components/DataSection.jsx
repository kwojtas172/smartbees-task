import React from 'react'

export default function DataSection() {
    return (
        <section className='form-section'>
            <fieldset className='form-section__col'>
                <legend className='form-section__name'>1. TWOJE DANE</legend>
                <button className='form-section__btn'>Logowanie</button>
                <label className='form-section__desc'>Masz już konto? Kliknij żeby się zalogować.</label>
                
                <label className='form-section__label form-section__label--wrapper-choose-field'>
                <input className='form-section__input' type='checkbox' />
                    Stwórz nowe konto
                </label>
                <input className='form-section__input' placeholder='Nazwa użytkownika'/>
                <input className='form-section__input' placeholder='Hasło'/>
                <input className='form-section__input' placeholder='Potwierdź hasło'/>
                <input className='form-section__input' placeholder='Imię'/>
                <input className='form-section__input' placeholder='Nazwisko'/>
                <select className='form-section__input form-section__select'>
                    <option className='form-section__option' value="Zagranica">Zagranica</option>
                    <option className='form-section__option' selected value="Polska">Polska</option>
                </select>
                <input className='form-section__input' placeholder='Adres'/>
                <label className='form-section__label'>
                    <input className='form-section__input form-section__input--small' placeholder='Kod pocztowy'/>
                    <input className='form-section__input form-section__input--small' placeholder='Miasto' required/>
                </label>
                <input className='form-section__input' placeholder='Telefon'/>
                <label className='form-section__label form-section__label--wrapper-choose-field'>
                    <input className='form-section__input' type='checkbox' />
                    Dostawa pod inny adres
                </label>
            </fieldset>
        </section>
    )
}
