import React from 'react';
import imgItem from '../images/image.svg';

export default function SummarySection({cart}) {

    const [reduce, setReduce] = React.useState(0);

    React.useEffect(() => {
        setReduce(cart.reduce((prev, curr) => {
            return prev+curr.price
        }, 0))
    }, [cart])

    return (
        <section className='form-section'>
            <fieldset className='form-section__col'>
                <legend className='form-section__name'>4. PODSUMOWANIE</legend>
                {cart.map(item => {
                    return (
                        <div className='summary-item'>
                            <img src={item.img? item.img :imgItem} alt={item.name} className='summary-item__img' />
                            <p className='summary-item__name'>{item.name}</p>
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
                        <p className='summary-reduced__text'>{reduce.toFixed(2).replace('.',',')} zł</p>
                    </div>
                    <div className='summary-reduced__desc'>
                        <p className='summary-reduced__text summary-reduced__text--bold'>Łącznie</p>
                        <p className='summary-reduced__text summary-reduced__text--bold'>{reduce.toFixed(2).replace('.',',')} zł</p>
                    </div>
                    <p className='form-section__line'></p>
                </div>
                <textarea className='form-section__input form-section__input--textarea' placeholder='Komentarz'/>
                <label className='form-section__label form-section__label--wrapper-choose-field'>
                <input className='form-section__input' type='checkbox' />
                    Zapisz się, aby otrzymywać newsletter
                </label>
                <label className='form-section__label'>
                <input className='form-section__input form-section__label--wrapper-choose-field' type='checkbox' />
                    Zapoznałam/em się z <a href="#null" className='form-section__link'>Regulaminem</a> zakupów
                </label>
                <button className='form-section__btn form-section__btn--primary'>POTWIERDŹ ZAKUP</button>
            </fieldset>
        </section>
    )
}
