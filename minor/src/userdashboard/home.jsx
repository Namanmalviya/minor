import Syntax from "./Syntax"
import innovation from './innovation.json'
function Home(props){

    return(<>
    <Syntax type={innovation} label='innovation' />
    </>)
}
export default Home