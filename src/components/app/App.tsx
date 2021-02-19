import React from 'react';
import SliderWrapper from '../slider/SliderWrapper.component';

function App() {
    return (
        <div className="flex h-screen bg-white dark:bg-black">
            <div style={{width: '401px'}} className="box-border m-auto p-8">
                <SliderWrapper></SliderWrapper>
            </div>
        </div>
    );
}

export default App;
