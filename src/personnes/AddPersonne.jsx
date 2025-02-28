import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

function AddPersonne({ personnes }) {
  const dispatch = useDispatch();

  const [personne, setPersonne] = useState({
    nom: "",
    prenom: "",
    email: "",
    tele: "",
  });

  function cancelAdd() {
    document.getElementById("addModal").close();
    setPersonne({ nom: "", prenom: "", email: "", tele: "" });
  }

  function handleAdd(e) {
    e.preventDefault();
    const newPersonne = { ...personne };
    axios
      .post("http://127.0.0.1:8000/api/personnes", newPersonne)
      .then((res) => {
        cancelAdd();
        dispatch({ type: "UPDATE_PERSONNES", payload: [...personnes, res.data.data] });
      })
      .catch((error) => console.error("Error adding personne:", error));
  }

  return (
    <div className="px-4">
      <div className="flex flex-wrap justify-between items-center gap-6 mb-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl text-center">Add Personne</h1>
        </div>
      </div>

      <form onSubmit={handleAdd} className="space-y-4 flex flex-col">
        <label className="form-control w-full max-w-2xl">
          <div className="label">
            <span className="label-text">Nom</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={personne.nom}
            onChange={(e) => setPersonne({ ...personne, nom: e.target.value })}
            required
          />
        </label>

        <label className="form-control w-full max-w-2xl">
          <div className="label">
            <span className="label-text">Prenom</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={personne.prenom}
            onChange={(e) => setPersonne({ ...personne, prenom: e.target.value })}
            required
          />
        </label>

        <label className="form-control w-full max-w-2xl">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full"
            value={personne.email}
            onChange={(e) => setPersonne({ ...personne, email: e.target.value })}
            required
          />
        </label>

        <label className="form-control w-full max-w-2xl">
          <div className="label">
            <span className="label-text">Telephone</span>
          </div>
          <input
            type="tel"
            className="input input-bordered w-full"
            value={personne.tele}
            onChange={(e) => setPersonne({ ...personne, tele: e.target.value })}
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

export default AddPersonne;