import React from 'react';
import DataSection from './DataSection';
import MethodSection from './MethodSection';

export default function MainContainer() {
    return (
        <main className='main'>
            <form className="form">
                <DataSection />
                <MethodSection />
            </form>
        </main>
    )
}
