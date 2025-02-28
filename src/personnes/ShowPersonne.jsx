import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function ShowPersonne() {
  const navigate = useNavigate();
  const { id } = useParams();

  const personne = useSelector((state) =>
    state.personnes.find((personne) => personne.id.toString() === id)
  );

  if (!personne) {
    return <div className="text-center mt-4">Personne not found</div>;
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="personned flex-col-reverse lg:personned-side max-w-[1020px] w-full border-sh">
        <div className="personned-body p-6 min-w-[360px] gap-3">
          <div className="flex gap-4 justify-between items-center mb-6">
            <div className="flex gap-2 items-center">
              <h1 className="text-3xl text-center">Personne Details</h1>
              <span className="badge badge-outline badge-lg mt-1">
                {personne.id}
              </span>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-sm w-11 btn-outline btn-square mt-1"
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          </div>

          <div className="flex gap-3 text-lg justify-between capitalize">
            <div className="font-semibold">Prenom</div>
            <div>{personne.nom}</div>
          </div>

          <div className="flex gap-3 text-lg justify-between capitalize">
            <div className="font-semibold">Prenom</div>
            <div>{personne.prenom}</div>
          </div>

          <div className="flex gap-3 text-lg justify-between">
            <div className="font-semibold">Email</div>
            <div>{personne.email}</div>
          </div>

          <div className="flex gap-3 text-lg justify-between">
            <div className="font-semibold">Telephone</div>
            <div>{personne.tele}</div>
          </div>
        </div>
      </div>
    </div>
  );
}