import Info from './Info'
import research from './research.json'
import Syntax from './Syntax';
function Researchinfo(){

    return(<>
    <Syntax type={research} label='Research' link="researchinfo" />
   
    </>);
}
export default Researchinfo