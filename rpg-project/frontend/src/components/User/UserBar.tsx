import "../../style/userbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faGem, faFeather } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../hooks/UserContext";

const UserBar = () => {
    const { money } = useUserContext();

    return (
        <div className="top-bar d-flex">
            <h4>THE FOREST </h4>
            <div className="consumables">
                <div className="tab energy">
                    <FontAwesomeIcon icon={faBolt} /> <p> Energy 25/25</p>
                </div>
                <div className="tab gems">
                    <FontAwesomeIcon icon={faGem} /> <p> GEMS 15</p>
                </div>
                <div className="tab feather">
                    <FontAwesomeIcon icon={faFeather} /> <p> Feathers 75</p>
                </div>
            </div>
        </div>
    );
};

export default UserBar;
