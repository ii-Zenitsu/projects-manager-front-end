import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function ShowProjet() {
  const navigate = useNavigate();

  const { id } = useParams();
  const projet = useSelector((state) =>
    state.projets.find((projet) => projet.id.toString() === id)
  );

  if (!projet) {
    return <div className="text-center mt-4">Projet not found</div>;
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="card max-w-xl w-full border-sh">
        <div className="card-body p-6">
          <div className="flex gap-4 justify-between items-center mb-6">
            <div className="flex gap-2 items-center">
              <h1 className="text-3xl text-center">Projet Details</h1>
              <span className="badge badge-outline badge-lg mt-1">{projet.id}</span>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-sm w-11 btn-outline btn-square mt-1"
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          </div>

          <div className="flex gap-3 text-lg justify-between">
            <div className="font-semibold">Intitule</div>
            <div>{projet.intitule}</div>
          </div>

          <div className="flex gap-3 text-lg justify-between">
            <div className="font-semibold">Date Debut</div>
            <div>{projet.dateDebut}</div>
          </div>

          <div className="flex gap-3 text-lg justify-between">
            <div className="font-semibold">Date Fin</div>
            <div>{projet.dateFin}</div>
          </div>

          <div className="flex gap-3 text-lg justify-between">
            <div className="font-semibold">Duree (Days)</div>
            <div>{projet.duree}</div>
          </div>

        </div>
      </div>
    </div>
  );
}