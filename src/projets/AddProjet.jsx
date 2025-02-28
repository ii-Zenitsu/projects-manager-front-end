import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

function AddProjet({ projets }) {
  const dispatch = useDispatch();

  const [projet, setProjet] = useState({
    intitule: "",
    dateDebut: "",
    duree: "",
  });

  function cancelAdd() {
    document.getElementById("addModal").close();
    setProjet({
      intitule: "",
      dateDebut: "",
      duree: "",
    });
  }

  function calculateDateFin(dateDebut, duree) {
    const date = new Date(dateDebut);
    date.setDate(date.getDate() + parseInt(duree, 10));
    return date.toISOString().split("T")[0];
  }

  function handleAdd(e) {
    e.preventDefault();

    const dateFin = calculateDateFin(projet.dateDebut, projet.duree);

    const newProjet = { ...projet, dateFin };

    axios
      .post("http://127.0.0.1:8000/api/projets", newProjet)
      .then((response) => {
        cancelAdd();
        dispatch({
          type: "UPDATE_PROJETS",
          payload: [...projets, response.data.data],
        });
      })
      .catch((error) => console.error("Error adding projet:", error));
  }

  return (
    <div className="px-4">
      <div className="flex flex-wrap justify-between items-center gap-6 mb-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl text-center">Add Projet</h1>
        </div>
      </div>

      <form onSubmit={handleAdd} className="space-y-4 flex flex-col">
        <label className="form-control w-full max-w-2xl">
          <span className="label-text">Intitule</span>
          <input
            type="text"
            className="input input-bordered w-full"
            value={projet.intitule}
            onChange={(e) => setProjet({ ...projet, intitule: e.target.value })}
            required
          />
        </label>

        <label className="form-control w-full max-w-2xl">
          <span className="label-text">Date Debut</span>
          <input
            type="date"
            className="input input-bordered w-full"
            value={projet.dateDebut}
            onChange={(e) => setProjet({ ...projet, dateDebut: e.target.value })}
            required
          />
        </label>

        <label className="form-control w-full max-w-2xl">
          <span className="label-text">Duree (Days)</span>
          <input
            type="number"
            className="input input-bordered w-full"
            value={projet.duree}
            onChange={(e) => setProjet({ ...projet, duree: e.target.value })}
            min="1"
            required
          />
        </label>

        <div className="flex justify-between mt-4">
          <button type="button" onClick={cancelAdd} className="btn btn-outline">
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

export default AddProjet;