import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../configs/store';
import { increment, decrement } from './actions';

export function useContagemState() {
    const dispatch = useDispatch();
    const contagem = useSelector((state: RootState) => state.counter.count);
    const incrementar = () => dispatch(increment());
    const decrementar = () => dispatch(decrement());

    return { contagem, incrementar, decrementar };
}