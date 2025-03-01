import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ShowProjet() {
  const navigate = useNavigate();
  const { id } = useParams();

  const projet = useSelector((state) =>
    state.projets.find((projet) => projet.id.toString() === id)
  );

  const [personnes, setPersonnes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (projet) {
      axios
        .get(`http://127.0.0.1:8000/api/projets/${projet.id}/personnes`)
        .then((response) => {
          setPersonnes(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching personnes:", error);
          setError("Failed to fetch associated personnes.");
          setLoading(false);
        });
    }
  }, [projet]);

  if (!projet) {
    return <div className="text-center mt-4">Projet not found</div>;
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="card max-w-2xl w-full border-sh">
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

          <div className="collapse collapse-arrow mt-6" onClick={(e) => e.currentTarget.classList.toggle('collapse-open')}>
            <div className="collapse-title text-2xl font-semibold px-0">Associated Personnes</div>
            <div className="collapse-content px-0">
              {loading ? (
                <div className="text-center">Loading personnes...</div>
              ) : error ? (
                <div className="text-center text-error">{error}</div>
              ) : personnes.length === 0 ? (
                <div className="text-center">No personnes found.</div>
              ) : (
                <div className="overflow-x-auto text-lg rounded-lg">
                  <table className="table text-center">
                    <thead>
                      <tr className="bg-base-300">
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Email</th>
                        <th>Telephon</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personnes.map((personne) => (
                        <tr
                          key={personne.id}
                          className="hover:bg-base-200 hover:cursor-pointer"
                          onClick={() => navigate(`/personnes/${personne.id}`)}
                        >
                          <td>{personne.id}</td>
                          <td>{personne.nom}</td>
                          <td>{personne.prenom}</td>
                          <td>{personne.email}</td>
                          <td>{personne.tele}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}