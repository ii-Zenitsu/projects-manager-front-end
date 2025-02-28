import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

function EditProjet({ projet, setProjet, projets }) {
  const dispatch = useDispatch();

  function cancelEdit() {
    document.getElementById("modifyModal").close();
  }

  function calculateDateFin(dateDebut, duree) {
    const date = new Date(dateDebut);
    date.setDate(date.getDate() + duree);
    return date.toISOString().split("T")[0];
  }

  function handleEdit(e) {
    e.preventDefault();

    const dateFin = calculateDateFin(projet.dateDebut, projet.duree);

    const updatedProjet = { ...projet, dateFin };

    axios
      .put(`http://127.0.0.1:8000/api/projets/${projet.id}`, updatedProjet)
      .then(() => {
        cancelEdit();
        dispatch({
          type: "UPDATE_PROJETS",
          payload: projets.map((p) => (p.id === projet.id ? updatedProjet : p)),
        });
      })
      .catch((error) => console.error("Error updating projet:", error));
  }

  return (
    <div className="px-4">
      <div className="flex flex-wrap justify-between items-center gap-6 mb-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl text-center">Edit Projet</h1>
          <span className="badge badge-outline badge-lg mt-2">{projet.id}</span>
        </div>
      </div>

      <form onSubmit={handleEdit} className="space-y-4 flex flex-col">
        <label className="form-control w-full max-w-2xl">
          <div className="label">
            <span className="label-text">Intitule</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={projet.intitule || ""}
            onChange={(e) => setProjet({ ...projet, intitule: e.target.value })}
            required
          />
        </label>

        <label className="form-control w-full max-w-2xl">
          <div className="label">
            <span className="label-text">Date Debut</span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full"
            value={projet.dateDebut || ""}
            onChange={(e) => setProjet({ ...projet, dateDebut: e.target.value })}
            required
          />
        </label>

        <label className="form-control w-full max-w-2xl">
          <div className="label">
            <span className="label-text">Duree (Days)</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full"
            value={projet.duree || ""}
            onChange={(e) => setProjet({ ...projet, duree: e.target.value })}
            min="1"
            required
          />
        </label>

        <div className="flex justify-between mt-4">
          <button type="button" onClick={cancelEdit} className="btn btn-outline">
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faCheck} /> Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProjet;