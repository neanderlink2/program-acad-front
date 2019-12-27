import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseWrapper } from '../../components/firebase-wrapper';
import { RootState } from '../../configs/store';
import { increment, decrement } from '../../modules/counter/actions';


const HomeScreen = () => {
    return (
        <div>
            <FirebaseWrapper></FirebaseWrapper>
        </div>
    );
}

export default HomeScreen;