import { Link } from "react-router-dom"


const DontPermission = () => {
    return (
        <div class="d-flex justify-content-center 
                align-items-center">
            <div class="col-md-12 text-center">
                <h1>403</h1>
                <h2>You dont't have permission</h2>
                <p>
                    Sorry, the page you are looking
                    for does not exist.
                </p>
                <Link>Go back</Link>
            </div>
        </div>
    )
}
export default DontPermission