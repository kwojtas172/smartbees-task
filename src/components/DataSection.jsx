import React from 'react'

export default function DataSection({userData, setUserData, setIsLogin, isLogin, toLoginUser, login, setLogin}) {

    const [isNewAccount, setIsNewAccount] = React.useState(false);

    const handleLogin = e => {
        e.preventDefault();
        setIsLogin(!isLogin)
    }

    return (
        <section className='form-section'>
            <fieldset className='form-section__col'>
                <legend className='form-section__name'>1. TWOJE DANE</legend>
                <button className='form-section__btn' onClick={e => handleLogin(e)}>Logowanie</button>
                {isLogin ? <div className='modal-login'>
                    <h3 className='modal-login__title'>Zaloguj się</h3>
                    <input className='form-section__input' type='text' value={login.username} onChange={e => setLogin({...login, username: e.target.value})}/>
                    <input className='form-section__input' type='password' value={login.password} onChange={e => setLogin({...login, password: e.target.value})}/>
                    <button className='form-section__btn--secondary modal-login__btn' onClick={e => toLoginUser(e)}>Ok</button>
                </div> : null}
                <label className='form-section__desc'>Masz już konto? Kliknij żeby się zalogować.</label>
                
                <label className='form-section__label form-section__label--wrapper-choose-field'>
                <input onClick={() => setIsNewAccount(!isNewAccount)} className='form-section__input' type='checkbox' />
                    Stwórz nowe konto
                </label>
                <input className='form-section__input' placeholder='E-mail' value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})}/>
                { isNewAccount ? <input className='form-section__input' placeholder='Hasło'/> : null}
                {isNewAccount ? <input className='form-section__input' placeholder='Potwierdź hasło'/> : null}
                <input className='form-section__input' placeholder='Imię' value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})}/>
                <input className='form-section__input' placeholder='Nazwisko' value={userData.surname} onChange={e => setUserData({...userData, surname: e.target.value})}/>
                <select className='form-section__input form-section__select' value={userData.country} onChange={e => setUserData({...userData, country: e.target.value})}>
                    <option className='form-section__option' value="Zagranica">Zagranica</option>
                    <option className='form-section__option' value="Polska">Polska</option>
                </select>
                <input className='form-section__input' placeholder='Adres' value={userData.address} onChange={e => setUserData({...userData, address: e.target.value})}/>
                <label className='form-section__label'>
                    <input className='form-section__input form-section__input--small' placeholder='Kod pocztowy' value={userData.postalCode} onChange={e => setUserData({...userData, postalCode: e.target.value})}/>
                    <input className='form-section__input form-section__input--small' placeholder='Miasto' value={userData.city} onChange={e => setUserData({...userData, city: e.target.value})} required/>
                </label>
                <input className='form-section__input' placeholder='Telefon' value={userData.phoneNumber} onChange={e => setUserData({...userData, phoneNumber: e.target.value})}/>
                <label className='form-section__label form-section__label--wrapper-choose-field'>
                    <input className='form-section__input' type='checkbox' />
                    Dostawa pod inny adres
                </label>
            </fieldset>
        </section>
    )
}
