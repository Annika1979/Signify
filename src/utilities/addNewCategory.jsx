import { useStates } from './states';

export default function CategoryAdd(props) {

  let s = useStates('main');
  let { bindTo,showAllOption } = props;
  let [bindObject, bindProperty] = bindTo;

  return <select {...bindObject.bind(bindProperty)}>
    
    
    
    {(s.categories ).map(({ name, id }) =>
      <option key={id} value={id}>{name}</option>
    )}
  </select>


}


